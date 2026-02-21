"use client";

import Link from "next/link";
import { WalletConnect } from "@/components";

const Header = () => {
  return (
    <header className="header">
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
          <WalletConnect /> {/* Now safely inside a client component */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
