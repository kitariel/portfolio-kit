'use client';

import {useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {ExtractionPlane} from './extraction-plane';

/**
 * The persistent WebGL layer -- one canvas behind the whole page, not one per
 * section. Everything it shows is decorative, so it stays out of the a11y tree.
 */
export function ExtractionCanvas({poster}: {poster: string}) {
  const [ready, setReady] = useState(false);

  return (
    <div aria-hidden className='fixed inset-0 -z-10'>
      {/* Poster underneath: covers the gap before the first video frame paints,
          and stays as the visible layer if WebGL or autoplay fails outright. */}
      <div
        className='absolute inset-0 bg-cover bg-center transition-opacity duration-1000'
        style={{backgroundImage: `url(${poster})`, opacity: ready ? 0 : 0.55}}
      />
      <Canvas
        className='!absolute inset-0'
        dpr={[1, 1.75]}
        gl={{antialias: false, alpha: false, powerPreference: 'high-performance'}}
        camera={{position: [0, 0, 1], fov: 50}}
      >
        <ExtractionPlane onReady={() => setReady(true)} />
      </Canvas>
      {/* Warm scrim -- just enough to hold text contrast. Keep this to a single
          flat layer: this element is fixed to the viewport, so a `to-roast`
          gradient would blacken the lower third of every screen rather than
          fading once at the end of the page. */}
      <div className='pointer-events-none absolute inset-0 bg-roast/50' />
    </div>
  );
}
