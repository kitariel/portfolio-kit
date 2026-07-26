'use client';

import {useEffect, useRef} from 'react';
import {AiIcon} from '@/components/portfolio/ai-icons';
import {VIDEO_SCRUB_SCREENS} from '@/lib/cinematic-config';
import {aiTools, type AiToolId} from '@/lib/portfolio-data';

/** Base box for a flying icon; the loop scales it to the size it needs. */
const ICON_BASE = 72;

/** Where a card's icon slot should sit, as a fraction of viewport height, when the flight ends. */
const LANDING_FRACTION = 0.4;

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Fraction of the flight after which the flying icons hand over to the cards. */
const HANDOFF_START = 0.94;

/**
 * Hold the real marks over their rendered twins while the final frame fades.
 * Beginning the flight sooner creates a visible double-image because the logos
 * baked into the footage are still on screen.
 */
const FLIGHT_START = 0.62;

/**
 * The cards only sit in a row from `lg` up. Below that they stack, so flying
 * each mark to its own slot would send two of the three off the bottom of the
 * screen — narrow viewports dissolve the marks in place instead, which is also
 * the shorter movement the small-screen brief calls for.
 */
const ROW_LAYOUT = '(min-width: 1024px)';

/** Progress at which the dissolve-in-place hand-off completes. */
const FADE_END = 0.45;

export interface TransitionProps {
  /** The hero section, used as the origin of the scroll runway. */
  heroRef: React.RefObject<HTMLElement | null>;
  /** True once the footage has reached the closing pose. */
  revealed: boolean;
  /** Drives the video layer's dissolve, 0 → 1. */
  onProgress: (progress: number) => void;
}

/**
 * Carries the three AI marks out of the footage and into the workflow cards.
 *
 * The icons live in a fixed layer that mirrors the video's `object-fit`
 * geometry, so at rest they sit exactly on the marks in the closing frame.
 * Scrolling interpolates each one towards its card's `[data-ai-slot]`, which is
 * measured live — so the landing is exact no matter the viewport.
 */
export function VideoToInterfaceTransition({heroRef, revealed, onProgress}: TransitionProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef(new Map<AiToolId, HTMLDivElement>());

  // Keep the latest callbacks without restarting the scroll loop.
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    const layer = layerRef.current;
    const stage = stageRef.current;
    if (!layer || !stage) return;

    let frameId = 0;
    let queued = false;
    let lastProgress = -1;
    const rowLayout = window.matchMedia(ROW_LAYOUT);

    const slots = new Map<AiToolId, HTMLElement>();
    const collectSlots = () => {
      for (const tool of aiTools) {
        const el = document.querySelector<HTMLElement>(`[data-ai-slot="${tool.id}"]`);
        if (el) slots.set(tool.id, el);
      }
    };
    collectSlots();

    const render = () => {
      queued = false;
      const hero = heroRef.current;
      if (!hero) return;

      // --- reads -------------------------------------------------------
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const stageRect = stage.getBoundingClientRect();
      const heroTop = hero.getBoundingClientRect().top + scrollY;
      const targets = aiTools.map((tool) => slots.get(tool.id)?.getBoundingClientRect() ?? null);

      // The interface handoff begins only after the scroll-scrubbed footage
      // reaches its final frame.
      const startY = heroTop + viewportHeight * VIDEO_SCRUB_SCREENS;
      const firstTarget = targets.find(Boolean);
      const endY = firstTarget
        ? firstTarget.top + scrollY - viewportHeight * LANDING_FRACTION
        : startY + viewportHeight;

      const scrollProgress = clamp01((scrollY - startY) / Math.max(endY - startY, 1));
      // A fast wheel gesture may move the scrollbar ahead of video decoding.
      // Hold the interface transition until the displayed frame catches up.
      const progress = revealed ? scrollProgress : 0;
      const flies = rowLayout.matches;

      // --- writes ------------------------------------------------------
      if (progress !== lastProgress) {
        lastProgress = progress;
        onProgressRef.current(progress);
        // Desktop marks wait for the footage to dissolve before setting off.
        // Narrow layouts dissolve in place and keep their shorter timeline.
        const flightProgress = clamp01((progress - FLIGHT_START) / (1 - FLIGHT_START));
        const handoff = flies ? flightProgress : clamp01(progress / FADE_END);
        document.documentElement.style.setProperty('--ai-handoff', handoff.toFixed(4));
      }

      const flightProgress = flies ? clamp01((progress - FLIGHT_START) / (1 - FLIGHT_START)) : progress;
      const eased = easeInOut(flightProgress);
      const flightOpacity = flies
        ? flightProgress < HANDOFF_START
          ? 1
          : 1 - (flightProgress - HANDOFF_START) / (1 - HANDOFF_START)
        : 1 - clamp01((progress - FADE_END * 0.55) / (FADE_END * 0.45));

      aiTools.forEach((tool, index) => {
        const el = iconRefs.current.get(tool.id);
        if (!el) return;

        const fromX = stageRect.left + tool.videoPosition.x * stageRect.width;
        const fromY = stageRect.top + tool.videoPosition.y * stageRect.height;
        const fromSize = tool.videoPosition.size * stageRect.height;

        const target = flies ? targets[index] : null;
        const toX = target ? target.left + target.width / 2 : fromX;
        const toY = target ? target.top + target.height / 2 : fromY;
        const toSize = target ? target.height : fromSize;

        const x = lerp(fromX, toX, eased);
        const y = lerp(fromY, toY, eased);
        const scale = lerp(fromSize, toSize, eased) / ICON_BASE;

        el.style.transform = `translate3d(${x - ICON_BASE / 2}px, ${y - ICON_BASE / 2}px, 0) scale(${scale})`;
        el.style.opacity = String(flightOpacity);
      });
    };

    const schedule = () => {
      if (queued) return;
      queued = true;
      frameId = requestAnimationFrame(render);
    };

    const onResize = () => {
      collectSlots();
      schedule();
    };

    render();
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', onResize);

    // Card slots only exist after their section mounts and fonts settle.
    const settle = window.setTimeout(onResize, 400);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(settle);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      document.documentElement.style.removeProperty('--ai-handoff');
    };
  }, [heroRef, revealed]);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-[100svh] w-full overflow-hidden"
    >
      {/* Invisible twin of the video box — gives the loop the footage's exact
          on-screen geometry without measuring the <video> itself. */}
      <div
        ref={stageRef}
        className="video-stage absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {aiTools.map((tool) => (
        <div
          key={tool.id}
          ref={(node) => {
            if (node) iconRefs.current.set(tool.id, node);
            else iconRefs.current.delete(tool.id);
          }}
          className="absolute left-0 top-0 transition-[filter,color] duration-500"
          style={{
            width: ICON_BASE,
            height: ICON_BASE,
            color: 'var(--foreground)',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        >
          <div
            className="h-full w-full transition-opacity duration-[900ms] ease-out"
            style={{opacity: revealed ? 1 : 0}}
          >
            <AiIcon tool={tool.id} className="h-full w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
