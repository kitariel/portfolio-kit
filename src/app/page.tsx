import { Header } from '@/components/header'
import { InteractiveBackground } from '@/components/interactive-background'
import { HeroSection } from '@/components/hero-section'
import { PortfolioSections } from '@/components/portfolio-sections'
import { TechStack } from '@/components/tech-stack'
import { WorkExperience } from '@/components/work-experience'
import { Education } from '@/components/education'
import EnhancedTechStack from '@/components/enhanced-tech-stack'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <InteractiveBackground />
      <Header />
      <HeroSection />
      <PortfolioSections />
      <TechStack />
      <WorkExperience />
      <Education />
      <EnhancedTechStack />
    </main>
  )
}
