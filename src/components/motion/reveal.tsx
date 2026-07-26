'use client';

import {useRef, type ReactNode} from 'react';
import {motion, useInView, type Variants} from 'motion/react';
import {cn} from '@/lib/utils';
import {useMotionProfile} from '@/hooks/use-motion-profile';

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element starts. */
  delay?: number;
  /** Distance travelled, in px. */
  distance?: number;
}

/**
 * Scroll reveal: rises, sharpens from a blur, and fades up.
 *
 * The blur is the point. A plain translate+fade reads as a template; resolving
 * focus reads as depth-of-field, which is why it feels costly.
 */
export function Reveal({children, className, delay = 0, distance = 28}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, margin: '-12% 0px -12% 0px'});
  const {reduced} = useMotionProfile();

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{opacity: 0, y: distance, filter: 'blur(10px)'}}
      animate={inView ? {opacity: 1, y: 0, filter: 'blur(0px)'} : undefined}
      transition={{duration: 0.9, delay, ease: EASE}}
    >
      {children}
    </motion.div>
  );
}

const lineVariants: Variants = {
  hidden: {y: '110%'},
  shown: (i: number) => ({
    y: '0%',
    transition: {duration: 1, delay: 0.06 * i, ease: EASE},
  }),
};

/**
 * Per-line masked reveal -- each line slides up from behind its own clipping
 * box. Pass lines explicitly rather than splitting text, so the markup keeps
 * real, selectable, screen-reader-friendly content.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once: true, margin: '-10% 0px'});
  const {reduced} = useMotionProfile();

  return (
    <span ref={ref} className={cn('block', className)}>
      {lines.map((line, index) => (
        // The padding/negative-margin pair grows the clip box below the
        // baseline without shifting layout, so descenders (g, y, p) are not
        // sliced off by overflow-hidden at these tight display line-heights.
        <span
          key={index}
          className={cn('block overflow-hidden pb-[0.14em] -mb-[0.14em]', lineClassName)}
        >
          {reduced ? (
            <span className='block'>{line}</span>
          ) : (
            <motion.span
              className='block will-change-transform'
              custom={index + delay * 10}
              variants={lineVariants}
              initial='hidden'
              animate={inView ? 'shown' : 'hidden'}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}

/**
 * Staggers its direct children through the same reveal. Saves threading an
 * incrementing delay through every item in a mapped list.
 */
export function RevealStagger({
  children,
  className,
  step = 0.08,
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <Reveal key={index} delay={index * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
