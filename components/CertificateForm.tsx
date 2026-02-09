"use client";

import { useState } from "react";

const CertificateForm = () => {
  // Store form data in state (updates when user types)
  const [formData, setFormData] = useState({
    name: "", // User's name
    certType: "Web3 Developer", // Certificate type (default value)
    skills: "", // User's skills/achievements
  });

  // Handle input changes (called when user types)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target; // Get field name and value

    setFormData((prev) => ({
      ...prev, // Keep other fields the same
      [name]: value, // Update changed field
    }));
  };

  // Handle form submission (placeholder for now)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    console.log("Form submitted:", formData);

    // TODO: Connect to AI generation
  };

  return (
    <div className="certificate-form">
      {/* Form card */}
      <div className="card card--glowing">
        <form onSubmit={handleSubmit}>
          {/* Name field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label form-label--required">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your full name"
              required // HTML5 validation
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
              value={formData.certType}
              onChange={handleChange}
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
              value={formData.skills}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Describe your skills, achievements, or what makes you special..."
              required
              rows={5}
            />

            <p className="form-helper">
              Be specific! This helps the AI create a better certificate.
            </p>
          </div>

          {/* Submit button */}
          <div className="form-actions form-actions--center">
            <button type="submit" className="btn btn-primary btn--large">
              🎨 Generate Certificate
            </button>
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
                  💡 <strong>Coming in:</strong> AI will generate your custom
                  certificate text and image.
                  <br />
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
                style={{ color: "var(--text-tertiary)", fontSize: "0.875rem" }}
              >
                Fill out the form and click "Generate Certificate" to see your
                AI-powered NFT certificate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;
