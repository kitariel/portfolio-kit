import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";

const links = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: profile.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "Explore my repositories",
    href: profile.github,
    icon: Github,
    external: true,
  },
  {
    label: "Résumé",
    value: "Download PDF",
    href: profile.resume,
    icon: Download,
    external: true,
  },
];
export function QuickContact() {
  return (
    <section aria-labelledby="quick-contact-heading" className="panel">
      <SectionHeading
        title={<span id="quick-contact-heading">Quick contact</span>}
      />
      <ul className="divide-y divide-border px-5">
        {links.map(({ label, value, href, icon: Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex min-h-[72px] items-center gap-3 py-3 text-foreground-muted transition-colors hover:text-accent"
            >
              <Icon aria-hidden className="h-[18px] w-[18px] shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-medium text-foreground">
                  {label}
                </span>
                <span className="mt-1 block break-all text-[11px] leading-5">
                  {value}
                </span>
              </span>
              <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0" />
              {external && (
                <span className="sr-only"> (opens in a new tab)</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
