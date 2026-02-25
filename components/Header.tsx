"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { WalletConnect } from "@/components";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      {/* Skip to main content — visible only on keyboard focus */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      <div className="header__container">
        {/* Logo */}
        <Link href="/" className="header__logo-container">
          <Image src="/logo.png" alt="DarkMint Logo" width={32} height={32} />
          <div className="header__logo">DarkMint</div>
        </Link>

        {/* Navigation links */}
        <nav className="header__nav">
          <Link
            href="/"
            className={`header__nav-link ${
              pathname === "/" ? "header__nav-link--active" : ""
            }`}
          >
            Home
          </Link>
          <Link href="#features" className="header__nav-link">
            Features
          </Link>
          <Link href="#how-it-works" className="header__nav-link">
            How It Works
          </Link>
          <Link
            href="/my-nfts"
            className={`header__nav-link ${
              pathname === "/my-nfts" ? "header__nav-link--active" : ""
            }`}
          >
            My Certificates
          </Link>
          <WalletConnect /> {/* Now safely inside a client component */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
