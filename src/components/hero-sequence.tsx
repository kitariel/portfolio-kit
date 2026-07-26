'use client';

import {useCallback, useRef} from 'react';
import {ScrollScrubVideo} from '@/components/scroll-scrub-video';
import {media, processSteps, profile} from '@/lib/content';

/**
 * Copy stages mapped onto scroll progress. Each stage fades and lifts slightly
 * as it hands over to the next — no per-word animation.
 */
const STAGES = [
  {enter: [0, 0], exit: [0.16, 0.22]},
  {enter: [0.18, 0.26], exit: [0.46, 0.52]},
  {enter: [0.48, 0.56], exit: [0.76, 0.82]},
  {enter: [0.78, 0.86], exit: [1.01, 1.02]},
] as const;

const LIFT_PX = 16;

const ramp = (value: number, from: number, to: number) => {
  if (to <= from) return value >= to ? 1 : 0;
  return Math.min(Math.max((value - from) / (to - from), 0), 1);
};

export function HeroSequence() {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const activeStageRef = useRef(-1);

  const handleProgress = useCallback((progress: number) => {
    let active = 0;

    STAGES.forEach((stage, index) => {
      const panel = panelRefs.current[index];
      if (!panel) return;

      const shown =
        ramp(progress, stage.enter[0], stage.enter[1]) *
        (1 - ramp(progress, stage.exit[0], stage.exit[1]));

      if (shown > 0.5) active = index;

      // Entering stages rise into place; departing stages continue upward.
      const midpoint = (stage.enter[1] + stage.exit[0]) / 2;
      const direction = progress < midpoint ? 1 : -1;

      panel.style.opacity = String(shown);
      panel.style.transform = `translate3d(0, ${(1 - shown) * LIFT_PX * direction}px, 0)`;
      panel.style.pointerEvents = shown > 0.5 ? 'auto' : 'none';
    });

    if (ruleRef.current) {
      ruleRef.current.style.transform = `scaleX(${progress})`;
    }

    if (counterRef.current && activeStageRef.current !== active) {
      activeStageRef.current = active;
      counterRef.current.textContent = `0${active + 1}`;
    }
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative border-b border-hairline bg-canvas"
    >
      <ScrollScrubVideo
        src={media.systemVideo}
        poster={media.systemPoster}
        stills={[
          {at: 0, src: media.systemPoster},
          {at: 0.5, src: media.systemMid},
          {at: 1, src: media.systemExpanded},
        ]}
        trackClassName="h-[220svh] sm:h-[240svh]"
        mediaClassName="absolute inset-x-0 top-[6svh] h-[38svh] sm:top-[8svh] sm:h-[42svh] lg:inset-y-0 lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-[54%]"
        onProgress={handleProgress}
        description="A modular mechanical structure unfolds from a closed block into a fully expanded frame of rails, drive screws and linked modules as the page scrolls."
      >
        <div
          data-scrub-overlay
          className="pointer-events-none absolute inset-0 flex flex-col justify-end pb-20 sm:pb-24 lg:justify-center lg:pb-0"
        >
          <div className="shell w-full">
            {/* Stage 01 stays in flow and sets the height the others center in. */}
            <div className="relative lg:w-[47%] lg:max-w-[34rem]">
              <div data-scrub-stage-copy className="pointer-events-auto relative">
                <div
                  ref={(node) => {
                    panelRefs.current[0] = node;
                  }}
                  data-scrub-stage-anim
                  className="will-change-[opacity,transform]"
                >
                  <p className="label text-graphite">
                    {profile.role} · {profile.location}
                  </p>
                  <h1
                    id="hero-heading"
                    className="display-hero mt-4 uppercase text-ink sm:mt-5"
                  >
                    {profile.name}
                  </h1>
                  <p className="prose-quiet mt-5 sm:mt-6">{profile.lede}</p>
                  <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
                    <a className="btn btn-primary" href="#work">
                      View selected work
                    </a>
                    <a
                      className="btn btn-secondary"
                      href={profile.cv}
                      download={profile.cvFileName}
                    >
                      Download CV
                    </a>
                  </div>
                </div>
              </div>

              <div
                data-scrub-stage-copy
                className="absolute inset-x-0 top-1/2 -translate-y-1/2"
              >
                <div
                  ref={(node) => {
                    panelRefs.current[1] = node;
                  }}
                  data-scrub-stage-anim
                  className="pointer-events-none opacity-0 will-change-[opacity,transform]"
                >
                  <p className="label text-signal">Approach</p>
                  <h2 className="display-lg mt-4 text-ink">
                    Engineering complete systems, not isolated screens.
                  </h2>
                  <p className="prose-quiet mt-5">
                    From product intent and architecture to implementation,
                    verification, and delivery.
                  </p>
                </div>
              </div>

              <div
                data-scrub-stage-copy
                className="absolute inset-x-0 top-1/2 -translate-y-1/2"
              >
                <div
                  ref={(node) => {
                    panelRefs.current[2] = node;
                  }}
                  data-scrub-stage-anim
                  className="pointer-events-none opacity-0 will-change-[opacity,transform]"
                >
                  <p className="label text-signal">Workflow</p>
                  <ol className="mt-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5 sm:gap-x-3">
                    {processSteps.map(({step}, index) => (
                      <li
                        key={step}
                        className="flex items-baseline gap-x-2.5 sm:gap-x-3"
                      >
                        {index > 0 && (
                          <span aria-hidden="true" className="font-mono text-quiet">
                            →
                          </span>
                        )}
                        <span className="display-sm text-ink">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="prose-quiet mt-5">
                    AI accelerates repetitive work. I keep the architecture,
                    judgement, review, and final call.
                  </p>
                </div>
              </div>

              <div
                data-scrub-stage-copy
                className="absolute inset-x-0 top-1/2 -translate-y-1/2"
              >
                <div
                  ref={(node) => {
                    panelRefs.current[3] = node;
                  }}
                  data-scrub-stage-anim
                  className="pointer-events-none opacity-0 will-change-[opacity,transform]"
                >
                  <p className="label text-graphite">Continue</p>
                  <a
                    href="#work"
                    data-rule="hidden"
                    className="link-rule display-lg mt-4 text-ink"
                  >
                    Selected work
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll progress rule, pinned to the bottom of the stage. */}
          <div
            data-scrub-progress
            aria-hidden="true"
            className="absolute inset-x-0 bottom-6 lg:bottom-8"
          >
            <div className="shell flex items-center gap-4">
              <span className="label text-quiet">
                <span ref={counterRef}>01</span> / 04
              </span>
              <span className="h-px flex-1 overflow-hidden bg-ink/20">
                <span
                  ref={ruleRef}
                  className="block h-full origin-left scale-x-0 bg-signal"
                />
              </span>
              <span className="label text-quiet">Scroll</span>
            </div>
          </div>
        </div>
      </ScrollScrubVideo>
    </section>
  );
}
