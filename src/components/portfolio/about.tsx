import { Check, MapPin } from "lucide-react";
import { profile, credibilityPoints } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";

const beliefs = [
  {
    title: "Start with the context",
    body: "The business, the people using the product, and the constraints all shape the solution. I want to understand those before deciding what to build.",
  },
  {
    title: "Make the system understandable",
    body: "I enjoy turning a conversation into a clear workflow and an architecture that other engineers can build on.",
  },
  {
    title: "Build for the next engineer",
    body: "Shared modules, maintainable code, and useful documentation matter. So does helping the engineers I lead develop their own judgement.",
  },
  {
    title: "Own the final decision",
    body: "AI is part of my research, planning, and implementation process. I stay responsible for the quality and behaviour of what ships.",
  },
];
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="panel self-start"
    >
      <SectionHeading
        title={<span id="about-heading">About the engineer</span>}
      />
      <div className="p-5">
        <p className="text-sm leading-7">{profile.intro}</p>
        <p className="mt-4 flex items-center gap-2 text-xs text-foreground-muted">
          <MapPin aria-hidden className="h-4 w-4" />
          {profile.location}
        </p>
        <ul className="mt-5 space-y-3 border-t border-border pt-5">
          {credibilityPoints.slice(1).map((point) => (
            <li
              key={point}
              className="flex gap-2 text-xs leading-6 text-foreground-muted"
            >
              <Check
                aria-hidden
                className="mt-1 h-4 w-4 shrink-0 text-accent"
              />
              {point}
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-5 border-t border-border pt-5">
          {beliefs.map((belief) => (
            <div key={belief.title}>
              <dt className="text-xs font-medium">{belief.title}</dt>
              <dd className="mt-2 text-xs leading-6 text-foreground-muted">
                {belief.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
