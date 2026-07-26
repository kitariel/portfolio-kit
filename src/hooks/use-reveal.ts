'use client';

import {useEffect, useRef, useState} from 'react';

/**
 * Reveals an element once it scrolls into view. Pair with a transition utility,
 * e.g. `className={cn('transition-all duration-700', shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}`.
 *
 * Options are read once, on the first run — call sites pass object literals, so
 * re-subscribing whenever a new one is allocated would just churn observers.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  const optionsRef = useRef(options);

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
      {threshold: 0.15, ...optionsRef.current}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {ref, shown};
}
