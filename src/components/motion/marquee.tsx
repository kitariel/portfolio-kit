'use client';

import {type ReactNode} from 'react';
import {cn} from '@/lib/utils';

/**
 * Infinite horizontal marquee. Children are rendered twice and the track
 * translates exactly -50%, so the wrap point is invisible.
 *
 * CSS animation rather than JS: it runs on the compositor and costs nothing on
 * the main thread while the WebGL layer is already busy there.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
}: {
  children: ReactNode;
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('marquee-mask overflow-hidden', className)}>
      <div
        className='flex w-max animate-marquee items-center'
        style={{
          ['--marquee-duration' as string]: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className='flex shrink-0 items-center'>{children}</div>
        <div aria-hidden className='flex shrink-0 items-center'>
          {children}
        </div>
      </div>
    </div>
  );
}
