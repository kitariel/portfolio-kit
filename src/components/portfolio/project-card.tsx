import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import { ProjectIcon } from "./project-icon";

export function ProjectStatus({ project }: { project: Project }) {
  const live = Boolean(project.href) && /live/i.test(project.status ?? "");
  return (
    <span className="inline-flex items-start gap-1.5 text-[11px] leading-5 text-foreground-muted">
      <span
        aria-hidden
        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${live ? "bg-success" : "bg-border-strong"}`}
      />
      {project.status}
    </span>
  );
}

export function ProjectLink({ project }: { project: Project }) {
  if (!project.href) return null;
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.name} (opens in a new tab)`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-accent-soft hover:text-accent"
    >
      <ArrowUpRight aria-hidden className="h-4 w-4" />
    </a>
  );
}

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <article className="p-4">
      <div className="flex items-start gap-3">
        <ProjectIcon slug={project.slug} />
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={onOpen}
            className="min-h-10 text-left text-sm font-semibold text-foreground hover:text-accent"
          >
            {project.name}
            <span className="sr-only"> — view details</span>
          </button>
          <div>
            <ProjectStatus project={project} />
          </div>
        </div>
        <ProjectLink project={project} />
      </div>
      <p className="mt-3 text-xs leading-6 text-foreground-muted">
        {project.solution}
      </p>
      <ul aria-label="Technologies" className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 3).map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
        {project.tech.length > 3 && (
          <li className="tag">+{project.tech.length - 3}</li>
        )}
      </ul>
      <button type="button" onClick={onOpen} className="text-link mt-2 text-xs">
        View project details{" "}
        <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
        <span className="sr-only"> for {project.name}</span>
      </button>
    </article>
  );
}
