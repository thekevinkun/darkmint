const Stats = () => {
  return (
    <section className="section" style={{ background: "var(--bg-secondary)" }}>
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
  );
};

export default Stats;
