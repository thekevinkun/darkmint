"use client";

import { useState, useEffect, useActionState } from "react";
import { generateCertificate } from "@/app/actions/generate-certificate";
import { uploadToIPFS } from "@/app/actions/upload-to-ipfs";

import { Button, ShareButtons, SubmitButton, MintButton } from "@/components";

const CertificateForm = () => {
  // useActionState manages form submission and state
  // It takes: (serverAction, initialState)
  // It returns: [state, formAction, isPending]
  const [state, formAction] = useActionState(generateCertificate, {
    success: false, // Initial state: no success yet
  });

  // Persist the metadataUri, imageUrl, and certificateText to localStorage after IPFS upload.
  // When the user comes back, restore the state and show the mint button immediately — no need to regenerate.
  // True if we loaded a pending mint from localStorage
  const [restoredFromStorage, setRestoredFromStorage] = useState(false);

  // Form validation errors
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    certType?: string;
    skills?: string;
  }>({});

  // Stores the IPFS metadata URI after upload (used in Phase 6 for minting)
  const [metadataUri, setMetadataUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Image from restored session
  const [restoredImageUrl, setRestoredImageUrl] = useState<string | null>(null);
  // Text from restored session
  const [restoredCertText, setRestoredCertText] = useState<string | null>(null);

  // Store form values when user submits — used for IPFS metadata
  const [formValues, setFormValues] = useState({
    name: "",
    certType: "Web3 Developer",
    skills: "",
  });

  // Tx hash after mint
  const [mintTxHash, setMintTxHash] = useState<string | null>(null);

  // Upload function — runs automatically after generation
  const handleUploadToIPFS = async () => {
    if (!state.imageUrl || !state.certificateText) return;

    setIsUploading(true);
    setUploadError(null);

    // Use stored form values — no DOM querying needed!
    const result = await uploadToIPFS(
      state.imageUrl,
      formValues.name,
      formValues.certType,
      formValues.skills,
    );

    setIsUploading(false);

    if (result.success && result.metadataUri) {
      setMetadataUri(result.metadataUri);
      // Save pending mint to localStorage in case user leaves before minting
      localStorage.setItem(
        "darkmint_pending",
        JSON.stringify({
          metadataUri: result.metadataUri,
          imageUrl: state.imageUrl,
          certificateText: state.certificateText,
          formValues, // name, certType, skills
          savedAt: new Date().toISOString(), // So we can show when it was saved
        }),
      );
      console.log("🎉 Ready to mint:", result.metadataUri);
    } else {
      setUploadError(result.error || "Upload failed");
    }
  };

  // Validates form fields before submission
  const validateForm = (name: string, certType: string, skills: string) => {
    const errors: { name?: string; certType?: string; skills?: string } = {};

    if (!name.trim()) {
      errors.name = "Please enter your full name";
    } else if (name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!certType) {
      errors.certType = "Please select a certificate type";
    }

    if (!skills.trim()) {
      errors.skills = "Please describe your skills and achievements";
    } else if (skills.trim().length < 10) {
      errors.skills = "Please add a bit more detail (at least 10 characters)";
    }

    return errors;
  };

  // When AI generation succeeds, automatically upload to IPFS
  useEffect(() => {
    if (state.success && state.imageUrl) {
      handleUploadToIPFS();
    }
  }, [state.success, state.imageUrl]);

  // On mount, check if there's a pending unminted certificate
  useEffect(() => {
    try {
      const saved = localStorage.getItem("darkmint_pending");
      if (!saved) return;

      const parsed = JSON.parse(saved);
      if (!parsed.metadataUri) return;

      setMetadataUri(parsed.metadataUri);
      setFormValues(parsed.formValues);
      setRestoredImageUrl(parsed.imageUrl); // Restore image URL
      setRestoredCertText(parsed.certificateText); // Restore certificate text
      setRestoredFromStorage(true);
    } catch {
      localStorage.removeItem("darkmint_pending");
    }
  }, []);

  // Warn user if they try to leave with an unminted certificate
  useEffect(() => {
    if (!metadataUri) return; // No pending mint, no warning needed

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Required for Chrome to show the dialog
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [metadataUri]);

  return (
    <>
      {/* Restored session banner */}
      {restoredFromStorage && !mintTxHash && (
        <div className="certificate-form__restore-banner" role="alert">
          <span>
            ⚡ You have an unminted certificate from a previous session.
          </span>
          <Button
            style={{ boxShadow: "none" }}
            onClick={() => {
              setRestoredFromStorage(false);
              setMetadataUri(null);
              setRestoredImageUrl(null); // Clear restored image
              setRestoredCertText(null); // Clear restored text
              localStorage.removeItem("darkmint_pending");
            }}
            className="certificate-form__restore-dismiss"
            aria-label="Dismiss and start fresh"
          >
            Start fresh instead ✕
          </Button>
        </div>
      )}

      <div className="certificate-form">
        {/* 
        Form card
        action prop connects to our Server Action via useActionState
        No onSubmit needed - React 19 handles it!
      */}
        <div style={{ height: "min-content" }} className="card card--glowing">
          <form
            aria-label="Certificate generation form"
            action={(formData) => {
              const name = formData.get("name") as string;
              const certType = formData.get("certType") as string;
              const skills = formData.get("skills") as string;

              // Validate before sending to server
              const errors = validateForm(name, certType, skills);
              if (Object.keys(errors).length > 0) {
                setValidationErrors(errors);
                return; // Stop — don't submit
              }

              setValidationErrors({}); // Clear old errors
              setFormValues({ name, certType, skills }); // Save form values BEFORE the server action clears them
              formAction(formData); // Then call the actual server action
            }}
          >
            {/* Name field */}
            <div className="form-group">
              <label htmlFor="name" className="form-label form-label--required">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${
                  validationErrors.name ? "invalid" : ""
                }`}
                placeholder="Enter your full name"
                required
              />

              {validationErrors.name && (
                <p className="form-field-error" role="alert">
                  {validationErrors.name}
                </p>
              )}

              <p className="form-helper">
                This will appear on your certificate
              </p>
            </div>

            {/* Certificate type select */}
            <div className="form-group">
              <label
                htmlFor="certType"
                className="form-label form-label--required"
              >
                Certificate Type
              </label>
              <select
                id="certType"
                name="certType"
                className={`form-select ${
                  validationErrors.certType ? "invalid" : ""
                }`}
                required
              >
                <option value="Web3 Developer">Web3 Developer</option>
                <option value="Smart Contract Auditor">
                  Smart Contract Auditor
                </option>
                <option value="Blockchain Architect">
                  Blockchain Architect
                </option>
                <option value="DeFi Specialist">DeFi Specialist</option>
                <option value="NFT Creator">NFT Creator</option>
                <option value="Full-Stack Developer">
                  Full-Stack Developer
                </option>
                <option value="React Developer">React Developer</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Custom Achievement">Custom Achievement</option>
              </select>

              {validationErrors.certType && (
                <p className="form-field-error" role="alert">
                  {validationErrors.certType}
                </p>
              )}

              <p className="form-helper">
                Choose the type of certificate you want
              </p>
            </div>

            {/* Skills textarea */}
            <div className="form-group">
              <label
                htmlFor="skills"
                className="form-label form-label--required"
              >
                Skills & Achievements
              </label>
              <textarea
                id="skills"
                name="skills"
                className={`form-textarea ${
                  validationErrors.skills ? "invalid" : ""
                }`}
                placeholder="Describe your skills, achievements, or what makes you special..."
                required
                rows={4}
              />

              {validationErrors.skills && (
                <p className="form-field-error" role="alert">
                  {validationErrors.skills}
                </p>
              )}

              <p className="form-helper">
                Be specific! This helps the AI create a better certificate.
              </p>
            </div>

            {/* Submit button */}

            <div className="form-actions form-actions--center">
              <SubmitButton loadingText="Generating...">
                🤖 Generate Certificate
              </SubmitButton>
            </div>

            {/* Info card below form */}
            {/* <div className="certificate-form__info">
            <div className="card card--dark" style={{ marginTop: "32px" }}>
              <div className="card__body">
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "var(--text-tertiary)",
                  }}
                >
                  💡 <strong>Coming in:</strong> AI will generate your custom
                  certificate text and image.
                  <br />
                  🔗 <strong>Coming:</strong> Your certificate will be minted as
                  an NFT on the blockchain.
                </p>
              </div>
            </div>
          </div> */}
          </form>
        </div>

        {/* Preview placeholder (will show AI results) */}
        <div
          className="certificate-form__preview"
          aria-live="polite"
          aria-label="Certificate preview"
        >
          {/* Display Error Message (if any)*/}
          {state.error && (
            <div className="certificate-form__error">
              <p>❌ {state.error}</p>
            </div>
          )}

          {(state.success && state.certificateText && state.imageUrl) ||
          restoredImageUrl ? (
            <div className="certificate-result card card--glowing">
              {/* Success header */}
              <h3 className="certificate-result__title">
                ✨ Your Certificate is Ready!
              </h3>

              {/* Generated Image - MAIN FOCUS */}
              <div className="certificate-result__image-container">
                <img
                  src={state.imageUrl ?? restoredImageUrl ?? ""}
                  alt="Generated certificate"
                  className="certificate-result__image"
                />
              </div>

              {/* IPFS Upload Status */}
              {isUploading && (
                <p
                  style={{
                    textAlign: "center",
                    color: "#a855f7",
                    marginTop: "1rem",
                  }}
                >
                  ⚡ Saving to IPFS...
                </p>
              )}

              {uploadError && (
                <div className="certificate-form__error" role="alert">
                  <p>❌ {uploadError}</p>
                  <Button
                    style={{ fontSize: "0.875rem", padding: "0.75rem" }}
                    variant="ghost"
                    onClick={() => handleUploadToIPFS()} // Allow retry
                  >
                    🔄 Retry Upload
                  </Button>
                </div>
              )}

              {metadataUri && (
                <p
                  style={{
                    textAlign: "center",
                    color: "#00ff88",
                    marginTop: "1rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Saved to IPFS!
                </p>
              )}

              {/* Mint NFT Button - appears after IPFS upload completes */}
              {metadataUri && (
                <div style={{ marginTop: "1rem" }}>
                  <MintButton
                    metadataUri={metadataUri}
                    onMintSuccess={(hash) => {
                      setMintTxHash(hash);
                      localStorage.removeItem("darkmint_pending"); // Mint done, no longer needed
                    }}
                  />
                </div>
              )}

              <ShareButtons
                recipientName={formValues.name}
                certType={formValues.certType}
                txHash={mintTxHash ?? undefined}
              />

              {/* Action buttons */}
              <div className="certificate-result__actions">
                {/* Download button */}
                <Button
                  variant="secondary"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = state.imageUrl ?? "";
                    link.target = "_blank";
                    link.download = "certificate.png";
                    link.click();
                  }}
                >
                  📥 Download Image
                </Button>

                {/* View text button */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    const textSection = document.getElementById("cert-text");
                    textSection?.classList.toggle("expanded");
                  }}
                >
                  📄 View Certificate Text
                </Button>
              </div>

              {/* Collapsible Text Section - HIDDEN BY DEFAULT */}
              <div
                id="cert-text"
                className="certificate-result__text-collapsible"
              >
                <div className="certificate-result__text">
                  <h4>Certificate Text</h4>
                  <div className="certificate-text-content">
                    {state.certificateText ?? restoredCertText}
                  </div>
                </div>
              </div>

              {/* Mode indicator */}
              {state.mode && (
                <div className="mode-indicator">
                  <small>{state.mode}</small>
                </div>
              )}
            </div>
          ) : (
            <div className="card card--flat">
              <div className="card__header">
                <h3 className="card__title">Preview</h3>
                <p className="card__subtitle">
                  Your generated certificate will appear here
                </p>
              </div>
              <div className="card__body">
                <div className="certificate-form__preview-placeholder">
                  <div className="certificate-form__preview-icon">🖼️</div>
                  <p
                    style={{
                      color: "var(--text-tertiary)",
                      fontSize: "0.875rem",
                    }}
                  >
                    Fill out the form and click "Generate Certificate" to see
                    your AI-powered NFT certificate
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CertificateForm;
