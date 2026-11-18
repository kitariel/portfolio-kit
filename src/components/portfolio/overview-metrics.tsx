import { experience, impactMetrics, projects } from "@/lib/portfolio-data";
import { getYearsExperience } from "@/lib/portfolio-view";

export function OverviewMetrics() {
  const metrics = [
    {
      label: "Experience",
      value: `${getYearsExperience(experience, new Date())}+`,
      detail: "Years · since September 2019",
    },
    {
      label: "Projects",
      value: String(projects.length),
      detail: "Independent & team builds",
    },
    {
      label: "Engineers led",
      value: impactMetrics[3].value,
      detail: "Leadership & mentoring",
    },
    {
      label: "Less setup time",
      value: impactMetrics[0].value,
      detail: "Reusable modules & CLI",
    },
    {
      label: "Faster APIs",
      value: impactMetrics[1].value,
      detail: "Service & async optimisation",
    },
  ];
  return (
    <div
      aria-label="Career at a glance"
      className="grid grid-cols-2 gap-3 xl:grid-cols-5 xl:gap-0 xl:divide-x xl:divide-border xl:rounded-xl xl:border xl:border-border xl:bg-surface"
    >
      {metrics.map(({ label, value, detail }, index) => (
        <div
          key={label}
          className={`metric-cell ${index === 4 ? "col-span-2 xl:col-span-1" : ""}`}
        >
          <p className="text-xs leading-5 text-foreground-muted">{label}</p>
          <p className="mt-2 text-[28px] font-medium leading-9 tracking-tight tabular-nums">
            {value}
          </p>
          <p className="mt-2 text-xs leading-5 text-foreground-muted">
            {detail}
          </p>
        </div>
      ))}
    </div>
  );
}
