'use client';

import {CompactProjectCard, EditorialProjectCard} from '@/components/portfolio/project-card';
import {SectionHeading} from '@/components/portfolio/section-heading';
import {useReveal} from '@/hooks/use-reveal';
import {featuredProjects, otherProjects} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const {ref, shown} = useReveal({threshold: 0.08});
  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className
      )}
      style={{transitionDelay: `${delay}ms`}}
    >
      {children}
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="02 — Selected work"
          title={<span id="work-heading">Products built end to end, not just delivered.</span>}
          subtitle="Independent products and client platforms where I owned the problem as much as the code."
        />

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug}>
              <EditorialProjectCard project={project} flipped={index % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <div className="mt-24 border-t border-border pt-14">
          <h3 className="eyebrow text-foreground-muted">Also shipped</h3>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 70} className="h-full [&>article]:h-full">
                <CompactProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
