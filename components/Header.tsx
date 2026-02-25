"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { WalletConnect } from "@/components";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header">
        {/* Skip to main content — visible only on keyboard focus */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>

        <div className="header__container">
          {/* Logo */}
          <Link href="/" className="header__logo-container" onClick={closeMenu}>
            <Image src="/logo.png" alt="DarkMint Logo" width={32} height={32} />
            <div className="header__logo">DarkMint</div>
          </Link>

          {/* Hamburger button — mobile only */}
          <button
            className={`header__hamburger ${
              menuOpen ? "header__hamburger--open" : ""
            }`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Navigation links */}
          <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
            <Link
              href="/"
              className={`header__nav-link ${
                pathname === "/" ? "header__nav-link--active" : ""
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/#features"
              className="header__nav-link"
              onClick={closeMenu}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="header__nav-link"
              onClick={closeMenu}
            >
              How It Works
            </Link>
            <Link
              href="/my-nfts"
              className={`header__nav-link ${
                pathname === "/my-nfts" ? "header__nav-link--active" : ""
              }`}
              onClick={closeMenu}
            >
              My Certificates
            </Link>
            <WalletConnect />
          </nav>
        </div>
      </header>
      
      {/* Overlay — closes menu when clicking outside */}
      {menuOpen && <div className="header__overlay" onClick={closeMenu} />}
    </>
  );
};

export default Header;
