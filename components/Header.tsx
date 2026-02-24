"use client";

import Link from "next/link";
import { WalletConnect } from "@/components";

const Header = () => {
  return (
    <header className="header">
      {/* Skip to main content — visible only on keyboard focus */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">DarkMint</div>

        {/* Navigation links */}
        <nav className="header__nav">
          <Link href="/" className="header__nav-link header__nav-link--active">
            Home
          </Link>
          <Link href="#features" className="header__nav-link">
            Features
          </Link>
          <Link href="#how-it-works" className="header__nav-link">
            How It Works
          </Link>
          <Link href="/my-nfts" className="header__nav-link">
            My Certificates
          </Link>
          <WalletConnect /> {/* Now safely inside a client component */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
