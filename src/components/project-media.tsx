'use client';

import {useEffect, useRef, useState} from 'react';
import type {Project} from '@/lib/content';

interface ProjectMediaProps {
  project: Project;
  /** True while the parent card is hovered or holds keyboard focus. */
  active?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * Real screenshot plus, when one exists, a muted product recording that plays
 * while the card is hovered or focused. Nothing here is a mockup: projects
 * without media get a typographic panel rather than an invented interface.
 */
export function ProjectMedia({
  project,
  active = false,
  priority = false,
  className = 'aspect-[16/10] sm:aspect-[16/9]',
}: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Only ever fetch a preview while the card is on screen.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !project.preview) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {threshold: 0.2}
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [project.preview]);

  // Pause as soon as the preview leaves the viewport or loses hover/focus.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active && inView) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active, inView]);

  if (!project.image) {
    return (
      <div
        ref={frameRef}
        className={`relative flex items-end overflow-hidden bg-graphite p-6 sm:p-8 ${className}`}
      >
        <div
          aria-hidden="true"
          className="pattern-hairline pointer-events-none absolute inset-0"
        />
        <p className="label relative text-canvas/70">
          {project.pending
            ? 'Case study in preparation'
            : 'Private engagement · no public build'}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={frameRef}
      className={`relative overflow-hidden bg-graphite ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- the static export
          ships images unoptimized, so next/image would only add markup here. */}
      <img
        src={project.image}
        alt={project.imageAlt ?? `${project.title} interface`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-editorial group-hover:scale-[1.015] group-focus-within:scale-[1.015]"
      />

      {project.preview && (
        <video
          ref={videoRef}
          src={inView ? project.preview : undefined}
          preload="none"
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500"
          style={{opacity: active && inView ? 1 : 0}}
        />
      )}
    </div>
  );
}
