"use client";

import { useState } from "react";

interface ShareButtonsProps {
  recipientName: string;
  certType: string;
  txHash?: string;
  tokenId?: number;
}

const ShareButtons = ({
  recipientName,
  certType,
  txHash,
  tokenId,
}: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false); // Feedback when link is copied

  // The link we'll share — Etherscan tx if minted, otherwise DarkMint homepage
  const shareUrl =
    tokenId !== undefined
      ? `https://darkmint.vercel.app/certificate/${tokenId}`
      : txHash
      ? `https://sepolia.etherscan.io/tx/${txHash}`
      : "https://darkmint.vercel.app";

  // The text that appears in the tweet/post
  const shareText = `🎓 I just minted my ${certType} certificate as an NFT on @DarkMint!\n\nPowered by AI + Web3 🤖⛓️\n\n#DarkMint #Web3 #NFT #BlockchainCertificate`;

  // X (Twitter) Share
  const handleXShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // LinkedIn Share
  const handleLinkedInShare = () => {
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
      <p className="share-buttons__label">🎉 Share your achievement</p>

      <div className="share-buttons__row">
        {/* X (Twitter) */}
        <button
          onClick={handleXShare}
          className="share-btn share-btn--x"
          aria-label="Share on X (Twitter)"
        >
          <span className="share-btn__icon">𝕏</span>
          <span className="share-btn__text">Share on X</span>
        </button>

        {/* LinkedIn */}
        <button
          onClick={handleLinkedInShare}
          className="share-btn share-btn--linkedin"
          aria-label="Share on LinkedIn"
        >
          <span className="share-btn__icon">in</span>
          <span className="share-btn__text">LinkedIn</span>
        </button>

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
