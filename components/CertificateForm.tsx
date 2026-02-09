"use client";

import { useActionState } from "react";
import { generateCertificate } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";

const CertificateForm = () => {
  // useActionState manages form submission and state
  // It takes: (serverAction, initialState)
  // It returns: [state, formAction, isPending]
  const [state, formAction] = useActionState(generateCertificate, {
    success: false, // Initial state: no success yet
  });

  return (
    <div className="certificate-form">
      {/* 
        Form card
        action prop connects to our Server Action via useActionState
        No onSubmit needed - React 19 handles it!
      */}
      <div style={{ height: "min-content" }} className="card card--glowing">
        <form action={formAction}>
          {/* Name field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label form-label--required">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your full name"
              required
            />

            <p className="form-helper">This will appear on your certificate</p>
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
              className="form-select"
              required
            >
              <option value="Web3 Developer">Web3 Developer</option>
              <option value="Smart Contract Auditor">
                Smart Contract Auditor
              </option>
              <option value="Blockchain Architect">Blockchain Architect</option>
              <option value="DeFi Specialist">DeFi Specialist</option>
              <option value="NFT Creator">NFT Creator</option>
              <option value="Full-Stack Developer">Full-Stack Developer</option>
              <option value="React Developer">React Developer</option>
              <option value="AI Engineer">AI Engineer</option>
              <option value="Custom Achievement">Custom Achievement</option>
            </select>

            <p className="form-helper">
              Choose the type of certificate you want
            </p>
          </div>

          {/* Skills textarea */}
          <div className="form-group">
            <label htmlFor="skills" className="form-label form-label--required">
              Skills & Achievements
            </label>
            <textarea
              id="skills"
              name="skills"
              className="form-textarea"
              placeholder="Describe your skills, achievements, or what makes you special..."
              required
              rows={4}
            />

            <p className="form-helper">
              Be specific! This helps the AI create a better certificate.
            </p>
          </div>

          {/* Submit button */}

          <div className="form-actions form-actions--center">
            <SubmitButton />
          </div>

          {/* Info card below form */}
          <div className="certificate-form__info">
            <div className="card card--dark" style={{ marginTop: "32px" }}>
              <div className="card__body">
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "var(--text-tertiary)",
                  }}
                >
                  {/* 💡 <strong>Coming in:</strong> AI will generate your custom
                  certificate text and image.
                  <br /> */}
                  🔗 <strong>Coming:</strong> Your certificate will be minted as
                  an NFT on the blockchain.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
        
      {/* Preview placeholder (will show AI results) */}
      <div className="certificate-form__preview">
        {/* Display Error Message (if any)*/}
        {state.error && (
          <div className="certificate-form__error">
            <p>❌ {state.error}</p>
          </div>
        )}

        {state.success && state.certificateText && state.imageUrl ? (
          <div className="certificate-result card card--glowing">
            {/* Success header */}
            <h3 className="certificate-result__title">
              ✨ Your Certificate is Ready!
            </h3>

            {/* Generated Image */}
            <div className="certificate-result__image-container">
              <img
                src={state.imageUrl}
                alt="Generated certificate"
                className="certificate-result__image"
              />
            </div>

            {/* Generated Text */}
            <div className="certificate-result__text">
              <h4>Certificate Text:</h4>
              <div className="certificate-text-content">
                {state.certificateText}
              </div>
            </div>

            {/* Show which mode is active */}
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
                  Fill out the form and click "Generate Certificate" to see your
                  AI-powered NFT certificate
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateForm;
