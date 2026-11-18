import { Code2, Database, Server, Workflow } from "lucide-react";
import { techCategories } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";

const icons = [Code2, Server, Database, Workflow];
export function TechnologyStack() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="panel">
      <SectionHeading
        title={<span id="stack-heading">Technology stack</span>}
        subtitle="Tools I use across the product lifecycle"
      />
      <div className="divide-y divide-border">
        {techCategories.map((category, index) => {
          const Icon = icons[index];
          return (
            <div key={category.title} className="p-5">
              <h3 className="flex items-center gap-2 text-xs font-medium">
                <Icon aria-hidden className="h-4 w-4 text-foreground-muted" />
                {category.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
