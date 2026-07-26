'use client';

import {useEffect, useRef} from 'react';

type ProgressHandler = (progress: number) => void;

interface Options {
  /** Skip all measurement — used for the reduced-motion fallback. */
  disabled?: boolean;
}

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

/**
 * Reports how far a tall element has travelled through the viewport as a 0–1
 * value, coalescing scroll and resize events into a single rAF tick.
 *
 * Reads (getBoundingClientRect) happen inside the animation frame, so the
 * handler can write styles without forcing a second layout pass, and fast or
 * reversed scrolling resolves to whatever the latest frame measured rather
 * than replaying a queue of stale events.
 */
export function useScrollProgress<T extends HTMLElement>(
  onProgress: ProgressHandler,
  {disabled = false}: Options = {}
) {
  const targetRef = useRef<T>(null);
  const handlerRef = useRef(onProgress);

  handlerRef.current = onProgress;

  useEffect(() => {
    const element = targetRef.current;
    if (!element || disabled) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      const rect = element.getBoundingClientRect();
      // Distance the element scrolls while its pinned stage is on screen.
      const travel = Math.max(element.offsetHeight - window.innerHeight, 1);

      handlerRef.current(clamp01(-rect.top / travel));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    // Run once so the first paint reflects the current scroll position
    // (matters on reload, back-navigation, and deep links).
    measure();

    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [disabled]);

  return targetRef;
}
