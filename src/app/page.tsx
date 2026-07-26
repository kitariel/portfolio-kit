import {PortfolioNavigation} from '@/components/portfolio/portfolio-navigation';
import {CinematicHero} from '@/components/portfolio/cinematic-hero';
import {AiWorkflow} from '@/components/portfolio/ai-workflow';
import {FeaturedWork} from '@/components/portfolio/featured-work';
import {ImpactMetrics} from '@/components/portfolio/impact-metrics';
import {ProcessTimeline} from '@/components/portfolio/process-timeline';
import {TechnologyStack} from '@/components/portfolio/technology-stack';
import {Experience} from '@/components/portfolio/experience';
import {About} from '@/components/portfolio/about';
import {ContactCta} from '@/components/portfolio/contact-cta';
import {profile} from '@/lib/portfolio-data';

export default function Home() {
  return (
    <>
      <PortfolioNavigation />

      <main id="main">
        {/* Curiosity → transformation → intelligence */}
        <CinematicHero />

        {/* Execution */}
        <AiWorkflow />

        {/* Proof */}
        <FeaturedWork />
        <ImpactMetrics />
        <ProcessTimeline />
        <TechnologyStack />
        <Experience />

        {/* Human connection */}
        <About />
        <ContactCta />
      </main>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-foreground-muted sm:flex-row">
          <span className="font-display">{profile.name}</span>
          <span>© {new Date().getFullYear()} — {profile.title}</span>
        </div>
      </footer>
    </>
  );
}
