'use client';

import {useEffect, useRef} from 'react';
import {useMotionProfile} from '@/hooks/use-motion-profile';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';

/**
 * Ember dot that tracks the pointer exactly, trailed by a ring that lags behind
 * it. The lag is what reads as expensive -- a cursor that tracks perfectly just
 * looks like a cursor.
 *
 * Also publishes normalised pointer position to CSS custom properties so the
 * WebGL layer can drive its heat distortion from the same source.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const {finePointer, reduced, ready} = useMotionProfile();

  useEffect(() => {
    if (!ready || !finePointer || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const pointer = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    const trailing = {...pointer};
    let hovering = false;
    let visible = false;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      root.style.setProperty('--cursor-x', (pointer.x / window.innerWidth).toFixed(4));
      root.style.setProperty('--cursor-y', (pointer.y / window.innerHeight).toFixed(4));

      hovering = Boolean((event.target as HTMLElement | null)?.closest(INTERACTIVE));
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    let frame = requestAnimationFrame(function raf() {
      // Critically-damped-ish follow: the ring eases toward the true pointer.
      trailing.x += (pointer.x - trailing.x) * 0.14;
      trailing.y += (pointer.y - trailing.y) * 0.14;

      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform =
        `translate3d(${trailing.x}px, ${trailing.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.9 : 1})`;
      ring.style.borderColor = hovering ? 'rgba(255, 95, 31, 0.85)' : 'rgba(226, 184, 135, 0.35)';

      frame = requestAnimationFrame(raf);
    });

    window.addEventListener('pointermove', onMove, {passive: true});
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
      root.classList.remove('has-custom-cursor');
    };
  }, [finePointer, reduced, ready]);

  // Rendered but inert until the effect above decides this visitor gets one.
  if (!ready || !finePointer || reduced) return null;

  return (
    <div aria-hidden className='pointer-events-none fixed inset-0 z-[9999] hidden md:block'>
      <div
        ref={dotRef}
        className='absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-ember opacity-0 transition-opacity duration-300'
        style={{boxShadow: '0 0 12px rgba(255, 95, 31, 0.9)'}}
      />
      <div
        ref={ringRef}
        className='absolute left-0 top-0 h-9 w-9 rounded-full border opacity-0 transition-[opacity,border-color] duration-300'
      />
    </div>
  );
}
