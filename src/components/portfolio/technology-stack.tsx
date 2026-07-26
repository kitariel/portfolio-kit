'use client';

import {AiIcon} from '@/components/portfolio/ai-icons';
import {SectionHeading} from '@/components/portfolio/section-heading';
import {useReveal} from '@/hooks/use-reveal';
import {aiTools, techCategories} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

export function TechnologyStack() {
  const {ref, shown} = useReveal({threshold: 0.1});

  return (
    <section id="stack" aria-labelledby="stack-heading" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="05 — Technology"
          title={<span id="stack-heading">A stack chosen for maintenance, not novelty.</span>}
          subtitle="Grouped the way I actually reason about a system, rather than as a wall of logos."
        />

        <div ref={ref} className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-2">
          {techCategories.map((category, index) => {
            const isAiCategory = category.title === 'AI workflow';
            return (
              <div
                key={category.title}
                className={cn(
                  'panel p-6 transition-all duration-700 ease-out sm:p-7',
                  shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                )}
                style={{transitionDelay: `${index * 90}ms`}}
              >
                <h3 className="eyebrow text-accent">{category.title}</h3>

                {isAiCategory ? (
                  <ul className="mt-6 flex flex-wrap gap-3">
                    {aiTools.map((tool) => (
                      <li key={tool.id} style={{'--brand': tool.brand} as React.CSSProperties}>
                        <span className="group flex items-center gap-2.5 rounded-lg border border-border bg-surface px-3.5 py-2 transition-colors hover:border-border-strong">
                          <AiIcon
                            tool={tool.id}
                            aria-hidden
                            className="h-4 w-4 text-foreground transition-colors duration-300 group-hover:text-[var(--brand)]"
                          />
                          <span className="text-sm text-foreground-muted">
                            {tool.id === 'codex' ? 'Codex/OpenAI' : tool.name}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-border bg-surface px-3 py-1.5 font-jetbrains text-xs text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
