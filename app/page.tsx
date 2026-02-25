import { Hero, Features, HowItWorks, Stats } from "@/sections";
import { CertificateForm } from "@/components";

// Homepage component (Server Component by default)
export default function HomePage() {
  return (
    <main 
      id="main-content" 
      style={{
        paddingBottom: 0,
      }} 
      className="main"
    >
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

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
      <Stats />
    </main>
  );
}
