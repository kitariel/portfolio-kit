import {Reveal} from '@/components/reveal';
import {SectionIntro} from '@/components/section-intro';
import {processSteps} from '@/lib/content';

export function HowIWork() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="on-ink bg-ink py-20 text-canvas sm:py-24 lg:py-32"
    >
      <div className="shell">
        <SectionIntro
          index="03"
          label="How I work"
          title="Understand, architect, build, verify, ship."
          intro="The same five steps whether it is a greenfield platform or a change to something already in production."
          headingId="process-heading"
        />

        <Reveal as="ol" className="mt-14 sm:mt-16">
          {processSteps.map(({step, detail}, index) => (
            <li
              key={step}
              className="rule-t reveal-fade grid gap-3 py-7 sm:py-8 lg:grid-cols-12 lg:gap-10"
              style={{transitionDelay: `${index * 70}ms`}}
            >
              <p className="label text-muted lg:col-span-2">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="display-sm lg:col-span-4">{step}</h3>
              <p className="prose-quiet lg:col-span-6">{detail}</p>
            </li>
          ))}
        </Reveal>

        <Reveal className="rule-t mt-10 pt-8 sm:mt-12">
          <p className="reveal-fade max-w-measure text-lg leading-relaxed sm:text-xl">
            AI is part of the toolchain, not the product. It drafts, scaffolds and
            speeds up the repetitive parts;{' '}
            <span className="text-signal">
              the architecture, the review and the final call stay mine.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
