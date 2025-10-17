import { Header } from "@/components/header"
import { InteractiveBackground } from "@/components/interactive-background"
import { HeroSection } from "@/components/hero-section"
import { PortfolioSections } from "@/components/portfolio-sections"
import { WorkExperience } from "@/components/work-experience"
import { Education } from "@/components/education"
import { TechStack } from "@/components/tech-stack"

export default function Page() {
  return (
    <main className="min-h-screen relative">
      <InteractiveBackground />
      <TechStack />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <PortfolioSections />
        <WorkExperience />
        <Education />
      </div>
    </main>
  );
}
