import Image from "next/image";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { media, profile, projects } from "@/lib/portfolio-data";

export function PortfolioHero() {
  const featured = projects.find((project) => project.slug === "aliplace");
  return (
    <div className="panel grid gap-6 p-5 sm:p-6 min-[1440px]:grid-cols-[minmax(0,1fr)_260px]">
      <div className="flex flex-col justify-between gap-5">
        <div className="flex min-w-0 items-center gap-4">
          <Image
            src={media.portrait.src}
            alt={media.portrait.alt}
            width={80}
            height={80}
            priority
            className="h-16 w-16 shrink-0 rounded-xl object-cover object-[center_25%]"
          />
          <div>
            <h1
              id="overview-heading"
              className="text-xl font-medium tracking-tight sm:text-[28px] sm:leading-9"
            >
              {profile.name}
            </h1>
            <p className="mt-1 text-xs leading-5 text-foreground-muted sm:text-sm">
              {profile.title}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-foreground-muted">
              <MapPin aria-hidden className="h-3.5 w-3.5" />
              {profile.location}
            </p>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-foreground-muted">
          I build products end to end, from map-first property discovery to the
          internal platforms engineering teams depend on.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="h-10 rounded-lg px-4 shadow-none">
            <a href="#contact">
              Get in touch <ArrowUpRight aria-hidden />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-10 rounded-lg px-4 shadow-none"
          >
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">
              <Download aria-hidden />
              Résumé<span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </Button>
        </div>
      </div>
      {featured?.image && featured.href && (
        <a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden self-center rounded-lg border border-border bg-background p-2 transition-colors hover:border-border-strong min-[1440px]:block"
        >
          <div className="relative aspect-[1.82] overflow-hidden rounded">
            <Image
              src={featured.image.src}
              alt={featured.image.alt}
              fill
              sizes="260px"
              className="object-cover object-top"
            />
          </div>
          <div className="flex items-center justify-between gap-2 px-1 pb-1 pt-3">
            <span>
              <span className="block text-xs font-medium">{featured.name}</span>
              <span className="mt-1 block text-[11px] text-foreground-muted">
                Places discovery & property operations
              </span>
            </span>
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 text-foreground-muted"
            />
          </div>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
