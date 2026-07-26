import {Background} from '@/components/webgl/background';
import {Header} from '@/components/header';
import {HeroSection} from '@/components/hero-section';
import {AISkills} from '@/components/ai-skills';
import {AIWorkflow} from '@/components/ai-workflow';
import {Impact} from '@/components/impact';
import {Projects} from '@/components/projects';
import EnhancedTechStack from '@/components/enhanced-tech-stack';
import {WorkExperience} from '@/components/work-experience';
import {Contact} from '@/components/contact';

/**
 * Seven sections, read as one extraction: the shot, the grind, the pressure,
 * the proof, the work, the record, the invitation. Education lives inside
 * Experience and the tech stack is a marquee, so neither stalls the descent.
 */
export default function Home() {
  return (
    <main id='main' className='relative min-h-screen overflow-hidden text-cream'>
      <Background />

      <Header />
      <HeroSection />
      <AISkills />
      <AIWorkflow />
      <Impact />
      <Projects />
      <EnhancedTechStack />
      <WorkExperience />
      <Contact />

      <footer className='relative border-t border-grounds bg-roast/70 px-6 py-10 backdrop-blur-sm'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-cream-faint sm:flex-row'>
          <span className='font-jetbrains'>
            kit<span className='text-ember'>.dev</span>
          </span>
          <span>© {new Date().getFullYear()} Kit Mikhael Bagares — built with AI, shipped by hand.</span>
        </div>
      </footer>
    </main>
  );
}
