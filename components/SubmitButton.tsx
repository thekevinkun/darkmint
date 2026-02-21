"use client";

import React from "react";
import { useFormStatus } from "react-dom";

// Props interface
interface SubmitButtonProps {
  // Content
  children?: React.ReactNode;
  loadingText?: string;

  // Styling
  variant?: "primary" | "secondary" | "ghost" | "neon";
  size?: "small" | "medium" | "large";
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children = "Submit",
  loadingText = "Submitting...",
  variant = "primary",
  size = "large",
  className = "",
}) => {
  // useFormStatus gives us the parent form's state
  // pending = true when form is submitting
  const { pending } = useFormStatus();

  // Build className string
  const buttonClasses = [
    "btn",
    `btn-${variant}`,
    size !== "medium" && `btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="submit" // Always submit type
      disabled={pending} // Disable while submitting
      className={buttonClasses}
      style={{
        opacity: pending ? 0.7 : 1,
        cursor: pending ? "not-allowed" : "pointer",
      }}
    >
      {/* Show loading state or normal content */}
      {pending ? (
        <>
          <span className="spinner">⚡</span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
