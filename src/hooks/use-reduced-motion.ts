'use client';

import {useEffect, useState} from 'react';

/**
 * Tracks `prefers-reduced-motion`. Starts as `false` so server and first client
 * render agree; the real value lands in the effect right after mount.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
