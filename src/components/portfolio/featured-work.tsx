"use client";

import { useState } from "react";
import { ChevronRight, Search, X } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";
import { filterProjects, type ProjectFilter } from "@/lib/portfolio-view";
import { cn } from "@/lib/utils";
import { ProjectCard, ProjectLink, ProjectStatus } from "./project-card";
import { ProjectIcon } from "./project-icon";
import { ProjectDetails } from "./project-details";
import { SectionHeading } from "./section-heading";

const filters: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All projects" },
  { value: "live", label: "Live" },
  { value: "independent", label: "Independent" },
  { value: "team", label: "Team & client" },
];

export function FeaturedWork() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const shown = filterProjects(projects, filter, search);
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="panel self-start"
    >
      <SectionHeading
        title={
          <span id="work-heading">
            Selected work{" "}
            <span className="ml-2 text-xs font-normal tabular-nums text-foreground-muted">
              {projects.length}
            </span>
          </span>
        }
        subtitle="Independent products, client platforms, and internal tools"
      />
      <div className="flex flex-col justify-between gap-3 border-b border-border p-4 lg:flex-row lg:items-center">
        <div
          role="group"
          aria-label="Filter projects"
          className="flex flex-wrap gap-1"
        >
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
              className={cn(
                "min-h-9 rounded-md px-3 text-xs transition-colors duration-150",
                filter === item.value
                  ? "bg-accent-soft font-medium text-accent"
                  : "text-foreground-muted hover:bg-background",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted"
          />
          <input
            type="search"
            aria-label="Search projects"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects"
            className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-9 text-xs placeholder:text-foreground-muted lg:w-48"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear project search"
              className="absolute right-0 top-0 flex h-10 w-9 items-center justify-center text-foreground-muted"
            >
              <X aria-hidden className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
      <div className="hidden md:block">
        <table className="w-full table-fixed text-left">
          <caption className="sr-only">
            Portfolio projects — select a project name to view its details
          </caption>
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[29%]" />
            <col className="w-[21%]" />
            <col className="w-[19%]" />
            <col className="w-[7%]" />
          </colgroup>
          <thead className="border-b border-border bg-background text-[11px] text-foreground-muted">
            <tr>
              {["Project", "Description", "Technology", "Status", "Action"].map(
                (title) => (
                  <th
                    scope="col"
                    key={title}
                    className={cn(
                      "px-3 py-3 font-medium",
                      title === "Project" && "pl-5",
                      title === "Action" && "px-0",
                    )}
                  >
                    <span className={title === "Action" ? "sr-only" : ""}>
                      {title}
                    </span>
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {shown.map((project) => (
              <tr
                key={project.slug}
                className="transition-colors duration-150 hover:bg-surface-elevated focus-within:bg-background"
              >
                <th scope="row" className="py-4 pl-5 pr-3 font-normal">
                  <div className="flex items-center gap-3">
                    <ProjectIcon
                      slug={project.slug}
                      className="h-8 w-8 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      className="min-h-10 min-w-0 break-words text-left text-[13px] font-medium leading-5 hover:text-accent"
                    >
                      {project.name}
                      <span className="sr-only"> — view details</span>
                    </button>
                  </div>
                </th>
                <td className="px-3 py-4">
                  <p className="line-clamp-2 text-[13px] leading-6 text-foreground-muted">
                    {project.solution}
                  </p>
                </td>
                <td className="px-3 py-4">
                  <ul className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 2).map((tech) => (
                      <li className="tag max-w-full break-words" key={tech}>
                        {tech}
                      </li>
                    ))}
                    {project.tech.length > 2 && (
                      <li className="tag">+{project.tech.length - 2}</li>
                    )}
                  </ul>
                </td>
                <td className="px-3 py-4">
                  <ProjectStatus project={project} />
                </td>
                <td className="py-3 pr-2">
                  {project.href ? (
                    <ProjectLink project={project} />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      aria-label={`View ${project.name} details`}
                      className="flex h-10 w-8 items-center justify-center rounded-lg text-foreground-muted hover:bg-accent-soft hover:text-accent"
                    >
                      <ChevronRight aria-hidden className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divide-y divide-border md:hidden">
        {shown.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOpen={() => setSelected(project)}
          />
        ))}
      </div>
      {!shown.length && (
        <div className="p-10 text-center">
          <p className="text-sm font-medium">No projects found</p>
          <p className="mt-2 text-xs leading-5 text-foreground-muted">
            Try another name or technology, or change the filter
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
            className="text-link mt-3 text-xs"
          >
            Clear filters
          </button>
        </div>
      )}
      <div className="border-t border-border px-5 py-3">
        <p role="status" className="text-xs text-foreground-muted">
          Showing {shown.length} of {projects.length} projects{" "}
          <span aria-hidden className="mx-1">
            ·
          </span>{" "}
          Select a project to explore the details
        </p>
      </div>
      <ProjectDetails project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
