"use client";

import React from "react";

// Define props interface for type safety
interface ButtonProps {
  // Content
  children: React.ReactNode; // Button text/content
  
  // Behavior
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  
  // Styling
  variant?: "primary" | "secondary" | "ghost" | "neon";
  size?: "small" | "medium" | "large";
  className?: string;
  
  // Loading state
  loading?: boolean;
  loadingText?: string;
  
  // HTML attributes
  title?: string; // Tooltip text (optional)
  ariaLabel?: string; // Accessibility label (optional)
}

const Button: React.FC<ButtonProps> = ({
  // Destructure props with defaults
  children,
  onClick,
  type = "button", // Default to "button" to prevent accidental form submission
  disabled = false,
  variant = "primary",
  size = "medium",
  className = "",
  loading = false,
  loadingText = "Loading...",
  title,
  ariaLabel,
}) => {
  // Build className string based on props
  // Combines base button class + variant + size + custom classes
  const buttonClasses = [
    "btn", // Base button class
    `btn-${variant}`, // Variant class (btn-primary, btn-secondary, etc.)
    size !== "medium" && `btn--${size}`, // Size class (only if not medium/default)
    className, // Custom classes passed via props
  ]
    .filter(Boolean) // Remove falsy values (like false from size check)
    .join(" "); // Join with spaces

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading} // Disable if disabled OR loading
      className={buttonClasses}
      title={title}
      aria-label={ariaLabel || (typeof children === "string" ? children : undefined)}
      style={{
        // Add loading styles when loading
        opacity: loading ? 0.7 : 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
      }}
    >
      {/* Show loading state or normal content */}
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;