"use client";

import Link from "next/link";
import Image from "next/image";
import { useAccount } from "wagmi";
import { ShareButtons } from "@/components";

import { CONTRACT_ADDRESS } from "@/lib/contract";

interface CertificateProps {
  tokenId: string;
  metadata: {
    name?: string;
    description?: string;
    // Show the full saved certificate text on the detail page.
    certificateText?: string;
    image?: string;
    attributes?: { trait_type: string; value: string }[];
  } | null;
  imageUrl: string | null;
  ownerAddress: string | null;
}

const Certificate = ({
  tokenId,
  metadata,
  imageUrl,
  ownerAddress,
}: CertificateProps) => {
  // Read the connected wallet so we can detect the NFT owner.
  const { address } = useAccount();
  // Only the current owner gets the social share actions.
  const isOwner =
    !!address &&
    !!ownerAddress &&
    address.toLowerCase() === ownerAddress.toLowerCase();

  return (
    <main className="section-page">
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          textAlign: "center",
        }}
        className="section"
      >
        <h1 style={{ color: "#a855f7" }}>Certificate #{tokenId}</h1>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={metadata?.name ?? `Certificate #${tokenId}`}
            width={1024}
            height={1024}
            unoptimized
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "12px",
              border: "1px solid #ff00ff",
            }}
          />
        )}
        {metadata?.name && (
          <h2 style={{ color: "#e5e7eb", marginTop: "1rem" }}>
            {metadata.name}
          </h2>
        )}
        {metadata?.attributes && (
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            {/* Show the certificate traits to every visitor. */}
            {metadata.attributes.map((attribute) => (
              <span key={attribute.trait_type} className="nft-card__badge">
                <span className="nft-card__badge-label">
                  {attribute.trait_type}
                </span>
                <span className="nft-card__badge-value">{attribute.value}</span>
              </span>
            ))}
          </div>
        )}
        {metadata?.certificateText && (
          <div className="certificate-result__text" style={{ marginTop: "4rem" }}>
            {/* Display the complete certificate wording from NFT metadata. */}
            <h4>Certificate Text</h4>
            <div className="certificate-text-content">
              {metadata.certificateText}
            </div>
          </div>
        )}
        <Link
          href={`https://sepolia.etherscan.io/token/${CONTRACT_ADDRESS}?a=${tokenId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            color: "#a855f7",
          }}
        >
          View on Etherscan ↗
        </Link>

        <ShareButtons
          recipientName={metadata?.name ?? ""}
          certType={
            metadata?.attributes?.find(
              (a: { trait_type: string }) =>
                a.trait_type === "Certificate Type",
            )?.value ?? ""
          }
          tokenId={Number(tokenId)}
          // Keep social share actions reserved for the owner.
          shareMode={isOwner ? "owner" : "public"}
        />
        {!isOwner && (
          <p
            style={{
              marginTop: "0.75rem",
              color: "var(--text-tertiary)",
              fontSize: "0.875rem",
            }}
          >
            {/* Explain why visitors only see the copy-link action. */}
            Social share actions are reserved for the wallet that owns this
            certificate.
          </p>
        )}
      </div>
    </main>
  );
};

export default Certificate;
