const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="section"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="container">
        {/* Section title */}
        <h2 className="section__title">How It Works</h2>
        <p className="section__subtitle">From idea to NFT in 6 simple steps</p>

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
                Our AI creates custom certificate text and a unique image based
                on your input.
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
                Your NFT certificate appears in your wallet. You own it forever,
                verified on-chain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
