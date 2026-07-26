'use client';

import {useReveal} from '@/hooks/use-reveal';
import {cn} from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

/** Eyebrow + title + supporting line, shared by every section. */
export function SectionHeading({eyebrow, title, subtitle, align = 'left', className}: SectionHeadingProps) {
  const {ref, shown} = useReveal();

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className
      )}
    >
      <span
        className={cn(
          'eyebrow inline-flex items-center gap-3 text-accent',
          align === 'center' && 'justify-center'
        )}
      >
        <span aria-hidden className="h-px w-6 bg-accent opacity-60" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-balance font-display text-3xl font-medium leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-foreground-muted sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
