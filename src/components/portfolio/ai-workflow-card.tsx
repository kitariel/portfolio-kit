'use client';

import {useId, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {AiIcon} from '@/components/portfolio/ai-icons';
import type {AiTool} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

/**
 * Card icons stay invisible until the flying marks have finished their run, so
 * the two never appear at once. `--ai-handoff` is written by the transition;
 * without it (reduced motion, no JS) the icon is simply visible.
 */
const HANDOFF_OPACITY = 'clamp(0, calc((var(--ai-handoff, 1) - 0.94) * 16.6667), 1)';

export function AiWorkflowCard({tool, index}: {tool: AiTool; index: number}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article
      className="panel panel-interactive group relative flex flex-col p-6 sm:p-7"
      style={{'--brand': tool.brand} as React.CSSProperties}
    >
      {/* Landing target for the mark that flies out of the footage. */}
      <span
        data-ai-slot={tool.id}
        className="block h-14 w-14 text-foreground transition-colors duration-300 group-hover:text-[var(--brand)] group-focus-within:text-[var(--brand)]"
      >
        <AiIcon tool={tool.id} className="h-full w-full" style={{opacity: HANDOFF_OPACITY}} />
      </span>

      <div className="mt-6 flex items-baseline gap-3">
        <h3 className="font-display text-xl font-medium text-foreground">{tool.name}</h3>
        <span className="eyebrow text-foreground-muted">{tool.role}</span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">{tool.summary}</p>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="mt-5 inline-flex items-center gap-2 self-start text-sm font-medium text-foreground transition-colors hover:text-accent"
      >
        Explore role
        <ChevronDown
          aria-hidden
          className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')}
        />
        <span className="sr-only"> for {tool.name}</span>
      </button>

      {/* The `hidden` attribute alone loses to Tailwind's `flex` utility, so the
          display value is toggled explicitly as well. */}
      <ul id={panelId} hidden={!open} className={cn('mt-4 flex-wrap gap-1.5', open ? 'flex' : 'hidden')}>
        {tool.responsibilities.map((item) => (
          <li
            key={item}
            className="rounded-md border border-border bg-surface px-2.5 py-1 font-jetbrains text-[11px] text-foreground-muted"
          >
            {item}
          </li>
        ))}
      </ul>

      <span aria-hidden className="eyebrow absolute right-6 top-6 text-foreground-muted opacity-40">
        0{index + 1}
      </span>
    </article>
  );
}
