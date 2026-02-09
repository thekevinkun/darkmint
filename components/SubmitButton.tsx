"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  // useFormStatus gives us the parent form's state
  // pending = true when form is submitting
  // No need to manually manage loading state!
  const { pending } = useFormStatus();

  return (
    <button
      type="submit" // This submits the parent form
      disabled={pending} // Disable while submitting
      className="btn btn-primary btn--large"
      style={{
        // Add loading opacity when pending
        opacity: pending ? 0.7 : 1,
        cursor: pending ? "not-allowed" : "pointer",
      }}
    >
      {/* Show different text based on pending state */}
      {pending ? (
        <>
          <span className="spinner">⚡</span>
          Generating...
        </>
      ) : (
        "🤖 Generate Certificate"
      )}
    </button>
  );
};

export default SubmitButton;
