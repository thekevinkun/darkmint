"use client";

import { useState } from "react";

interface ShareButtonsProps {
  recipientName: string;
  certType: string;
  txHash?: string;
  tokenId?: number;
  shareMode?: "owner" | "public";
}

const ShareButtons = ({
  recipientName,
  certType,
  txHash,
  tokenId,
  shareMode = "owner",
}: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false); // Feedback when link is copied
  // Use the configured app URL so social links point to the live site.
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://darkmint-web.vercel.app";

  // The link we'll share — Etherscan tx if minted, otherwise DarkMint homepage
  const shareUrl =
    tokenId !== undefined
      ? `${appUrl}/certificate/${tokenId}`
      : txHash
      ? `https://sepolia.etherscan.io/tx/${txHash}`
      : appUrl;

  // Use first-person text only when the owner is sharing.
  const shareText =
    shareMode === "owner"
      ? `🎓 I just minted my ${certType} certificate as an NFT on @DarkMint!\n\n${shareUrl}\n\n#DarkMint #Web3 #NFT #BlockchainCertificate`
      : `🎓 Check out ${recipientName}'s ${certType} certificate on DarkMint.\n\n${shareUrl}\n\n#DarkMint #Web3 #NFT #BlockchainCertificate`;

  // Warm the certificate page so social crawlers can read the OG image faster.
  const warmCertificatePage = async () => {
    if (tokenId === undefined) return;

    try {
      await fetch(`${shareUrl}?previewWarm=1`, { cache: "no-store" });
    } catch {
      // Ignore warmup errors because sharing should still continue.
    }
  };

  // X (Twitter) Share
  const handleXShare = async () => {
    // Trigger the certificate route once before opening the share dialog.
    await warmCertificatePage();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // LinkedIn Share
  const handleLinkedInShare = async () => {
    // Trigger the certificate route once before opening the share dialog.
    await warmCertificatePage();
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl,
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Copy Link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true); // Show feedback
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch {
      // Fallback for browsers that block clipboard API
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="share-buttons">
      <p className="share-buttons__label">
        {shareMode === "owner"
          ? "🎉 Share your achievement"
          : "🔗 Copy this certificate link"}
      </p>

      <div className="share-buttons__row">
        {shareMode === "owner" && (
          <>
            {/* Let the owner share the certificate on X. */}
            <button
              onClick={handleXShare}
              className="share-btn share-btn--x"
              aria-label="Share on X (Twitter)"
            >
              <span className="share-btn__icon">𝕏</span>
              <span className="share-btn__text">Share on X</span>
            </button>

            {/* Let the owner share the certificate on LinkedIn. */}
            <button
              onClick={handleLinkedInShare}
              className="share-btn share-btn--linkedin"
              aria-label="Share on LinkedIn"
            >
              <span className="share-btn__icon">in</span>
              <span className="share-btn__text">LinkedIn</span>
            </button>
          </>
        )}

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`share-btn share-btn--copy ${
            copied ? "share-btn--copied" : ""
          }`}
          aria-label="Copy link to clipboard"
        >
          <span className="share-btn__icon">{copied ? "✓" : "🔗"}</span>
          <span className="share-btn__text">
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
