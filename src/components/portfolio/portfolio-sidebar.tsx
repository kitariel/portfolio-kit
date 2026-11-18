import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Github,
  Layers3,
  LayoutDashboard,
  Linkedin,
  Mail,
  Route,
  UserRound,
} from "lucide-react";
import { navItems, profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const icons = [
  LayoutDashboard,
  Layers3,
  Route,
  Code2,
  BriefcaseBusiness,
  UserRound,
  Mail,
];

export function PortfolioSidebar({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate?: (href: string) => void;
}) {
  return (
    <div className="flex h-full flex-col px-4 pb-4 pt-6">
      <a
        href="#overview"
        onClick={() => onNavigate?.("#overview")}
        className="flex items-center gap-3 px-2"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground font-jetbrains text-sm font-medium text-background">
          kb<span className="opacity-60">.</span>
        </span>
        <span className="min-w-0">
          <span className="block text-[13px] font-semibold">
            {profile.name}
          </span>
          <span className="mt-1 block text-[11px] text-foreground-muted">
            Senior full-stack engineer
          </span>
        </span>
      </a>
      <p className="mb-3 mt-10 px-3 text-xs text-foreground-muted">Portfolio</p>
      <nav aria-label="Portfolio sections">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = icons[index];
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => onNavigate?.(item.href)}
                  aria-current={active === item.href ? "location" : undefined}
                  className={cn(
                    "flex min-h-10 items-center gap-3 rounded-lg px-3 text-[13px] transition-colors duration-150",
                    active === item.href
                      ? "bg-accent-soft font-medium text-accent"
                      : "text-foreground-muted hover:bg-background hover:text-foreground",
                  )}
                >
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto pt-10">
        <div className="rounded-lg border border-border bg-background p-3">
          <p className="flex items-center gap-2 text-xs font-medium">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            Cebu, Philippines
          </p>
          <p className="mt-2 text-xs leading-5 text-foreground-muted">
            Building products.
            <br />
            Leading engineering teams.
          </p>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in a new tab)"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-background hover:text-foreground"
          >
            <Github aria-hidden className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in a new tab)"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-background hover:text-foreground"
          >
            <Linkedin aria-hidden className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="ml-auto flex h-11 items-center gap-1 rounded-lg px-2 text-xs text-foreground-muted hover:text-accent"
          >
            Say hello <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
