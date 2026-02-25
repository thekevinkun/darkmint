import type { Metadata } from "next";
import { Providers } from "./providers";

import { Header, Footer } from "@/components";
import "./globals.css";

// Metadata for the app (shows in browser tab and search engines)
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  title: {
    template: "%s | DarkMint",
    default: "DarkMint - AI-Powered NFT Certificates",
  },
  description:
    "AI-Powered Web3 Certificate Minter. Generate and mint your certificates as NFTs on the blockchain.",
  keywords: ["NFT", "Web3", "AI", "certificate", "blockchain", "DarkMint"],
  authors: [{ name: "DarkMint" }],
  openGraph: {
    siteName: "DarkMint",
    type: "website",
    title: "DarkMint — AI-Powered NFT Certificates",
    description:
      "AI-Powered Web3 Certificate Minter. Generate and mint your certificates as NFTs on the blockchain.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DarkMint — AI-Powered NFT Certificates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DarkMint — AI-Powered NFT Certificates",
    description:
      "AI-Powered Web3 Certificate Minter. Generate and mint your certificates as NFTs on the blockchain.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
};

// Root layout component - wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Header - Sticky navigation at top */}
          <Header />

          {/* Main content area - each page's content renders here */}
          <main className="main" id="main-content">
            {children} {/* Page content injected here */}
          </main>

          {/* Footer - Bottom section */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
