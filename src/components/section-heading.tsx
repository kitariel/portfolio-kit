'use client';

import {cn} from '@/lib/utils';
import {useReveal} from '@/hooks/use-reveal';

interface SectionHeadingProps {
  /** Mono kicker label, e.g. "02 — How I build" */
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

/** Consistent eyebrow + title + subtitle block used by every section. */
export function SectionHeading({eyebrow, title, subtitle, align = 'center', className}: SectionHeadingProps) {
  const {ref, shown} = useReveal();

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl',
        className
      )}
    >
      <span className={cn('eyebrow inline-flex items-center gap-2 text-violet-300/80', align === 'center' && 'justify-center')}>
        <span className="h-px w-6 bg-gradient-to-r from-violet-400/60 to-cyan-400/60" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance">{title}</h2>
      {subtitle && <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">{subtitle}</p>}
    </div>
  );
}
