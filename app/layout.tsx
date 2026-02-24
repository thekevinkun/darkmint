import type { Metadata } from "next";
import { Providers } from "./providers";

import { Header, Footer } from "@/components";
import "./globals.css";

// Metadata for the app (shows in browser tab and search engines)
export const metadata: Metadata = {
  title: "DarkMint - AI-Powered NFT Certificates", // Browser tab title
  description:
    "Generate unique AI-powered certificate NFTs with dark cyberpunk aesthetic", // SEO description
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
