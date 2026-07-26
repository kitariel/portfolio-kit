'use client';

import {SectionHeading} from '@/components/portfolio/section-heading';
import {useReveal} from '@/hooks/use-reveal';
import {processSteps} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

export function ProcessTimeline() {
  const {ref, shown} = useReveal({threshold: 0.15});

  return (
    <section id="process" aria-labelledby="process-heading" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="04 — Process"
          title={<span id="process-heading">Four steps, repeated until it ships.</span>}
        />

        <div ref={ref} className="relative mt-14 sm:mt-16">
          {/* Horizontal sequence on large screens… */}
          <span aria-hidden className="absolute left-0 right-0 top-[1.375rem] hidden h-px bg-border lg:block" />
          <span
            aria-hidden
            className={cn(
              'absolute left-0 right-0 top-[1.375rem] hidden h-px origin-left bg-accent opacity-60 transition-transform duration-[1600ms] ease-out lg:block',
              shown ? 'scale-x-100' : 'scale-x-0'
            )}
          />

          {/* …vertical progression below it. */}
          <span aria-hidden className="absolute bottom-2 left-[1.375rem] top-2 w-px bg-border lg:hidden" />
          <span
            aria-hidden
            className={cn(
              'absolute bottom-2 left-[1.375rem] top-2 w-px origin-top bg-accent opacity-60 transition-transform duration-[1600ms] ease-out lg:hidden',
              shown ? 'scale-y-100' : 'scale-y-0'
            )}
          />

          <ol className="grid gap-10 sm:gap-12 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  'relative pl-16 transition-all duration-700 ease-out lg:pl-0 lg:pt-16',
                  shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                )}
                style={{transitionDelay: `${index * 140}ms`}}
              >
                <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background font-jetbrains text-xs text-accent">
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-medium text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
