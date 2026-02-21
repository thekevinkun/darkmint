import Link from "next/link";

const Footer = () => {
  return (
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
  );
};

export default Footer;
