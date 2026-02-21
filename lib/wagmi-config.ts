// ============================================
// Wagmi Configuration
// Sets up blockchain connection for the app
// Connects to Sepolia testnet via Alchemy
// ============================================

import { getDefaultConfig } from "@rainbow-me/rainbowkit"; // RainbowKit's easy config helper
import { sepolia } from "wagmi/chains"; // Sepolia testnet chain definition
import { http } from "wagmi"; // HTTP transport for blockchain requests

// Create Wagmi config with RainbowKit defaults
// This handles wallet detection, connection, and network setup
export const config = getDefaultConfig({
  appName: "DarkMint", // App name (shown in wallet popups)
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID!, // WalletConnect project ID
  chains: [sepolia], // Only support Sepolia testnet
  transports: {
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`, // Alchemy RPC endpoint
    ),
  },
  ssr: true, // Enable server-side rendering support for Next.js
});
