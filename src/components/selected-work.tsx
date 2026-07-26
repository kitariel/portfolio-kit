'use client';

import {useState} from 'react';
import {ProjectMedia} from '@/components/project-media';
import {Reveal} from '@/components/reveal';
import {SectionIntro} from '@/components/section-intro';
import {featuredProjects, type Project} from '@/lib/content';

function ProjectEntry({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [active, setActive] = useState(false);
  const mediaFirst = index % 2 === 1;

  return (
    <Reveal as="article" className="group rule-t pt-8 sm:pt-10 lg:pt-12">
      {/* Hover and keyboard focus drive the same preview state. */}
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="reveal-fade grid gap-7 lg:grid-cols-12 lg:gap-10"
      >
        <div
          className={`lg:col-span-7 ${mediaFirst ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <ProjectMedia project={project} active={active} priority={index === 0} />
        </div>

        <div
          className={`flex flex-col lg:col-span-5 ${
            mediaFirst ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <p className="label text-muted flex items-center gap-3">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span aria-hidden="true">/</span>
            <span>{project.category}</span>
            {project.year && (
              <>
                <span aria-hidden="true">/</span>
                <span>{project.year}</span>
              </>
            )}
          </p>

          <h3 className="display-md mt-4">{project.title}</h3>

          <p className="prose-quiet mt-4">{project.problem}</p>

          {(project.role || project.tech.length > 0 || project.result) && (
            <dl className="mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {project.role && (
                <div>
                  <dt className="label text-muted">Role</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed">
                    {project.role}
                  </dd>
                </div>
              )}

              {project.result && (
                <div>
                  <dt className="label text-muted">Result</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed">
                    {project.result}
                  </dd>
                </div>
              )}

              {project.tech.length > 0 && (
                <div className="sm:col-span-2">
                  <dt className="label text-muted">Stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[0.8125rem]">
                    {project.tech.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-8 lg:mt-auto lg:pt-8">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                data-rule="hidden"
                className="link-rule text-[1.0625rem] font-medium"
              >
                {project.linkLabel ?? 'Open live site'}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <a
                href="#contact"
                data-rule="hidden"
                className="link-rule text-[1.0625rem] font-medium"
              >
                {project.pending
                  ? 'Ask for a walkthrough'
                  : 'Private — request a demo'}
                <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="on-ink bg-ink py-20 text-canvas sm:py-24 lg:py-32"
    >
      <div className="shell">
        <SectionIntro
          index="01"
          label="Selected work"
          title="Products and platforms I've built."
          intro="A mix of public products and private client platforms. Every screenshot is from the real build."
          headingId="work-heading"
        />

        <div className="mt-14 flex flex-col gap-16 sm:mt-16 sm:gap-20 lg:gap-24">
          {featuredProjects.map((project, index) => (
            <ProjectEntry key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
