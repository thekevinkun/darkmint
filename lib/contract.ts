// ============================================
// Contract Configuration
// Stores the deployed contract address and ABI
// Used by the frontend to interact with blockchain
// ============================================

// The address where our contract lives on Sepolia
export const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as string;

// ABI = Application Binary Interface
// Tells our frontend what functions the contract has
// Think of it as the contract's "instruction manual"
export const CONTRACT_ABI = [
  {
    name: "mintCertificate",
    type: "function",
    inputs: [
      { name: "to", type: "address" }, // Wallet to receive NFT
      { name: "uri", type: "string" }, // IPFS metadata link
    ],
    outputs: [{ name: "", type: "uint256" }], // Returns token ID
    stateMutability: "nonpayable",
  },
  {
    name: "tokenURI",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
  },
  {
    name: "ownerOf",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    name: "CertificateMinted",
    type: "event",
    inputs: [
      { name: "to", type: "address", indexed: true },
      { name: "tokenId", type: "uint256", indexed: true },
      { name: "uri", type: "string", indexed: false },
    ],
  },
] as const;
