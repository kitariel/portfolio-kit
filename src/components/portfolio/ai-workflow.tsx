'use client';

import {AiWorkflowCard} from '@/components/portfolio/ai-workflow-card';
import {SectionHeading} from '@/components/portfolio/section-heading';
import {useReveal} from '@/hooks/use-reveal';
import {aiTools} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

export function AiWorkflow() {
  const {ref, shown} = useReveal({threshold: 0.05});

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="workflow-handoff relative px-6 pb-24 pt-16 sm:pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="01 — How I work"
          title={
            <span id="workflow-heading">
              From idea to execution — powered by human creativity and AI systems.
            </span>
          }
          subtitle="I combine product thinking, scalable engineering, and AI-assisted workflows to build faster, smarter digital experiences."
        />

        {/* Reveal is opacity-only on purpose: the icon slots are live landing
            targets for the flying marks, so they must not move. */}
        <div
          ref={ref}
          className={cn(
            'mt-14 grid gap-5 transition-opacity duration-700 ease-out sm:mt-16 lg:grid-cols-3',
            shown ? 'opacity-100' : 'opacity-0'
          )}
        >
          {aiTools.map((tool, index) => (
            <AiWorkflowCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
