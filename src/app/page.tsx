import {Header} from '@/components/header';
import {HeroSection} from '@/components/hero-section';
import {AISkills} from '@/components/ai-skills';
import {AIWorkflow} from '@/components/ai-workflow';
import {Impact} from '@/components/impact';
import {Projects} from '@/components/projects';
import EnhancedTechStack from '@/components/enhanced-tech-stack';
import {WorkExperience} from '@/components/work-experience';
import {Education} from '@/components/education';
import {Contact} from '@/components/contact';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-slate-200">
      {/* Clean static backdrop: grid + soft accent glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="app-grid absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] translate-x-1/3 translate-y-1/4 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <Header />
      <HeroSection />
      <AISkills />
      <AIWorkflow />
      <Impact />
      <Projects />
      <EnhancedTechStack />
      <WorkExperience />
      <Education />
      <Contact />

      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <span className="font-jetbrains">kit<span className="text-violet-400">.dev</span></span>
          <span>© {new Date().getFullYear()} Kit Mikhael Bagares — built with AI, shipped by hand.</span>
        </div>
      </footer>
    </main>
  );
}
