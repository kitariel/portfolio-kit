'use client';

import {useState} from 'react';
import {ProjectMedia} from '@/components/project-media';
import {Reveal} from '@/components/reveal';
import {SectionIntro} from '@/components/section-intro';
import {furtherProjects, type Project} from '@/lib/content';

function FurtherEntry({project, index}: {project: Project; index: number}) {
  const [active, setActive] = useState(false);

  return (
    <Reveal as="li" className="group rule-t">
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="reveal-fade grid gap-5 py-7 sm:py-8 lg:grid-cols-12 lg:items-start lg:gap-10"
      >
        <p className="label text-muted lg:col-span-2">
          {String(index + 5).padStart(2, '0')} / {project.category}
        </p>

        <div className="lg:col-span-5">
          <h3 className="display-sm">{project.title}</h3>
          <p className="prose-quiet mt-3">{project.problem}</p>
          <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[0.8125rem] text-muted">
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
          <div className="mt-5">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                data-rule="hidden"
                className="link-rule text-[0.9375rem] font-medium"
              >
                {project.linkLabel ?? 'Open live site'}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <a
                href="#contact"
                data-rule="hidden"
                className="link-rule text-[0.9375rem] font-medium"
              >
                Private — request a demo
                <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <ProjectMedia
            project={project}
            active={active}
            className="aspect-[16/10]"
          />
        </div>
      </div>
    </Reveal>
  );
}

export function FurtherWork() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="bg-canvas py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <SectionIntro
          index="02"
          label="Further work"
          title="Other builds worth a look."
          intro="Smaller products and client platforms. Private work can be walked through on a call."
          headingId="case-studies-heading"
        />

        <ul className="mt-14 sm:mt-16">
          {furtherProjects.map((project, index) => (
            <FurtherEntry key={project.slug} project={project} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
