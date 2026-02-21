const Features = () => {
  return (
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
              Images and metadata stored on IPFS, ensuring your certificates are
              permanent and censorship-resistant.
            </p>
          </div>

          {/* Feature 4: Easy to Use */}
          <div className="feature-card">
            <div className="feature-card__icon">✨</div>
            <h3 className="feature-card__title">Simple & Fast</h3>
            <p className="feature-card__description">
              Connect wallet, fill form, mint NFT. Your certificate is ready in
              minutes, no technical knowledge required.
            </p>
          </div>

          {/* Feature 5: Verifiable */}
          <div className="feature-card">
            <div className="feature-card__icon">✅</div>
            <h3 className="feature-card__title">Verifiable</h3>
            <p className="feature-card__description">
              Every certificate is verifiable on-chain. Share your achievements
              with proof that can't be forged.
            </p>
          </div>

          {/* Feature 6: Beautiful */}
          <div className="feature-card">
            <div className="feature-card__icon">🎨</div>
            <h3 className="feature-card__title">Stunning Design</h3>
            <p className="feature-card__description">
              Dark cyberpunk aesthetic with neon accents. Your certificates look
              as good as they are technically impressive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
