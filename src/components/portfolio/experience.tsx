import { ArrowUpRight, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { profile, experience, education } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="panel"
    >
      <SectionHeading
        title={<span id="experience-heading">Experience & education</span>}
        subtitle="Engineering, leadership, and the foundations behind them"
        action={
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link text-xs"
          >
            LinkedIn <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        }
      />
      <div className="p-5">
        {experience.map((job, index) => (
          <article key={job.period} className="relative flex gap-4 pb-8">
            {index < experience.length && (
              <span
                aria-hidden
                className="absolute bottom-0 left-[15px] top-8 w-px bg-border"
              />
            )}
            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
              <BriefcaseBusiness
                aria-hidden
                className="h-4 w-4 text-foreground-muted"
              />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-sm font-medium leading-6">{job.title}</h3>
                <p className="text-[11px] leading-6 text-foreground-muted">
                  {job.period}
                </p>
              </div>
              <p className="mt-1 text-xs font-medium text-accent">
                {job.company}
              </p>
              <p className="mt-1 text-[11px] text-foreground-muted">
                {job.location}
              </p>
              <ul className="mt-3 space-y-2">
                {job.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="flex gap-2 text-xs leading-6 text-foreground-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-border-strong"
                    />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        <div className="relative flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
            <GraduationCap
              aria-hidden
              className="h-4 w-4 text-foreground-muted"
            />
          </span>
          <div>
            <h3 className="text-sm font-medium">{education.degree}</h3>
            <p className="mt-2 text-xs text-accent">{education.institution}</p>
            <p className="mt-2 text-xs leading-6 text-foreground-muted">
              {education.specialization} · {education.period}
              <br />
              {education.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
