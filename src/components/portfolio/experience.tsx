'use client';

import {SectionHeading} from '@/components/portfolio/section-heading';
import {useReveal} from '@/hooks/use-reveal';
import {education, experience} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

export function Experience() {
  const {ref, shown} = useReveal({threshold: 0.08});

  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="06 — Experience"
          title={<span id="experience-heading">Where the practice was built.</span>}
        />

        <div ref={ref} className="mt-14 space-y-4 sm:mt-16">
          {experience.map((job, index) => (
            <article
              key={`${job.company}-${job.period}`}
              className={cn(
                'panel p-6 transition-all duration-700 ease-out sm:p-8',
                shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              )}
              style={{transitionDelay: `${index * 100}ms`}}
            >
              <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between">
                <div>
                  <h3 className="font-display text-xl font-medium text-foreground">{job.title}</h3>
                  <p className="mt-1 text-sm text-accent">{job.company}</p>
                </div>
                <p className="font-jetbrains text-xs text-foreground-muted">
                  {job.period} · {job.location}
                </p>
              </div>

              <ul className="mt-6 space-y-2.5">
                {job.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="relative pl-5 text-sm leading-relaxed text-foreground-muted before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <div className="panel flex flex-col gap-2 p-6 sm:flex-row sm:items-baseline sm:justify-between sm:p-8">
            <div>
              <h3 className="font-display text-lg font-medium text-foreground">{education.degree}</h3>
              <p className="mt-1 text-sm text-foreground-muted">
                {education.specialization} · {education.institution}
              </p>
            </div>
            <p className="font-jetbrains text-xs text-foreground-muted">
              {education.period} · {education.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
