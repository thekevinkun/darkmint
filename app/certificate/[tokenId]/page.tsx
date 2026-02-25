import { notFound } from "next/navigation";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { Certificate } from "@/components";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

// Fetch token metadata server-side for Open Graph
async function getTokenMetadata(tokenId: string) {
  try {
    const client = createPublicClient({
      chain: sepolia,
      transport: http(
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      ),
    });

    const uri = (await client.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "tokenURI",
      args: [BigInt(tokenId)],
    })) as string;

    if (!uri) return null;

    // Fetch metadata from IPFS
    const gatewayUrl = uri.replace(
      "ipfs://",
      "https://beige-causal-meadowlark-885.mypinata.cloud/ipfs/",
    );
    const res = await fetch(gatewayUrl);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    // Contract throws when tokenId doesn't exist
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tokenId: string }>;
}) {
  const { tokenId } = await params;
  const metadata = await getTokenMetadata(tokenId);

  const title = `${metadata?.name ?? `Certificate #${tokenId}`} | DarkMint`;
  const description =
    metadata?.description ?? "AI-generated NFT certificate on DarkMint";
  const imageUrl = metadata?.image?.replace(
    "ipfs://",
    "https://beige-causal-meadowlark-885.mypinata.cloud/ipfs/",
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: imageUrl
        ? [{ url: imageUrl, width: 1024, height: 1024, alt: title }]
        : [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : ["/og-image.png"],
    },
  };
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ tokenId: string }>;
}) {
  // Validate tokenId is a valid number first
  const { tokenId } = await params;
  if (!tokenId || isNaN(Number(tokenId)) || Number(tokenId) < 0) {
    notFound();
  }

  // IF token doesn't exist on blockchain — show 404
  const metadata = await getTokenMetadata(tokenId);
  if (!metadata) {
    notFound();
  }

  const imageUrl = metadata?.image?.replace(
    "ipfs://",
    "https://beige-causal-meadowlark-885.mypinata.cloud/ipfs/",
  );

  return (
    <Certificate
      tokenId={tokenId}
      metadata={metadata}
      imageUrl={imageUrl ?? null}
    />
  );
}
