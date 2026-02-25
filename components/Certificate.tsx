import Link from "next/link";
import Image from "next/image";
import { ShareButtons } from "@/components";

import { CONTRACT_ADDRESS } from "@/lib/contract";

interface CertificateProps {
  tokenId: string;
  metadata: {
    name?: string;
    description?: string;
    image?: string;
    attributes?: { trait_type: string; value: string }[];
  } | null;
  imageUrl: string | null;
}

const Certificate = ({ tokenId, metadata, imageUrl }: CertificateProps) => {
  return (
    <main id="main-content" className="main">
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
        />
      </div>
    </main>
  );
};

export default Certificate;
