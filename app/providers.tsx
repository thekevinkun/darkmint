// ============================================
// Web3 Providers Wrapper
// Wraps the app with all necessary providers:
// - Wagmi (blockchain hooks)
// - React Query (data fetching/caching)
// - RainbowKit (wallet connection UI)
// ============================================

"use client";

import { WagmiProvider } from "wagmi"; // Provides blockchain hooks to entire app
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"; // Wallet UI provider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Data fetching layer
import { config } from "@/lib/wagmi-config"; // Our Wagmi config from Step 2
import "@rainbow-me/rainbowkit/styles.css"; // RainbowKit default styles (required!)

// Create React Query client (handles caching blockchain data)
// Defined outside component so it's created once, not on every render
const queryClient = new QueryClient();

// Providers component wraps all children with Web3 context
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      {/* Enables wagmi hooks everywhere */}
      <QueryClientProvider client={queryClient}>
        {/* Enables data caching */}
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "linear-gradient(135deg,#e91e63 0%,#ff00ff 100%)", // Purple accent (matches the theme)
            accentColorForeground: "white", // White text on purple
            borderRadius: "medium", // Rounded corners
          })}
        >
          {children} {/* Actual app renders here */}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
