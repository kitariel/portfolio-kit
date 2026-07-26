'use client';

import type {ElementType, ReactNode} from 'react';
import {useReveal} from '@/hooks/use-reveal';

interface RevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Flags a subtree as on-screen via `data-shown`, which drives the
 * `.reveal-line` / `.reveal-fade` utilities in globals.css. Reduced motion
 * neutralises the transforms, so content is never left hidden.
 */
export function Reveal({as: Tag = 'div', className, children}: RevealProps) {
  const {ref, shown} = useReveal<HTMLElement>();

  return (
    <Tag ref={ref} data-shown={shown} className={className}>
      {children}
    </Tag>
  );
}
