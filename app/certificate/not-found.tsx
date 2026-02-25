import Link from "next/link";

export default function CertificateNotFound() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "6rem auto",
        padding: "0 1rem",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎓</p>
      <h1 style={{ color: "#a855f7", marginBottom: "0.5rem" }}>
        Certificate Not Found
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "2rem",
          fontSize: "0.875rem",
        }}
      >
        This certificate doesn't exist or hasn't been minted yet.
      </p>
      <Link href="/" className="btn btn-primary">
        ✨ Create Your Own Certificate
      </Link>
    </div>
  );
}
