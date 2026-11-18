import { PortfolioShell } from "@/components/portfolio/portfolio-shell";
import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { OverviewMetrics } from "@/components/portfolio/overview-metrics";
import { FeaturedWork } from "@/components/portfolio/featured-work";
import { ImpactMetrics } from "@/components/portfolio/impact-metrics";
import { ProcessTimeline } from "@/components/portfolio/process-timeline";
import { TechnologyStack } from "@/components/portfolio/technology-stack";
import { Experience } from "@/components/portfolio/experience";
import { About } from "@/components/portfolio/about";
import { ContactCta } from "@/components/portfolio/contact-cta";
import { QuickContact } from "@/components/portfolio/quick-contact";
import { profile } from "@/lib/portfolio-data";

export default function Home() {
  return (
    <PortfolioShell>
      <main id="main" tabIndex={-1} className="space-y-6">
        <section
          id="overview"
          aria-labelledby="overview-heading"
          className="space-y-4"
        >
          <PortfolioHero />
          <OverviewMetrics />
        </section>
        <div className="grid items-start gap-6 min-[1440px]:grid-cols-[minmax(0,1fr)_300px]">
          <FeaturedWork />
          <ImpactMetrics />
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <ProcessTimeline />
          <div className="min-w-0 space-y-6">
            <TechnologyStack />
            <QuickContact />
          </div>
        </div>
        <div className="grid items-start gap-6 min-[1600px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Experience />
          <About />
        </div>
        <ContactCta />
      </main>
      <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border py-5 text-[11px] leading-5 text-foreground-muted">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Product thinking. Engineering craft. Human judgement.</span>
      </footer>
    </PortfolioShell>
  );
}
