'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {useScrollProgress} from '@/hooks/use-scroll-progress';

export interface ScrubStill {
  /** Progress position (0–1) this still represents. */
  at: number;
  src: string;
}

export interface ScrollScrubVideoProps {
  src: string;
  /** First frame, also used as the video element's poster. */
  poster: string;
  /**
   * Ordered stills (at least two) used whenever scrubbing is unavailable:
   * reduced motion, a slow connection, a device that seeks too slowly, or a
   * decode error. The first is rendered eagerly as the LCP visual.
   */
  stills: ScrubStill[];
  /** Total track height. The stage inside stays pinned at 100svh. */
  trackClassName?: string;
  /** Box the media is drawn into. Defaults to the whole pinned stage. */
  mediaClassName?: string;
  /** Rendered inside the pinned stage, above the media. */
  children?: React.ReactNode;
  /** Called with 0–1 progress on every measured frame. */
  onProgress?: (progress: number) => void;
  /** Plain-language description of the animation for assistive tech. */
  description: string;
  className?: string;
}

type Mode = 'pending' | 'scrub' | 'stills';

/** Below this, a nudge is smaller than a frame — treat the seek as settled. */
const SETTLE_EPSILON = 1 / 120;
/** Fraction of the remaining distance covered per frame. */
const SMOOTHING = 0.18;
/** Keeps the final assignment off the exact duration boundary. */
const END_GUARD = 1 / 30;
/** Median seek latency above which scrubbing is downgraded to stills. */
const SLOW_SEEK_MS = 180;

/** Honours Data Saver and 2g connections before requesting megabytes of video. */
const prefersLightMedia = () => {
  if (typeof navigator === 'undefined') return false;

  const connection = (
    navigator as Navigator & {
      connection?: {saveData?: boolean; effectiveType?: string};
    }
  ).connection;

  if (!connection) return false;
  if (connection.saveData) return true;

  return /(^|-)(slow-)?2g$/.test(connection.effectiveType ?? '');
};

export function ScrollScrubVideo({
  src,
  poster,
  stills,
  trackClassName = 'h-[240svh]',
  mediaClassName = 'absolute inset-0',
  children,
  onProgress,
  description,
  className,
}: ScrollScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stillRefs = useRef<(HTMLImageElement | null)[]>([]);
  const progressRef = useRef(0);
  const targetTimeRef = useRef(0);
  const renderedTimeRef = useRef(0);
  const seekFrameRef = useRef(0);
  const durationRef = useRef(0);

  const [mode, setMode] = useState<Mode>('pending');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>();
  const [scrubbing, setScrubbing] = useState(false);

  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  /** Cross-fades the stills so the sequence still reads without video. */
  const paintStills = useCallback(
    (progress: number) => {
      const images = stillRefs.current;
      if (images.length < 2) return;

      // Find the pair of stills bracketing the current progress.
      let index = 0;
      for (let i = 0; i < stills.length - 1; i += 1) {
        if (progress >= stills[i].at) index = i;
      }

      const from = stills[index];
      const to = stills[index + 1] ?? from;
      const span = Math.max(to.at - from.at, 0.0001);
      const local = Math.min(Math.max((progress - from.at) / span, 0), 1);

      images.forEach((image, i) => {
        if (!image) return;
        const opacity = i === index ? 1 - local : i === index + 1 ? local : 0;
        image.style.opacity = String(opacity);
      });
    },
    [stills]
  );

  /**
   * Eases the video toward the scroll target instead of assigning currentTime
   * on every event. Skipping the assignment while a seek is still in flight is
   * what stops fast flicks and direction changes from queueing stale seeks —
   * the next frame simply aims at a fresher target.
   */
  const runSeekLoop = useCallback(() => {
    if (seekFrameRef.current) return;

    const step = () => {
      seekFrameRef.current = 0;

      const video = videoRef.current;
      const duration = durationRef.current;
      if (!video || !duration) return;

      const target = targetTimeRef.current;
      const distance = target - renderedTimeRef.current;

      renderedTimeRef.current =
        Math.abs(distance) < SETTLE_EPSILON
          ? target
          : renderedTimeRef.current + distance * SMOOTHING;

      if (!video.seeking) {
        const next = Math.min(renderedTimeRef.current, duration - END_GUARD);
        if (Math.abs(video.currentTime - next) > SETTLE_EPSILON) {
          video.currentTime = next;
        }
      }

      if (Math.abs(target - renderedTimeRef.current) > SETTLE_EPSILON) {
        seekFrameRef.current = window.requestAnimationFrame(step);
      }
    };

    seekFrameRef.current = window.requestAnimationFrame(step);
  }, []);

  const handleProgress = useCallback(
    (progress: number) => {
      progressRef.current = progress;
      onProgressRef.current?.(progress);

      if (durationRef.current > 0) {
        targetTimeRef.current = progress * durationRef.current;
        runSeekLoop();
      } else {
        // Still loading, or permanently on stills — keep the frames in sync.
        paintStills(progress);
      }
    },
    [paintStills, runSeekLoop]
  );

  const trackRef = useScrollProgress<HTMLDivElement>(handleProgress, {
    // Reduced motion un-pins the stage, so there is no travel left to measure.
    disabled: mode === 'pending' || reducedMotion,
  });

  const fallBackToStills = useCallback(() => {
    durationRef.current = 0;
    setMode('stills');
    setScrubbing(false);
    paintStills(progressRef.current);
  }, [paintStills]);

  // Decide between scrubbing and stills, and re-decide if the user flips the
  // reduced-motion setting while the page is open.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const decide = () => {
      setReducedMotion(reduced.matches);

      if (reduced.matches) {
        durationRef.current = 0;
        setVideoSrc(undefined);
        setScrubbing(false);
        setMode('stills');
        // Nothing scrolls the stage now, so rest on the finished structure.
        paintStills(1);
        return;
      }

      if (prefersLightMedia()) {
        durationRef.current = 0;
        setVideoSrc(undefined);
        setScrubbing(false);
        setMode('stills');
        paintStills(progressRef.current);
        return;
      }

      setMode('scrub');
    };

    decide();
    reduced.addEventListener('change', decide);

    return () => reduced.removeEventListener('change', decide);
  }, [paintStills]);

  // Fetch the video only once the section is near the viewport, so it never
  // competes with the poster for the first paint.
  useEffect(() => {
    const track = trackRef.current;
    if (mode !== 'scrub' || !track || videoSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVideoSrc(src);
        observer.disconnect();
      },
      {rootMargin: '400px 0px'}
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, [mode, src, trackRef, videoSrc]);

  // Read duration, prime the decoder, then verify the device can seek fast
  // enough before committing to scrubbing.
  useEffect(() => {
    const video = videoRef.current;
    if (!videoSrc || !video) return;

    let cancelled = false;

    const seekAndWait = (time: number) =>
      new Promise<number | null>((resolve) => {
        const started = performance.now();
        let timeout = 0;

        const done = () => {
          window.clearTimeout(timeout);
          video.removeEventListener('seeked', done);
          resolve(performance.now() - started);
        };

        video.addEventListener('seeked', done, {once: true});
        timeout = window.setTimeout(() => {
          video.removeEventListener('seeked', done);
          resolve(null);
        }, 900);

        video.currentTime = time;
      });

    const calibrate = async () => {
      const samples: number[] = [];

      for (const fraction of [0.35, 0.7, 0.15]) {
        if (cancelled) return;

        const elapsed = await seekAndWait(fraction * video.duration);
        if (elapsed === null) {
          if (!cancelled) fallBackToStills();
          return;
        }
        samples.push(elapsed);
      }

      if (cancelled) return;

      samples.sort((a, b) => a - b);
      if (samples[Math.floor(samples.length / 2)] > SLOW_SEEK_MS) {
        fallBackToStills();
        return;
      }

      durationRef.current = video.duration;
      renderedTimeRef.current = video.currentTime;
      targetTimeRef.current = progressRef.current * video.duration;
      setScrubbing(true);
      runSeekLoop();
    };

    const handleMetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        fallBackToStills();
        return;
      }

      // Muted playback needs no gesture, and a play/pause pair wakes decoders
      // (notably iOS Safari) that would otherwise ignore programmatic seeks.
      video
        .play()
        .then(() => video.pause())
        .catch(() => undefined)
        .finally(() => {
          if (!cancelled) void calibrate();
        });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      handleMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleMetadata);
    }

    video.addEventListener('error', fallBackToStills);

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', handleMetadata);
      video.removeEventListener('error', fallBackToStills);
      if (seekFrameRef.current) {
        window.cancelAnimationFrame(seekFrameRef.current);
        seekFrameRef.current = 0;
      }
    };
  }, [fallBackToStills, runSeekLoop, videoSrc]);

  return (
    <div
      ref={trackRef}
      data-scrub-track
      className={`relative ${trackClassName} ${className ?? ''}`}
    >
      <div
        data-scrub-stage
        className="sticky top-0 h-[100svh] overflow-hidden bg-canvas"
      >
        <div data-scrub-media className={mediaClassName}>
          {stills.map((still, index) => (
            /* eslint-disable-next-line @next/next/no-img-element -- art-directed
               frames at a fixed size; the static export ships images
               unoptimized, so next/image would only add markup. */
            <img
              key={still.src}
              ref={(node) => {
                stillRefs.current[index] = node;
              }}
              src={still.src}
              alt=""
              aria-hidden="true"
              draggable={false}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'low'}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full object-contain"
              style={{opacity: index === 0 ? 1 : 0}}
            />
          ))}

          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            preload={videoSrc ? 'auto' : 'none'}
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
            style={{opacity: scrubbing ? 1 : 0}}
          />
        </div>

        <p className="sr-only">{description}</p>

        {children}
      </div>
    </div>
  );
}
