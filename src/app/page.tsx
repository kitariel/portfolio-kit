import { Header } from "@/components/header"
import { InteractiveBackground } from "@/components/interactive-background"
import { HeroSection } from "@/components/hero-section"
import { PortfolioSections } from "@/components/portfolio-sections"

export default function Page() {
  return (
    <main className="min-h-screen relative">
      <InteractiveBackground />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <PortfolioSections />
      </div>
    </main>
  );
}
