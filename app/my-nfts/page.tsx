import type { Metadata } from "next";
import { MyNFTs } from "@/components";

export const metadata: Metadata = {
  title: "My Certificates — DarkMint",
  description: "View all your DarkMint NFT certificates",
};

export default function MyNFTsPage() {
  return (
    <main className="main">
      <div className="container">
        <MyNFTs />
      </div>
    </main>
  );
}
