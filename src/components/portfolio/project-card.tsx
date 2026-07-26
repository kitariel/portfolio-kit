'use client';

import Image from 'next/image';
import {ArrowUpRight, Lock} from 'lucide-react';
import type {Project} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

function TechList({items, limit}: {items: string[]; limit?: number}) {
  const shown = limit ? items.slice(0, limit) : items;
  const rest = items.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((item) => (
        <li
          key={item}
          className="rounded-md border border-border bg-surface px-2.5 py-1 font-jetbrains text-[11px] text-foreground-muted"
        >
          {item}
        </li>
      ))}
      {rest > 0 && (
        <li className="rounded-md px-2.5 py-1 font-jetbrains text-[11px] text-foreground-muted">+{rest} more</li>
      )}
    </ul>
  );
}

/**
 * Stand-in for projects with no public screenshot. Deliberately a typographic
 * plate rather than a mock interface — nothing here pretends to be a product
 * shot that doesn't exist.
 */
function ProjectPlate({name, className}: {name: string; className?: string}) {
  return (
    <div
      aria-hidden
      className={cn(
        'grain relative flex items-center justify-center overflow-hidden rounded-lg border border-border bg-surface',
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(127, 215, 255, 0.10), transparent 70%)'}}
      />
      <span className="relative font-display text-2xl font-medium tracking-tight text-foreground-muted sm:text-3xl">
        {name}
      </span>
    </div>
  );
}

function ProjectLink({project}: {project: Project}) {
  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
      >
        View project
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
        />
        <span className="sr-only"> — {project.name} (opens in a new tab)</span>
      </a>
    );
  }
  return null;
}

function StatusBadge({status}: {status?: string}) {
  if (!status) return null;
  const isPrivate = status.toLowerCase().startsWith('private');
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-jetbrains text-[11px] text-foreground-muted">
      {isPrivate && <Lock aria-hidden className="h-3 w-3" />}
      {status}
    </span>
  );
}

/** Large alternating layout used for the four flagship products. */
export function EditorialProjectCard({project, flipped}: {project: Project; flipped: boolean}) {
  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={cn('lg:col-span-7', flipped && 'lg:order-2')}>
        {project.image ? (
          <div className="panel relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <ProjectPlate name={project.name} className="aspect-[16/10]" />
        )}
      </div>

      <div className={cn('lg:col-span-5', flipped && 'lg:order-1')}>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            {project.name}
          </h3>
          <StatusBadge status={project.status} />
        </div>

        <dl className="mt-5 space-y-4 text-sm leading-relaxed">
          <div>
            <dt className="eyebrow text-foreground-muted">Problem</dt>
            <dd className="mt-2 text-foreground-muted">{project.problem}</dd>
          </div>
          <div>
            <dt className="eyebrow text-foreground-muted">Solution</dt>
            <dd className="mt-2 text-foreground">{project.solution}</dd>
          </div>
          <div>
            <dt className="eyebrow text-foreground-muted">Role</dt>
            <dd className="mt-2 text-foreground-muted">{project.role}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <TechList items={project.tech} limit={7} />
        </div>

        <div className="mt-6">
          <ProjectLink project={project} />
        </div>
      </div>
    </article>
  );
}

/** Compact card for the rest of the catalogue. */
export function CompactProjectCard({project}: {project: Project}) {
  return (
    <article className="panel panel-interactive flex flex-col overflow-hidden">
      {project.image ? (
        <div className="relative aspect-[16/9] border-b border-border">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <ProjectPlate name={project.name} className="aspect-[16/9] rounded-none border-0 border-b" />
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-medium text-foreground">{project.name}</h3>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">{project.solution}</p>
        <p className="mt-3 text-xs text-foreground-muted">{project.role}</p>
        <div className="mt-4">
          <TechList items={project.tech} limit={4} />
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <StatusBadge status={project.status} />
          <ProjectLink project={project} />
        </div>
      </div>
    </article>
  );
}
