'use client';

import dynamic from 'next/dynamic';
import {useMotionProfile} from '@/hooks/use-motion-profile';

const POSTER = '/static/video/hero-crema.jpg';

/**
 * Loaded client-side only and never awaited by the server render, so the WebGL
 * bundle stays off the critical path -- the hero copy paints from HTML while
 * this arrives behind it.
 */
const ExtractionCanvas = dynamic(
  () => import('./extraction-canvas').then((m) => m.ExtractionCanvas),
  {ssr: false}
);

/**
 * Chooses how much background this visitor gets:
 *
 *   full     -- the scroll-driven WebGL plates
 *   static   -- poster image plus CSS glows (low-power, or reduced motion)
 *
 * The static path is not a stripped-down apology; it is the same composition
 * with the motion removed, so the page still looks deliberate.
 */
export function Background() {
  const {reduced, lowPower, ready} = useMotionProfile();
  const useCanvas = ready && !reduced && !lowPower;

  if (useCanvas) {
    return <ExtractionCanvas poster={POSTER} />;
  }

  return (
    <div aria-hidden className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center opacity-40'
        style={{backgroundImage: `url(${POSTER})`}}
      />
      <div className='app-grid absolute inset-0' />
      <div className='absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-ember/10 blur-[120px]' />
      <div className='absolute bottom-0 right-0 h-[30rem] w-[30rem] translate-x-1/3 translate-y-1/4 rounded-full bg-well/40 blur-[120px]' />
      <div className='absolute inset-0 bg-gradient-to-b from-roast/70 via-roast/40 to-roast' />
    </div>
  );
}
