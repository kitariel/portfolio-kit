import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  subtitle,
  action,
  className,
}: {
  title: ReactNode;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("panel-heading", className)}>
      <div>
        <h2 className="panel-title">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-xs leading-5 text-foreground-muted">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
