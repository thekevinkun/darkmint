// Helper: reads tokenOfOwnerByIndex from contract
export async function getTokenIdByIndex(
  address: string,
  index: number,
): Promise<number | null> {
  try {
    const { createPublicClient, http } = await import("viem");
    const { sepolia } = await import("viem/chains");
    const { CONTRACT_ADDRESS, CONTRACT_ABI } = await import("@/lib/contract");

    const client = createPublicClient({ chain: sepolia, transport: http() });
    const tokenId = await client.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "tokenOfOwnerByIndex",
      args: [address as `0x${string}`, BigInt(index)],
    });
    return Number(tokenId);
  } catch {
    return null;
  }
}

// Helper: reads tokenURI from contract
export async function getTokenURI(tokenId: number): Promise<string | null> {
  try {
    const { createPublicClient, http } = await import("viem");
    const { sepolia } = await import("viem/chains");
    const { CONTRACT_ADDRESS, CONTRACT_ABI } = await import("@/lib/contract");

    const client = createPublicClient({ chain: sepolia, transport: http() });
    const uri = await client.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "tokenURI",
      args: [BigInt(tokenId)],
    });
    return uri as string;
  } catch {
    return null;
  }
}
