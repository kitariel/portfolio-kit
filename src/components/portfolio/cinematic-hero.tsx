'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {VideoToInterfaceTransition} from '@/components/portfolio/video-to-interface-transition';
import {useReducedMotion} from '@/hooks/use-reduced-motion';
import {
  HERO_SCROLL_SCREENS,
  MAX_VIDEO_SCRUB_RATE,
  VIDEO_SCRUB_SCREENS,
} from '@/lib/cinematic-config';
import {media, profile} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

/**
 * Keep the closing pose present while the workflow enters from below. The
 * workflow overlaps the hero runway, so this fade finishes at roughly the same
 * moment the sticky stage releases instead of leaving an empty viewport.
 */
const DISSOLVE_START = 0.08;
const DISSOLVE_END = 0.7;
const INTERFACE_DISSOLVE_START = 0.12;
const INTERFACE_DISSOLVE_END = 0.42;

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * The footage is a large download. On a metered or slow connection the closing
 * frame tells the same story for a fraction of the bytes.
 */
function prefersLightweightMedia() {
  const connection = (navigator as Navigator & {connection?: NetworkInformation}).connection;
  if (!connection) return false;
  if (connection.saveData) return true;
  return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
}

export function CinematicHero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const prefersReducedMotion = useReducedMotion();

  /** True once the closing pose is on screen and the DOM icons take over. */
  const [revealed, setRevealed] = useState(false);
  /** The footage can't play — fall back to the closing frame as a still. */
  const [staticFallback, setStaticFallback] = useState(false);
  /** Metered or slow connection: never fetch the footage in the first place. */
  const [lightweight, setLightweight] = useState(false);

  /** Only mount the <video> when we actually intend to download and play it. */
  const showVideo = !prefersReducedMotion && !lightweight;

  const reveal = useCallback(() => {
    setRevealed(true);
  }, []);

  /**
   * Scrolling is an intentional way to move on from the footage. Pause it and
   * crossfade to the known closing frame before the DOM marks appear, otherwise
   * the icons can be rendered over an earlier monkey/transformation frame.
   */
  const completeIntro = useCallback(() => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Math.min(media.video.iconHandoffTime, video.duration);
      video.pause();
    }
    setStaticFallback(true);
    reveal();
  }, [reveal]);

  /** Jump to the closing pose without waiting out the transformation. */
  const skipIntro = useCallback(() => {
    completeIntro();
    document.getElementById('workflow')?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [completeIntro, prefersReducedMotion]);

  /* No transformation for reduced motion or a constrained connection — the
     closing frame stands in and the page carries on as normal. */
  useEffect(() => {
    if (prefersReducedMotion || prefersLightweightMedia()) {
      setLightweight(true);
      setStaticFallback(true);
      setRevealed(true);
    }
  }, [prefersReducedMotion]);

  /**
   * The transformation is a scroll-controlled timeline. The video remains
   * paused and `currentTime` follows the visitor in either direction.
   */
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!video || !hero || !stage || !showVideo || staticFallback) return;

    let frameId = 0;
    let targetTime = 0;
    let renderedTime = video.currentTime;
    let lastFrameTime = 0;
    let handoffVisible = false;

    const setHandoffVisibility = (scrubDuration: number) => {
      const nextHandoffVisible = renderedTime >= scrubDuration * 0.985;
      if (nextHandoffVisible === handoffVisible) return;
      handoffVisible = nextHandoffVisible;
      setRevealed(nextHandoffVisible);
    };

    const tick = (timestamp: number) => {
      frameId = 0;
      const elapsed = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 1000, 0.05) : 1 / 60;
      lastFrameTime = timestamp;

      // Do not stack a new asynchronous seek on top of one still decoding.
      if (video.seeking) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const delta = targetTime - renderedTime;
      // Large gaps use fewer, broader seeks; the step tightens naturally as
      // the displayed frame approaches the scrollbar's target.
      const adaptiveStep = Math.min(Math.max(Math.abs(delta) * 0.18, 0.12), 0.55);
      const maxStep = Math.max(elapsed * MAX_VIDEO_SCRUB_RATE, adaptiveStep);
      renderedTime += Math.sign(delta) * Math.min(Math.abs(delta), maxStep);

      // H.264 seeks can settle a fraction away from the requested timestamp.
      // A modest tolerance avoids repeatedly seeking the same displayed frame.
      if (Math.abs(video.currentTime - renderedTime) > 0.12) {
        video.currentTime = renderedTime;
      }

      const scrubDuration = Math.min(media.video.iconHandoffTime, video.duration);
      setHandoffVisibility(scrubDuration);

      if (Math.abs(targetTime - renderedTime) > 0.025 || video.seeking) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const startScrubber = () => {
      if (frameId) return;
      lastFrameTime = 0;
      frameId = requestAnimationFrame(tick);
    };

    const updateTarget = () => {
      if (video.readyState < HTMLMediaElement.HAVE_METADATA || !Number.isFinite(video.duration)) return;

      const scrollY = window.scrollY;
      const heroTop = hero.getBoundingClientRect().top + scrollY;
      const viewportHeight = stage.getBoundingClientRect().height || window.innerHeight;
      const scrubDistance = Math.max(viewportHeight * VIDEO_SCRUB_SCREENS, 1);
      const progress = Math.min(Math.max((scrollY - heroTop) / scrubDistance, 0), 1);
      // The generated clip has a short tail after the authored open-arms pose.
      // Stop on the measured handoff frame rather than the physical file end.
      const scrubDuration = Math.min(media.video.iconHandoffTime, video.duration);
      targetTime = progress * scrubDuration;
      startScrubber();
    };

    const onError = () => {
      setStaticFallback(true);
      reveal();
    };

    video.pause();
    video.addEventListener('loadedmetadata', updateTarget);
    video.addEventListener('error', onError);
    window.addEventListener('scroll', updateTarget, {passive: true});
    window.addEventListener('resize', updateTarget);
    updateTarget();

    return () => {
      cancelAnimationFrame(frameId);
      video.removeEventListener('loadedmetadata', updateTarget);
      video.removeEventListener('error', onError);
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
    };
  }, [showVideo, staticFallback, reveal]);

  const handleProgress = useCallback((progress: number) => {
    stageRef.current?.style.setProperty('--dissolve', progress.toFixed(4));
  }, []);

  /** Media and overlay fade together as the page takes over. */
  const dissolveStyle = {
    opacity: `clamp(0, calc(1 - (var(--dissolve, 0) - ${DISSOLVE_START}) / ${
      DISSOLVE_END - DISSOLVE_START
    }), 1)`,
  } as React.CSSProperties;

  /** The identity clears before the workflow cards reach it. */
  const interfaceDissolveStyle = {
    opacity: `clamp(0, calc(1 - (var(--dissolve, 0) - ${INTERFACE_DISSOLVE_START}) / ${
      INTERFACE_DISSOLVE_END - INTERFACE_DISSOLVE_START
    }), 1)`,
  } as React.CSSProperties;

  return (
    <section
      ref={heroRef}
      id="intro"
      aria-label={`${profile.name} — introduction`}
      className="relative"
      // One runway scrubs the footage; the second hands its final frame to the
      // real workflow. Reduced motion keeps a single static screen.
      style={{
        height: prefersReducedMotion ? '100svh' : `calc(100svh + ${HERO_SCROLL_SCREENS * 100}vh)`,
      }}
    >
      <div
        ref={stageRef}
        className={cn(
          'sticky top-0 h-[100svh] w-full overflow-hidden bg-[var(--video-backdrop)]',
          !revealed && 'z-20'
        )}
      >
        {/* --- footage ------------------------------------------------- */}
        <div className="absolute inset-0" style={dissolveStyle}>
          {/* Closing frame sits underneath: it covers the moment the video
              ends, and stands in completely when playback is unavailable. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.video.finalFrame}
            alt=""
            aria-hidden
            width={1280}
            height={720}
            className={cn(
              'video-stage video-stage-media absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700',
              revealed ? 'opacity-100' : 'opacity-0'
            )}
          />

          {showVideo && (
            <video
              ref={videoRef}
              className={cn(
                // `max-w-none` is essential: preflight's `max-width: 100%` would
                // clamp the box narrower than the measuring stage and knock the
                // icon hand-off out of alignment.
                'video-stage video-stage-media absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700',
                staticFallback ? 'opacity-0' : 'opacity-100'
              )}
              poster={media.video.poster}
              preload="auto"
              muted
              playsInline
              disablePictureInPicture
              aria-hidden
              tabIndex={-1}
            >
              <source src={media.video.mp4} type="video/mp4" />
            </video>
          )}

          {/* Grades the footage's own backdrop into the page background so the
              hand-off to real markup has no visible seam. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 78% 62% at 50% 46%, transparent 38%, rgba(6, 17, 31, 0.55) 78%, var(--background) 100%)',
            }}
          />
        </div>

        {/* --- identity, only after the transformation ------------------ */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-14 sm:px-8 lg:pb-20"
          style={interfaceDissolveStyle}
        >
          <div
            className={cn(
              'mx-auto max-w-6xl text-center transition-all duration-1000 ease-out lg:text-left',
              revealed ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            )}
          >
            <h1 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-2 font-jetbrains text-xs uppercase tracking-[0.22em] text-accent sm:text-sm">
              {profile.title}
            </p>
          </div>
        </div>

        {/* --- scroll cue ---------------------------------------------- */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-5 z-20 flex justify-center"
          style={interfaceDissolveStyle}
        >
          <ChevronDown
            className={cn(
              'h-5 w-5 animate-scroll-cue text-foreground-muted transition-opacity duration-1000',
              revealed ? 'opacity-100' : 'opacity-70'
            )}
          />
        </div>
      </div>

      {/* The marks leave the footage and become the workflow cards. Skipped
          entirely for reduced motion — the cards render their own icons. */}
      {!prefersReducedMotion && (
        <VideoToInterfaceTransition
          heroRef={heroRef}
          revealed={revealed}
          onProgress={handleProgress}
        />
      )}
    </section>
  );
}
