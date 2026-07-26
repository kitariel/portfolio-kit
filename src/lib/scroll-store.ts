/**
 * One shared scroll value for the whole page.
 *
 * The WebGL layer reads this every frame. Going through a plain module object
 * keeps that read free -- polling a CSS custom property with getComputedStyle
 * each frame would force style recalculation 60 times a second.
 */
export const scrollStore = {
  /** 0 at the top of the document, 1 at the bottom. */
  progress: 0,
  /** Signed scroll velocity in px/frame, smoothed. Drives skew and shader turbulence. */
  velocity: 0,
};

export function setScroll(progress: number, velocity: number) {
  scrollStore.progress = progress;
  scrollStore.velocity = velocity;
}

/**
 * Native-scroll fallback for when Lenis is off (reduced motion). Returns a
 * cleanup function.
 */
export function trackNativeScroll() {
  let previous = window.scrollY;

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const current = window.scrollY;
    setScroll(max > 0 ? current / max : 0, current - previous);
    previous = current;
  };

  onScroll();
  window.addEventListener('scroll', onScroll, {passive: true});
  return () => window.removeEventListener('scroll', onScroll);
}
