import { ChevronDown } from "lucide-react";
import type { AiTool } from "@/lib/portfolio-data";

export function AiWorkflowCard({ tool }: { tool: AiTool }) {
  return (
    <details className="group py-2">
      <summary className="flex min-h-10 list-none items-center justify-between gap-3 text-xs [&::-webkit-details-marker]:hidden">
        <span>
          <span className="font-medium">{tool.name}</span>
          <span className="ml-3 text-foreground-muted">{tool.role}</span>
        </span>
        <ChevronDown
          aria-hidden
          className="h-4 w-4 text-foreground-muted transition-transform duration-150 group-open:rotate-180"
        />
      </summary>
      <p className="py-2 text-xs leading-6 text-foreground-muted">
        {tool.summary}
      </p>
      <ul className="mb-2 mt-2 flex flex-wrap gap-1.5">
        {tool.responsibilities.map((item) => (
          <li className="tag" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </details>
  );
}
