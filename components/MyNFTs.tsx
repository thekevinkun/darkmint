"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { Button } from "@/components";
import { CONTRACT_ADDRESS } from "@/lib/contract";

// Shape of each NFT's metadata from IPFS
interface NFTMetadata {
  name: string;
  description: string;
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

const MyNFTs = () => {
  const { address, isConnected } = useAccount(); // Get connected wallet
  const [nftCards, setNftCards] = useState<NFTCard[]>([]); // Loaded NFT cards
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Trigger NFT load when wallet connects
  useEffect(() => {
    if (!address || !isConnected) return;
    loadNFTs(address);
  }, [address, isConnected]);

  // Fetches all CertificateMinted events for this wallet
  const loadNFTs = async (address: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Alchemy NFT API — free, no block range limits
      const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
      const url = `https://eth-sepolia.g.alchemy.com/nft/v3/${alchemyKey}/getNFTsForOwner?owner=${address}&contractAddresses[]=${CONTRACT_ADDRESS}&withMetadata=true`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch NFTs from Alchemy");

      const data = await res.json();
      const ownedNfts = data.ownedNfts ?? [];

      const cards: NFTCard[] = ownedNfts.map((nft: any) => {
        const tokenId = Number(nft.tokenId);

        // Alchemy already fetches and parses the metadata for us
        const metadata: NFTMetadata = {
          name: nft.name ?? `DarkMint Certificate #${tokenId}`,
          description: nft.description ?? "",
          image: nft.image?.originalUrl ?? "",
          attributes: nft.raw?.metadata?.attributes ?? [],
        };

        const imageUrl = ipfsToHttp(metadata.image);

        return { tokenId, metadata, imageUrl };
      });

      setNftCards(cards);
    } catch (err: any) {
      console.error("❌ Failed to load NFTs:", err);
      setError("Failed to load your certificates. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // NOT CONNECTED STATE
  if (!isConnected) {
    return (
      <div className="my-nfts__empty">
        <div className="my-nfts__empty-icon">🔒</div>
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
        <div className="my-nfts__grid">
          {/* Skeleton cards while loading */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="nft-card nft-card--skeleton">
              <div className="nft-card__image-skeleton" />
              <div className="nft-card__body">
                <div className="nft-card__title-skeleton" />
                <div className="nft-card__text-skeleton" />
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
        <p>You haven't minted any certificates yet.</p>
        <Link href="/" className="btn-primary">
          ✨ Create Your First Certificate
        </Link>
      </div>
    );
  }

  // NFT GRID — Show all certificates
  return (
    <div className="my-nfts">
      <h1 className="my-nfts__title">My Certificates</h1>
      <p className="my-nfts__subtitle">
        {nftCards.length} certificate{nftCards.length !== 1 ? "s" : ""} minted
      </p>

      <div
        className="my-nfts__grid"
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
            <div className="nft-card__image-container">
              <img
                src={nft.imageUrl}
                alt={nft.metadata.name}
                className="nft-card__image"
              />
              <div className="nft-card__token-badge">#{nft.tokenId}</div>
            </div>

            {/* Card Body */}
            <div className="nft-card__body">
              <h3 className="nft-card__title">{nft.metadata.name}</h3>

              {/* Attributes */}
              <div className="nft-card__attributes">
                {nft.metadata.attributes
                  .filter((a) => a.trait_type !== "Skills") // Skills is too long for a badge
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

              {/* Etherscan Link */}
              <Link
                href={`https://sepolia.etherscan.io/token/${CONTRACT_ADDRESS}?a=${nft.tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nft-card__etherscan-link"
                aria-label={`View token #${nft.tokenId} on Etherscan`}
              >
                View on Etherscan ↗
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNFTs;
