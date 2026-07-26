'use client';

import {useEffect} from 'react';
import Lenis from 'lenis';
import {useMotionProfile} from '@/hooks/use-motion-profile';
import {setScroll, trackNativeScroll} from '@/lib/scroll-store';

/**
 * Momentum scrolling. This is the single biggest contributor to the "premium"
 * feel -- the weight and glide of the page under the wheel.
 *
 * Publishes scroll progress to `--scroll-progress` on <html> so CSS and the
 * WebGL layer can read one shared value instead of each attaching its own
 * scroll listener.
 */
export function SmoothScroll() {
  const {reduced, ready} = useMotionProfile();

  useEffect(() => {
    if (!ready) return;

    const root = document.documentElement;

    // Respect the user's stated preference: no hijacking, native scroll only.
    // The scroll store still needs feeding so scroll-linked visuals keep working.
    if (reduced) {
      root.classList.remove('lenis');
      return trackNativeScroll();
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ({progress, velocity}: {progress: number; velocity: number}) => {
      setScroll(progress, velocity);
      root.style.setProperty('--scroll-progress', progress.toFixed(4));
    });

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    // Anchor links must go through Lenis or they fight the momentum loop.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = anchor?.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, {offset: -80});
    };

    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      root.classList.remove('lenis');
    };
  }, [reduced, ready]);

  return null;
}
