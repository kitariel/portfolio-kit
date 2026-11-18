import { ArrowUpRight, TrendingUp } from "lucide-react";
import { impactHighlights, impactMetrics } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";

export function ImpactMetrics() {
  return (
    <section aria-labelledby="impact-heading" className="panel">
      <SectionHeading
        title={<span id="impact-heading">Engineering impact</span>}
        action={
          <TrendingUp aria-hidden className="h-4 w-4 text-foreground-muted" />
        }
      />
      <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 min-[1440px]:grid-cols-1 min-[1440px]:divide-y">
        {impactMetrics.map((metric, index) => (
          <div className="p-5" key={metric.label}>
            <div className="flex items-baseline gap-2">
              <p className="text-[28px] font-medium tracking-tight tabular-nums">
                {metric.value}
              </p>
              <span className="text-xs text-foreground-muted">
                {index === 3 ? "engineers" : "improvement"}
              </span>
            </div>
            <h3 className="mt-2 text-xs font-medium">{metric.label}</h3>

            <p className="mt-3 text-xs leading-6 text-foreground-muted">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-5 py-4">
        <p className="text-[11px] leading-5 text-foreground-muted">
          Selected outcomes from my résumé and production engineering work
        </p>
        <a href="#experience" className="text-link mt-1 text-xs">
          View experience <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
        </a>
      </div>
      <details className="border-t border-border px-5 py-4">
        <summary className="min-h-8 text-xs font-medium">
          More engineering focus areas
        </summary>
        <ul className="mt-3 space-y-2 text-xs leading-6 text-foreground-muted">
          {impactHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>
    </section>
  );
}
