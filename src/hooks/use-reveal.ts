'use client';

import {useEffect, useRef, useState} from 'react';

/**
 * Reveals an element once it scrolls into view. Pair with a transition utility,
 * e.g. `className={cn('transition-all duration-700', shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}`.
 * Replaces the duplicated IntersectionObserver logic that lived in each section.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      {threshold: 0.15, ...options}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {ref, shown};
}
