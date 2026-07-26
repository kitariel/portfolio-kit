'use client';

import {useRef, type ReactNode} from 'react';
import {motion, useMotionValue, useSpring} from 'motion/react';
import {useMotionProfile} from '@/hooks/use-motion-profile';

/**
 * Pulls its child toward the pointer while hovered, then springs back.
 *
 * `strength` is the fraction of the distance from centre the element travels --
 * keep it low. Past ~0.4 it stops feeling magnetic and starts feeling broken.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const {reduced, finePointer} = useMotionProfile();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, {stiffness: 220, damping: 18, mass: 0.35});
  const springY = useSpring(y, {stiffness: 220, damping: 18, mass: 0.35});

  if (reduced || !finePointer) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * strength);
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{x: springX, y: springY}}
    >
      {children}
    </motion.div>
  );
}
