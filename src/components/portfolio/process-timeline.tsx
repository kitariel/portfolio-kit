import { processSteps } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { AiWorkflow } from "./ai-workflow";

export function ProcessTimeline() {
  return (
    <section id="process" aria-labelledby="process-heading" className="panel">
      <SectionHeading
        title={<span id="process-heading">Development process</span>}
        subtitle="A clear workflow from requirements to release"
      />
      <ol className="p-5">
        {processSteps.map((step, index) => (
          <li key={step.number} className="relative flex gap-4 pb-6 last:pb-0">
            {index < processSteps.length - 1 && (
              <span
                aria-hidden
                className="absolute bottom-0 left-[15px] top-8 w-px bg-border"
              />
            )}
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background font-jetbrains text-[11px] text-accent">
              {step.number}
            </span>
            <div className="pt-1">
              <h3 className="text-sm font-medium">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-6 text-foreground-muted">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <AiWorkflow />
    </section>
  );
}
