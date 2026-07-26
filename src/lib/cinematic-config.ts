/**
 * Scroll distances are expressed in viewport heights so the cinematic timing
 * feels consistent across desktop and mobile.
 */
export const VIDEO_SCRUB_SCREENS = 1.25;
export const INTERFACE_TRANSITION_SCREENS = 0.7;
export const HERO_SCROLL_SCREENS = VIDEO_SCRUB_SCREENS + INTERFACE_TRANSITION_SCREENS;

/**
 * Maximum number of video seconds the scrubber may advance per real second.
 * This keeps large wheel/trackpad jumps visible instead of issuing one costly
 * seek straight to the destination frame.
 */
export const MAX_VIDEO_SCRUB_RATE = 12;
