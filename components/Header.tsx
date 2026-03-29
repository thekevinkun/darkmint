"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

import { WalletConnect } from "@/components";
import { useActiveSection } from "@/hooks/useActiveSection";

const Header = () => {
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeSection = useActiveSection(["features", "how-it-works"]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const isActive = (target: string) => {
    if (target === "/") {
      return pathname === "/" && activeSection === "";
    }
    return activeSection === target.replace("#", "");
  };

  return (
    <>
      <header className="header">
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>

        <div className="header__container">
          <Link href="/" className="header__logo-container" onClick={closeMenu}>
            <Image src="/logo.png" alt="DarkMint Logo" width={32} height={32} />
            <div className="header__logo">DarkMint</div>
          </Link>

          <button
            className={`header__hamburger ${
              menuOpen ? "header__hamburger--open" : ""
            }`}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
            <Link
              href="/"
              className={`header__nav-link ${
                isActive("/") ? "header__nav-link--active" : ""
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              href="/#features"
              className={`header__nav-link ${
                isActive("#features") ? "header__nav-link--active" : ""
              }`}
              onClick={closeMenu}
            >
              Features
            </Link>

            <Link
              href="/#how-it-works"
              className={`header__nav-link ${
                isActive("#how-it-works") ? "header__nav-link--active" : ""
              }`}
              onClick={closeMenu}
            >
              How It Works
            </Link>

            {isConnected && (
              <Link
                href="/my-nfts"
                className={`header__nav-link ${
                  pathname === "/my-nfts" ? "header__nav-link--active" : ""
                }`}
                onClick={closeMenu}
              >
                My Certificates
              </Link>
            )}

            <WalletConnect />
          </nav>
        </div>
      </header>

      {menuOpen && <div className="header__overlay" onClick={closeMenu} />}
    </>
  );
};

export default Header;
