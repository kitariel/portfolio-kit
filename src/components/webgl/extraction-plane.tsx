'use client';

import {useEffect, useMemo, useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {fragmentShader, vertexShader} from './extraction-shader';
import {scrollStore} from '@/lib/scroll-store';

const PLATES = ['hero-crema', 'pressure-firewater', 'bloom-ink'] as const;

/**
 * Scene weighting down the scroll. Each entry is [scrollPosition, weights].
 * Weights are per-plate: [crema, pressure, bloom].
 *
 *   top     -- The Shot: the crema disc, pure and warm
 *   skills  -- Grind: ink blooming, particles of the idea
 *   flow    -- Pressure: fire meeting water, the extraction proper
 *   proof   -- Steam: cooling, bloom takes back over
 *   bottom  -- Warmth: the crema returns for the close
 */
const KEYFRAMES: Array<[number, [number, number, number]]> = [
  [0.00, [1.0, 0.0, 0.0]],
  [0.22, [0.35, 0.0, 0.65]],
  [0.48, [0.05, 0.85, 0.10]],
  [0.72, [0.15, 0.15, 0.70]],
  [1.00, [0.85, 0.05, 0.10]],
];

function weightsAt(progress: number, out: THREE.Vector3) {
  const clamped = Math.min(1, Math.max(0, progress));

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const [startPos, startWeights] = KEYFRAMES[i];
    const [endPos, endWeights] = KEYFRAMES[i + 1];

    if (clamped >= startPos && clamped <= endPos) {
      const span = endPos - startPos;
      const t = span === 0 ? 0 : (clamped - startPos) / span;
      // Smoothstep so plates ease into each other rather than ramping linearly.
      const eased = t * t * (3 - 2 * t);
      out.set(
        startWeights[0] + (endWeights[0] - startWeights[0]) * eased,
        startWeights[1] + (endWeights[1] - startWeights[1]) * eased,
        startWeights[2] + (endWeights[2] - startWeights[2]) * eased
      );
      const sum = out.x + out.y + out.z || 1;
      out.divideScalar(sum);
      return out;
    }
  }

  const last = KEYFRAMES[KEYFRAMES.length - 1][1];
  return out.set(last[0], last[1], last[2]);
}

function createVideo(name: string) {
  const video = document.createElement('video');
  video.poster = `/static/video/${name}.jpg`;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  // Set the attributes too, not just the properties -- autoplay policies are
  // evaluated against the attributes on some browsers (notably iOS Safari).
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('loop', '');

  // Offer both encodings and let the browser negotiate. VP9 is generally the
  // smaller file; Safari only speaks H.264, and some Chromium builds ship
  // without the proprietary H.264 decoder and can *only* take the WebM.
  const webm = document.createElement('source');
  webm.src = `/static/video/${name}.webm`;
  webm.type = 'video/webm; codecs="vp9"';

  const mp4 = document.createElement('source');
  mp4.src = `/static/video/${name}.mp4`;
  mp4.type = 'video/mp4; codecs="avc1.42E01E"';

  video.append(webm, mp4);
  // Deliberately no load() here -- resource selection is kicked off only once
  // the element is in the document, otherwise it can settle on nothing.
  return video;
}

export function ExtractionPlane({onReady}: {onReady?: () => void}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const {size, viewport} = useThree();

  const videos = useMemo(() => PLATES.map(createVideo), []);

  const textures = useMemo(
    () =>
      videos.map((video) => {
        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
      }),
    [videos]
  );

  const uniforms = useMemo(
    () => ({
      uTexA: {value: textures[0]},
      uTexB: {value: textures[1]},
      uTexC: {value: textures[2]},
      uWeights: {value: new THREE.Vector3(1, 0, 0)},
      uTime: {value: 0},
      uResolution: {value: new THREE.Vector2(1, 1)},
      uTexResolution: {value: new THREE.Vector2(1600, 894)},
      // Anchor the crop left of centre so the crema disc keeps clear of the
      // headline instead of sliding under it on narrower viewports.
      uFocus: {value: new THREE.Vector2(0.1, 0.55)},
      // Pull back so the disc reads as an object sitting in the dark, rather
      // than a texture pressed flat against the glass.
      uZoom: {value: 0.72},
      uCursor: {value: new THREE.Vector2(0.5, 0.5)},
      uCursorHeat: {value: 0},
      uTurbulence: {value: 0},
      uOpacity: {value: 0},
    }),
    [textures]
  );

  // Held in a ref so a changing callback identity cannot retrigger the setup
  // effect below -- doing so would tear down and reload the videos mid-play.
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  // Kick off playback; report ready once the first plate can actually paint.
  useEffect(() => {
    let cancelled = false;

    // The elements must live in the document. Browsers do not reliably decode
    // frames for a fully detached <video>, which leaves VideoTexture uploading
    // nothing but black. Park them in a 1px host instead -- `display:none`
    // would suspend decoding just as badly, so hide with size and opacity.
    const host = document.createElement('div');
    host.setAttribute('aria-hidden', 'true');
    host.style.cssText =
      'position:fixed;top:0;left:0;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;z-index:-1';
    videos.forEach((video) => host.appendChild(video));
    document.body.appendChild(host);

    const first = videos[0];
    const markReady = () => {
      if (!cancelled) onReadyRef.current?.();
    };
    first.addEventListener('loadeddata', markReady, {once: true});

    videos.forEach((video) => {
      video.load();
      // Autoplay is only permitted because these are muted and inline.
      video.play().catch(() => {
        /* Blocked autoplay just leaves the poster frame showing. */
      });
    });

    return () => {
      cancelled = true;
      first.removeEventListener('loadeddata', markReady);
      videos.forEach((video) => {
        video.pause();
        // Drop the <source> children then reload, so the decoder actually
        // releases -- clearing .src alone does nothing when sources are used.
        video.replaceChildren();
        video.load();
      });
      textures.forEach((texture) => texture.dispose());
      host.remove();
    };
  }, [videos, textures]);

  const scratch = useMemo(() => new THREE.Vector3(), []);
  const cursorTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const heatTarget = useRef(0);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      cursorTarget.current.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
      heatTarget.current = 1;
    };
    const onLeave = () => {
      heatTarget.current = 0;
    };

    window.addEventListener('pointermove', onMove, {passive: true});
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const u = material.uniforms;
    u.uTime.value += delta;
    u.uResolution.value.set(size.width, size.height);

    const weights = weightsAt(scrollStore.progress, scratch);
    u.uWeights.value.lerp(weights, Math.min(1, delta * 4));

    // Only decode the plates actually on screen. Three simultaneous video
    // decoders is a real cost; at any scroll point at most two contribute.
    const w = u.uWeights.value;
    [w.x, w.y, w.z].forEach((weight, index) => {
      const video = videos[index];
      if (weight < 0.02) {
        if (!video.paused) video.pause();
      } else if (video.paused) {
        video.play().catch(() => {});
      }
    });

    u.uCursor.value.lerp(cursorTarget.current, Math.min(1, delta * 6));
    u.uCursorHeat.value += (heatTarget.current - u.uCursorHeat.value) * Math.min(1, delta * 4);

    const speed = Math.min(1, Math.abs(scrollStore.velocity) / 60);
    u.uTurbulence.value += (speed - u.uTurbulence.value) * Math.min(1, delta * 5);

    // Ease in rather than pop, so the canvas never competes with first paint.
    u.uOpacity.value = Math.min(1, u.uOpacity.value + delta * 0.8);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
