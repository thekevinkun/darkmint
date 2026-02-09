import Link from "next/link";
import CertificateForm from "@/components/CertificateForm";

// Homepage component (Server Component by default)
export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ paddingTop: "80px" }}>
        <div className="container container--narrow text-center">
          {/* Main headline with gradient text */}
          <h1 className="animate-fade-in" style={{ marginBottom: "24px" }}>
            Mint Your Future with AI
          </h1>

          {/* Subheadline */}
          <p
            className="section__subtitle animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Generate unique, AI-powered certificate NFTs that live on the
            blockchain forever. Your achievements, immortalized in Web3.
          </p>

          {/* CTA buttons */}
          <div
            className="btn-group btn-group--center animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Link href="#create" className="btn btn-primary">
              Create Certificate
            </Link>
            <Link href="#how-it-works" className="btn btn-ghost">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container">
          {/* Section title */}
          <h2 className="section__title">Why DarkMint?</h2>

          {/* Feature cards grid */}
          <div className="card-grid">
            {/* Feature 1: AI-Powered */}
            <div className="feature-card">
              <div className="feature-card__icon">🤖</div>
              <h3 className="feature-card__title">AI-Powered</h3>
              <p className="feature-card__description">
                GPT-4 generates personalized certificate text and DALL-E creates
                unique images tailored to your achievements.
              </p>
            </div>

            {/* Feature 2: Web3 Native */}
            <div className="feature-card">
              <div className="feature-card__icon">⛓️</div>
              <h3 className="feature-card__title">Web3 Native</h3>
              <p className="feature-card__description">
                Minted as ERC-721 NFTs on Ethereum. Your certificates are truly
                yours, stored on-chain forever.
              </p>
            </div>

            {/* Feature 3: IPFS Storage */}
            <div className="feature-card">
              <div className="feature-card__icon">📦</div>
              <h3 className="feature-card__title">Decentralized</h3>
              <p className="feature-card__description">
                Images and metadata stored on IPFS, ensuring your certificates
                are permanent and censorship-resistant.
              </p>
            </div>

            {/* Feature 4: Easy to Use */}
            <div className="feature-card">
              <div className="feature-card__icon">✨</div>
              <h3 className="feature-card__title">Simple & Fast</h3>
              <p className="feature-card__description">
                Connect wallet, fill form, mint NFT. Your certificate is ready
                in minutes, no technical knowledge required.
              </p>
            </div>

            {/* Feature 5: Verifiable */}
            <div className="feature-card">
              <div className="feature-card__icon">✅</div>
              <h3 className="feature-card__title">Verifiable</h3>
              <p className="feature-card__description">
                Every certificate is verifiable on-chain. Share your
                achievements with proof that can't be forged.
              </p>
            </div>

            {/* Feature 6: Beautiful */}
            <div className="feature-card">
              <div className="feature-card__icon">🎨</div>
              <h3 className="feature-card__title">Stunning Design</h3>
              <p className="feature-card__description">
                Dark cyberpunk aesthetic with neon accents. Your certificates
                look as good as they are technically impressive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="section"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container">
          {/* Section title */}
          <h2 className="section__title">How It Works</h2>
          <p className="section__subtitle">
            From idea to NFT in 6 simple steps
          </p>

          {/* Steps grid */}
          <div className="grid grid--3-cols" style={{ marginTop: "48px" }}>
            {/* Step 1 */}
            <div className="card card--glowing">
              <div className="card__header">
                <h3 className="card__title">
                  <span
                    style={{
                      background: "var(--gradient-cyber)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    1.
                  </span>{" "}
                  Connect Wallet
                </h3>
              </div>
              <div className="card__body">
                <p>
                  Connect your MetaMask or any Web3 wallet. We support all major
                  wallet providers.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="card card--glowing">
              <div className="card__header">
                <h3 className="card__title">
                  <span
                    style={{
                      background: "var(--gradient-cyber)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    2.
                  </span>{" "}
                  Fill Form
                </h3>
              </div>
              <div className="card__body">
                <p>
                  Enter your name, choose certificate type, and describe your
                  skills or achievements.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="card card--glowing">
              <div className="card__header">
                <h3 className="card__title">
                  <span
                    style={{
                      background: "var(--gradient-cyber)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    3.
                  </span>{" "}
                  AI Generates
                </h3>
              </div>
              <div className="card__body">
                <p>
                  Our AI creates custom certificate text and a unique image
                  based on your input.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="card card--glowing">
              <div className="card__header">
                <h3 className="card__title">
                  <span
                    style={{
                      background: "var(--gradient-neon)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    4.
                  </span>{" "}
                  Upload to IPFS
                </h3>
              </div>
              <div className="card__body">
                <p>
                  Certificate image and metadata are uploaded to IPFS for
                  permanent decentralized storage.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="card card--glowing">
              <div className="card__header">
                <h3 className="card__title">
                  <span
                    style={{
                      background: "var(--gradient-neon)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    5.
                  </span>{" "}
                  Mint NFT
                </h3>
              </div>
              <div className="card__body">
                <p>
                  Smart contract mints your certificate as an ERC-721 NFT on the
                  Ethereum blockchain.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="card card--glowing">
              <div className="card__header">
                <h3 className="card__title">
                  <span
                    style={{
                      background: "var(--gradient-neon)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    6.
                  </span>{" "}
                  Own Forever
                </h3>
              </div>
              <div className="card__body">
                <p>
                  Your NFT certificate appears in your wallet. You own it
                  forever, verified on-chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Certificate Section */}
      <section id="create" className="section">
        <div className="container container--narrow">
          {/* Section title */}
          <h2 className="section__title">Create Your Certificate</h2>
          <p className="section__subtitle">
            Fill out the form below to generate your AI-powered NFT certificate
          </p>

          {/* Certificate form component */}
          <CertificateForm />
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="section"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container">
          <div className="grid grid--3-cols">
            {/* Stat 1 */}
            <div className="stat-card">
              <div className="stat-card__value">1,234</div>
              <div className="stat-card__label">Certificates Minted</div>
            </div>

            {/* Stat 2 */}
            <div className="stat-card">
              <div className="stat-card__value">567</div>
              <div className="stat-card__label">Happy Users</div>
            </div>

            {/* Stat 3 */}
            <div className="stat-card">
              <div className="stat-card__value">100%</div>
              <div className="stat-card__label">On-Chain Forever</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
