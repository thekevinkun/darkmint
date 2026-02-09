import type { Metadata } from "next";
import Link from "next/link";
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
        {/* Header - Sticky navigation at top */}
        <header className="header">
          <div className="header__container">
            {/* Logo */}
            <div className="header__logo">DarkMint</div>

            {/* Navigation links */}
            <nav className="header__nav">
              <Link
                href="/"
                className="header__nav-link header__nav-link--active"
              >
                Home
              </Link>
              <Link href="#features" className="header__nav-link">
                Features
              </Link>
              <Link href="#how-it-works" className="header__nav-link">
                How It Works
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content area - each page's content renders here */}
        <main className="main">
          {children} {/* Page content injected here */}
        </main>

        {/* Footer - Bottom section */}
        <footer className="footer">
          <div className="footer__container">
            <p className="footer__text">
              Built with Next.js 15, React 19, and Web3
            </p>
            <p className="footer__text">
              © 2026 DarkMint - AI-Powered NFT Certificates
            </p>

            {/* Footer links */}
            <div className="footer__links">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                GitHub
              </Link>
              <Link href="https://docs.darkmint.app" className="footer__link">
                Docs
              </Link>
              <Link href="#contact" className="footer__link">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
