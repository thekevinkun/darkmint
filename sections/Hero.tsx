import Link from "next/link";

const Hero = () => {
  return (
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
  );
};

export default Hero;
