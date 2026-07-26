import {Reveal} from '@/components/reveal';
import {SectionIntro} from '@/components/section-intro';
import {capabilityGroups} from '@/lib/content';

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="on-ink bg-ink py-20 text-canvas sm:py-24 lg:py-32"
    >
      <div className="shell">
        <SectionIntro
          index="05"
          label="Capabilities"
          title="What I build with."
          intro="Chosen per project rather than by habit — the list below is what I have actually shipped with."
          headingId="capabilities-heading"
        />

        <Reveal as="dl" className="mt-14 sm:mt-16">
          {capabilityGroups.map((group, index) => (
            <div
              key={group.title}
              className="rule-t reveal-fade grid gap-4 py-7 sm:py-8 lg:grid-cols-12 lg:gap-10"
              style={{transitionDelay: `${index * 60}ms`}}
            >
              <dt className="label text-muted lg:col-span-3">{group.title}</dt>
              <dd className="lg:col-span-9">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8">
                  {group.items.map((item) => (
                    <li key={item} className="text-[1.0625rem] sm:text-lg">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
