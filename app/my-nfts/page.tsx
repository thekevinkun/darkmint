import type { Metadata } from "next";
import { MyNFTs } from "@/components";

export const metadata: Metadata = {
  title: "My Certificates",
  description: "View all your DarkMint NFT certificates",
  openGraph: {
    title: "My Certificates | DarkMint",
    description: "View all your DarkMint NFT certificates",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Certificates | DarkMint",
    description: "View all your DarkMint NFT certificates",
    images: ["/og-image.png"],
  },
};

export default function MyNFTsPage() {
  return (
    <main id="main-content" className="main">
      <div className="container">
        <MyNFTs />
      </div>
    </main>
  );
}
