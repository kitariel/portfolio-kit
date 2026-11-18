import type { Project } from "./portfolio-data";

export type ProjectFilter = "all" | "live" | "independent" | "team";

export function filterProjects(
  projects: Project[],
  filter: ProjectFilter,
  query: string,
) {
  const search = query.trim().toLocaleLowerCase();
  return projects.filter((project) => {
    const independent =
      project.role.startsWith("Solo build") ||
      project.status?.startsWith("Independent product") === true;
    const matchesFilter =
      filter === "all" ||
      (filter === "live" &&
        Boolean(project.href) &&
        /live/i.test(project.status ?? "")) ||
      (filter === "independent" && independent) ||
      (filter === "team" && !independent);
    const matchesSearch = [
      project.name,
      project.solution,
      project.role,
      ...project.tech,
    ]
      .join(" ")
      .toLocaleLowerCase()
      .includes(search);
    return matchesFilter && matchesSearch;
  });
}

/** Completed years since the first professional role, using explicit ISO dates. */
export function getYearsExperience(
  records: { startedAt: string }[],
  asOf: Date,
) {
  if (!records.length) return 0;
  const start = new Date(
    Math.min(...records.map((record) => Date.parse(record.startedAt))),
  );
  let years = asOf.getUTCFullYear() - start.getUTCFullYear();
  if (
    asOf.getUTCMonth() < start.getUTCMonth() ||
    (asOf.getUTCMonth() === start.getUTCMonth() &&
      asOf.getUTCDate() < start.getUTCDate())
  )
    years--;
  return Math.max(0, years);
}

/** Account for adjacent dashboard panels and anchors near the end of a page. */
export function getActiveSection(
  sections: { href: string; top: number }[],
  current: string,
  atBottom: boolean,
) {
  if (atBottom && sections.length) return sections[sections.length - 1].href;
  const reached = sections.filter((section) => section.top <= 160);
  if (!reached.length) return "#overview";
  const top = Math.max(...reached.map((section) => section.top));
  const candidates = reached.filter(
    (section) => Math.abs(section.top - top) < 8,
  );
  return (
    candidates.find((section) => section.href === current)?.href ??
    candidates[0].href
  );
}
