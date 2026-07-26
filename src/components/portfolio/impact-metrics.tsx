'use client';

import {Check} from 'lucide-react';
import {SectionHeading} from '@/components/portfolio/section-heading';
import {useReveal} from '@/hooks/use-reveal';
import {impactHighlights, impactMetrics} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

export function ImpactMetrics() {
  const {ref, shown} = useReveal({threshold: 0.1});

  return (
    <section id="impact" aria-labelledby="impact-heading" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="03 — Engineering impact"
          title={<span id="impact-heading">What the engineering actually changed.</span>}
          subtitle="Highlights from five years in production teams — measured where the work was measured, and described as experience rather than a promise."
        />

        <div ref={ref} className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2">
          {impactMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                'panel p-6 transition-all duration-700 ease-out sm:p-7',
                shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              )}
              style={{transitionDelay: `${index * 90}ms`}}
            >
              <p className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                {metric.value}
              </p>
              <p className="mt-2 text-sm font-medium text-accent">{metric.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{metric.detail}</p>
            </div>
          ))}
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {impactHighlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-sm text-foreground-muted">
              <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
