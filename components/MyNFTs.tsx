"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAccount } from "wagmi";

import { getNFTs } from "@/app/actions/get-nfts";
import { Button, ShareButtons } from "@/components";

import { CONTRACT_ADDRESS } from "@/lib/contract";

// Shape of each NFT's metadata from IPFS
interface NFTMetadata {
  name: string;
  description: string;
  // Keep the full certificate wording for later viewing.
  certificateText: string;
  image: string; // ipfs://Qm... or placehold.co URL
  attributes: { trait_type: string; value: string }[];
}

// Shape of a fully loaded NFT card
interface NFTCard {
  tokenId: number;
  metadata: NFTMetadata;
  imageUrl: string; // Converted from ipfs:// to gateway URL
}

// Your Pinata gateway — replace with your actual subdomain
const PINATA_GATEWAY = "https://beige-causal-meadowlark-885.mypinata.cloud";

// Converts ipfs://Qm... to a fetchable HTTPS URL
const ipfsToHttp = (uri: string): string => {
  if (uri.startsWith("ipfs://")) {
    return uri.replace("ipfs://", `${PINATA_GATEWAY}/ipfs/`);
  }
  return uri; // Already an HTTP URL (mock mode)
};

// Pull a short label value from the NFT attributes.
const getAttributeValue = (
  attributes: { trait_type: string; value: string }[],
  traitType: string,
) => attributes.find((attribute) => attribute.trait_type === traitType)?.value ?? "";

// Trim long certificate text so the list stays easy to scan.
const getCertificatePreview = (certificateText: string) => {
  const cleanText = certificateText.replace(/\s+/g, " ").trim();
  return cleanText.length > 220
    ? `${cleanText.slice(0, 220).trim()}...`
    : cleanText;
};

const MyNFTs = () => {
  const { address, isConnected } = useAccount(); // Get connected wallet
  const [nftCards, setNftCards] = useState<NFTCard[]>([]); // Loaded NFT cards
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Load each NFT and keep the saved certificate text with it.
  const loadNFTs = async (address: string) => {
    setIsLoading(true);
    setError(null);

    const result = await getNFTs(address);

    if (!result.success || !result.nfts) {
      setError(result.error ?? "Failed to load your certificates.");
      setIsLoading(false);
      return;
    }

    const cards: NFTCard[] = result.nfts.map((nft) => ({
      tokenId: nft.tokenId,
      metadata: {
        name: nft.name,
        description: nft.description,
        // Pass the saved certificate text into each card.
        certificateText: nft.certificateText,
        image: nft.image,
        attributes: nft.attributes,
      },
      imageUrl: ipfsToHttp(nft.image),
    }));

    setNftCards(cards);
    setIsLoading(false);
  };

  // Trigger NFT load when wallet connects
  useEffect(() => {
    if (!address || !isConnected) return;

    // Defer the first state update until after this effect finishes.
    const timer = window.setTimeout(() => {
      void loadNFTs(address);
    }, 0);

    // Clear the pending load if the wallet changes quickly.
    return () => window.clearTimeout(timer);
  }, [address, isConnected]);

  // NOT CONNECTED STATE
  if (!isConnected) {
    return (
      <div className="my-nfts__empty">
        <div className="my-nfts__empty-icon">🔌</div>
        <h2>Connect Your Wallet</h2>
        <p>Connect your wallet to view your DarkMint certificates</p>
      </div>
    );
  }

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="my-nfts">
        <h1 style={{ marginBottom: "2rem" }} className="my-nfts__title">
          My Certificates
        </h1>
        <div className="my-nfts__list">
          {/* Skeleton cards while loading */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="nft-card nft-card--skeleton">
              <div className="nft-card__image-shell">
                <div className="nft-card__image-skeleton" />
              </div>
              <div className="nft-card__body">
                <div className="nft-card__title-skeleton" />
                <div className="nft-card__text-skeleton" />
                <div className="nft-card__text-skeleton nft-card__text-skeleton--long" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="my-nfts__empty">
        <div className="my-nfts__empty-icon">❌</div>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <Button variant="ghost" onClick={() => address && loadNFTs(address)}>
          🔄 Try Again
        </Button>
      </div>
    );
  }

  // EMPTY STATE — Connected but no NFTs yet
  if (nftCards.length === 0 && !isLoading) {
    return (
      <div className="my-nfts__empty">
        <div className="my-nfts__empty-icon">🎓</div>
        <h2>No Certificates Yet</h2>
        <p>You haven&apos;t minted any certificates yet.</p>
        <Link href="/" className="btn btn-primary">
          ✨ Create Your First Certificate
        </Link>
      </div>
    );
  }

  // NFT LIST — Show all certificates in a readable layout
  return (
    <div className="my-nfts">
      <h1 className="my-nfts__title">My Certificates</h1>
      <p className="my-nfts__subtitle">
        {nftCards.length} certificate{nftCards.length !== 1 ? "s" : ""} minted
      </p>

      <div
        className="my-nfts__list"
        role="list"
        aria-label="Your minted certificates"
      >
        {nftCards.map((nft) => (
          <div
            key={nft.tokenId}
            className="nft-card card card--glowing"
            role="listitem"
            aria-label={`Certificate #${nft.tokenId}: ${nft.metadata.name}`}
          >
            {/* Certificate Image */}
            <div className="nft-card__image-shell">
              <div className="nft-card__image-container">
                <Image
                  src={nft.imageUrl}
                  alt={nft.metadata.name}
                  width={400}
                  height={400}
                  className="nft-card__image"
                  unoptimized
                />
                <div className="nft-card__token-badge">#{nft.tokenId}</div>
              </div>
            </div>

            {/* Card Body */}
            <div className="nft-card__body">
              <div className="nft-card__header">
                <div>
                  <h3 className="nft-card__title">{nft.metadata.name}</h3>
                  <p className="nft-card__meta">
                    {/* Show the main certificate facts near the title. */}
                    {getAttributeValue(
                      nft.metadata.attributes,
                      "Certificate Type",
                    )}
                    {" • "}
                    {getAttributeValue(nft.metadata.attributes, "Recipient")}
                  </p>
                </div>
                <Link
                  href={`/certificate/${nft.tokenId}`}
                  className="nft-card__primary-link"
                  aria-label={`View certificate #${nft.tokenId}`}
                >
                  View Certificate ↗
                </Link>
              </div>

              {/* Keep the attribute badges short so the row stays compact. */}
              <div className="nft-card__attributes">
                {nft.metadata.attributes
                  .filter(
                    (attribute) =>
                      !["Skills", "Recipient", "Certificate Type"].includes(
                        attribute.trait_type,
                      ),
                  )
                  .map((attr) => (
                    <span key={attr.trait_type} className="nft-card__badge">
                      <span className="nft-card__badge-label">
                        {attr.trait_type}
                      </span>
                      <span className="nft-card__badge-value">
                        {attr.value}
                      </span>
                    </span>
                  ))}
              </div>

              {nft.metadata.certificateText && (
                <div className="nft-card__preview">
                  {/* Show a short preview instead of the full certificate text. */}
                  <p>{getCertificatePreview(nft.metadata.certificateText)}</p>
                </div>
              )}

              <div className="nft-card__footer">
                <Link
                  href={`https://sepolia.etherscan.io/token/${CONTRACT_ADDRESS}?a=${nft.tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nft-card__etherscan-link"
                  aria-label={`View token #${nft.tokenId} on Etherscan`}
                >
                  View on Etherscan ↗
                </Link>

                <div className="nft-card__share">
                  <ShareButtons
                    recipientName={getAttributeValue(
                      nft.metadata.attributes,
                      "Recipient",
                    )}
                    certType={getAttributeValue(
                      nft.metadata.attributes,
                      "Certificate Type",
                    )}
                    tokenId={nft.tokenId}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNFTs;
