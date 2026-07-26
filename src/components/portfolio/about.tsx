'use client';

import Image from 'next/image';
import {SectionHeading} from '@/components/portfolio/section-heading';
import {useReveal} from '@/hooks/use-reveal';
import {credibilityPoints, media, profile} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

const beliefs = [
  {
    title: 'A technical partner, not a ticket queue',
    body: 'I want the context behind the request — the constraint, the deadline, the thing that is actually at risk. That is usually where the better solution is hiding.',
  },
  {
    title: 'Unclear ideas become understandable systems',
    body: 'Most projects do not start with a spec. They start with a conversation. Turning that into an architecture other people can build on is the part I enjoy most.',
  },
  {
    title: 'Reusable architecture outlives the sprint',
    body: 'Maintainable code, shared modules and standards I can hand to the next engineer — including the six I currently lead and mentor.',
  },
  {
    title: 'AI assists; the judgement stays human',
    body: 'Models research, draft and implement faster than I can alone. Creativity, responsibility and the final call are still mine.',
  },
];

export function About() {
  const {ref, shown} = useReveal({threshold: 0.08});

  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden px-6 py-24 sm:py-28">
      {/* The one place the palette warms up — the human behind the systems. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 78% 22%, rgba(214, 164, 101, 0.10), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="07 — About"
          title={<span id="about-heading">The engineer who has to live with the decisions.</span>}
          className="[&_.eyebrow]:text-accent-warm [&_.eyebrow>span]:bg-accent-warm"
        />

        <div ref={ref} className="mt-14 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-14">
          <div
            className={cn(
              'transition-all duration-700 ease-out lg:col-span-5',
              shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            )}
          >
            <div className="panel relative overflow-hidden">
              <Image
                src={media.portrait.src}
                alt={media.portrait.alt}
                width={media.portrait.width}
                height={media.portrait.height}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 55%, rgba(214, 164, 101, 0.10) 80%, rgba(6, 17, 31, 0.65) 100%)',
                }}
              />
            </div>

            <ul className="mt-6 space-y-2.5">
              {credibilityPoints.map((point) => (
                <li
                  key={point}
                  className="relative pl-5 text-sm leading-relaxed text-foreground-muted before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent-warm"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              'transition-all delay-100 duration-700 ease-out lg:col-span-7',
              shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            )}
          >
            <p className="text-lg leading-relaxed text-foreground sm:text-xl">{profile.intro}</p>

            <dl className="mt-10 space-y-8">
              {beliefs.map((belief) => (
                <div key={belief.title} className="border-l border-border pl-6">
                  <dt className="font-display text-lg font-medium text-foreground">{belief.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-foreground-muted">{belief.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
