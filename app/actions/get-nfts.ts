// ============================================
// Get NFTs Server Action
// Fetches owned NFTs server-side — keeps
// Alchemy API key out of the browser
// ============================================
"use server";

import { CONTRACT_ADDRESS } from "@/lib/contract";

interface AlchemyNFT {
  tokenId: string;
  name?: string;
  description?: string;
  // Read the full certificate text from NFT metadata.
  certificateText?: string;
  image?: {
    originalUrl?: string;
  };
  raw?: {
    metadata?: {
      // Read custom metadata fields that are not part of the standard NFT shape.
      certificateText?: string;
      attributes?: { trait_type: string; value: string }[];
    };
  };
}

export interface NFTResult {
  tokenId: number;
  name: string;
  description: string;
  // Return the full certificate text to the UI.
  certificateText: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}

export async function getNFTs(address: string): Promise<{
  success: boolean;
  nfts?: NFTResult[];
  error?: string;
}> {
  try {
    // Use private server-side key — never exposed to browser
    const alchemyKey = process.env.ALCHEMY_API_KEY;

    if (!alchemyKey) {
      return { success: false, error: "Alchemy key not configured" };
    }

    const url = `https://eth-sepolia.g.alchemy.com/nft/v3/${alchemyKey}/getNFTsForOwner?owner=${address}&contractAddresses[]=${CONTRACT_ADDRESS}&withMetadata=true`;

    const res = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) throw new Error("Failed to fetch NFTs from Alchemy");

    const data = await res.json();
    const ownedNfts: AlchemyNFT[] = data.ownedNfts ?? [];

    const nfts: NFTResult[] = ownedNfts.map((nft) => {
      const tokenId = Number(nft.tokenId);
      return {
        tokenId,
        name: nft.name ?? `DarkMint Certificate #${tokenId}`,
        description: nft.description ?? "",
        // Use the stored certificate text from any metadata shape Alchemy returns.
        certificateText:
          nft.certificateText ?? nft.raw?.metadata?.certificateText ?? "",
        image: nft.image?.originalUrl ?? "",
        attributes: nft.raw?.metadata?.attributes ?? [],
      };
    });

    return { success: true, nfts };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("❌ Failed to fetch NFTs:", error);
    return { success: false, error: "Failed to load certificates." };
  }
}
