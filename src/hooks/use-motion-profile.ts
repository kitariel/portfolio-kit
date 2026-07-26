'use client';

import {useEffect, useState} from 'react';

export interface MotionProfile {
  /** User asked for reduced motion -- kill parallax, momentum scroll and loops. */
  reduced: boolean;
  /** Coarse pointer / small viewport -- downgrade the WebGL layer. */
  lowPower: boolean;
  /** Real mouse available, so a custom cursor makes sense. */
  finePointer: boolean;
  /** Resolved once on the client; until then, assume the cheap path. */
  ready: boolean;
}

const INITIAL: MotionProfile = {
  reduced: false,
  lowPower: true,
  finePointer: false,
  ready: false,
};

/**
 * Whether a WebGL context can actually be created -- a far more honest signal
 * than counting cores, and it catches blocklisted drivers and disabled WebGL.
 * Cached, since creating a throwaway context is not free.
 */
let webglSupport: boolean | null = null;

function supportsWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement('canvas');
    webglSupport = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

/**
 * Single source of truth for how much motion this visitor should get.
 *
 * Starts pessimistic (lowPower, no cursor) so the server render and first paint
 * are the cheap variant; the richer path switches on after hydration. That keeps
 * the heavy layers off the critical path and avoids a hydration mismatch.
 */
export function useMotionProfile(): MotionProfile {
  const [profile, setProfile] = useState<MotionProfile>(INITIAL);

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const resolve = () => {
      // Safari clamps hardwareConcurrency, and plenty of capable laptops report
      // 4 -- so only treat genuinely low core counts as low power.
      const cores = navigator.hardwareConcurrency ?? 4;

      setProfile({
        reduced: reducedQuery.matches,
        lowPower: window.innerWidth < 900 || cores < 4 || !supportsWebGL(),
        finePointer: pointerQuery.matches,
        ready: true,
      });
    };

    resolve();

    reducedQuery.addEventListener('change', resolve);
    pointerQuery.addEventListener('change', resolve);
    window.addEventListener('resize', resolve);
    return () => {
      reducedQuery.removeEventListener('change', resolve);
      pointerQuery.removeEventListener('change', resolve);
      window.removeEventListener('resize', resolve);
    };
  }, []);

  return profile;
}
