import { aiTools } from "@/lib/portfolio-data";
import { AiWorkflowCard } from "./ai-workflow-card";

export function AiWorkflow() {
  return (
    <div id="workflow" className="border-t border-border p-5">
      <h3 className="text-sm font-medium">AI in my workflow</h3>
      <p className="mt-2 text-xs leading-6 text-foreground-muted">
        Research, planning, and execution — with human review and ownership at
        every step
      </p>
      <div className="mt-4 divide-y divide-border">
        {aiTools.map((tool) => (
          <AiWorkflowCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
