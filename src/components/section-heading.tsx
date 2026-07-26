'use client';

import {cn} from '@/lib/utils';
import {Reveal} from '@/components/motion/reveal';

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
  return (
    <Reveal
      className={cn(
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl',
        className
      )}
    >
      <span
        className={cn(
          'eyebrow inline-flex items-center gap-2 text-ember',
          align === 'center' && 'justify-center'
        )}
      >
        <span className='h-px w-6 bg-gradient-to-r from-ember to-crema' />
        {eyebrow}
      </span>
      <h2 className='mt-5 font-display text-display-sm font-semibold text-cream text-balance'>{title}</h2>
      {subtitle && (
        <p className='mt-5 text-base leading-relaxed text-cream-muted sm:text-lg text-pretty'>{subtitle}</p>
      )}
    </Reveal>
  );
}
