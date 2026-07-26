import {Reveal} from '@/components/reveal';
import {SectionIntro} from '@/components/section-intro';
import {education, experience} from '@/lib/content';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-canvas py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <SectionIntro
          index="04"
          label="Experience"
          title="Six years in production teams."
          intro="Cebu-based, working with product, QA and design on client and internal platforms."
          headingId="experience-heading"
        />

        <div className="mt-14 sm:mt-16">
          {experience.map((role, index) => (
            <Reveal
              key={`${role.company}-${role.period}`}
              as="article"
              className="rule-t grid gap-5 py-8 sm:py-10 lg:grid-cols-12 lg:gap-10"
            >
              <div className="reveal-fade lg:col-span-4">
                <p className="label text-muted">{role.period}</p>
                <h3 className="display-sm mt-3">{role.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">
                  {role.company} · {role.location}
                </p>
              </div>

              <ul
                className="reveal-fade lg:col-span-8"
                style={{transitionDelay: '90ms'}}
              >
                {role.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="rule-t flex gap-4 py-3 first:border-t-0 first:pt-0"
                  >
                    <span aria-hidden="true" className="mt-1 font-mono text-xs text-signal">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-graphite">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="rule-t mt-10 grid gap-5 pt-8 sm:mt-12 lg:grid-cols-12 lg:gap-10">
          <p className="label text-muted reveal-fade lg:col-span-4">Education</p>
          <dl className="reveal-fade lg:col-span-8" style={{transitionDelay: '90ms'}}>
            {education.map((entry) => (
              <div
                key={entry.institution}
                className="rule-t flex flex-col gap-1 py-4 first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="text-[1.0625rem] font-medium">
                  {entry.degree}
                  {'detail' in entry && entry.detail ? (
                    <span className="text-muted"> · {entry.detail}</span>
                  ) : null}
                </dt>
                <dd className="text-[0.9375rem] text-muted sm:text-right">
                  {entry.institution}
                  <span className="label ml-3 hidden sm:inline">{entry.period}</span>
                  <span className="label mt-1 block sm:hidden">{entry.period}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
