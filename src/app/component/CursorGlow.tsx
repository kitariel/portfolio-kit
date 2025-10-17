'use client';

import * as React from 'react';

// A crisp, "laser"-like cursor with beam segments instead of smoky particles.
// Mobile-first: reduces segment count and widths on coarse pointers / touch.

type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  life: number; // 0..1, fades out
  width: number; // stroke width
};

export default function CursorGlow() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const dprRef = React.useRef<number>(1);

  const mouseRef = React.useRef<{ x: number; y: number; down: boolean; interactive: boolean }>(
    { x: 0, y: 0, down: false, interactive: false }
  );
  const segmentsRef = React.useRef<Segment[]>([]);
  const lastPosRef = React.useRef<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    const config = {
      maxSegments: isCoarsePointer ? 60 : 140,
      fadeSpeed: isCoarsePointer ? 0.08 : 0.06,
      baseWidth: isCoarsePointer ? 3 : 2,
      maxWidth: isCoarsePointer ? 8 : 10,
      coreRadius: isCoarsePointer ? 6 : 4,
      glowRadius: isCoarsePointer ? 60 : 90,
    };

    const resize = () => {
      dprRef.current = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dprRef.current);
      canvas.height = Math.floor(window.innerHeight * dprRef.current);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      const selector = 'a, button, input, textarea, select, [role="button"], .hover-lift, .MuiButton-root, .MuiChip-root, .MuiCard-root';
      return Boolean(el.closest(selector));
    };

    const onPointerDown = (e: PointerEvent) => {
      mouseRef.current.down = true;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
      mouseRef.current.down = false;
      lastPosRef.current = null;
    };

    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.interactive = isInteractive(e.target);

      // Create a beam segment from last position to current
      const last = lastPosRef.current ?? { x: e.clientX, y: e.clientY };
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const speed = Math.hypot(dx, dy); // pixels/frame

      const width = Math.min(config.maxWidth, config.baseWidth + speed * 0.05 + (mouseRef.current.interactive ? 2 : 0));
      segmentsRef.current.push({ x1: last.x, y1: last.y, x2: e.clientX, y2: e.clientY, life: 1, width });
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      // Trim segments for performance
      const over = segmentsRef.current.length - config.maxSegments;
      if (over > 0) segmentsRef.current.splice(0, over);

      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });

    const tick = () => {
      rafRef.current = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Laser-only mode: no core or halo — just beam streaks
      const { x, y, interactive } = mouseRef.current;
      ctx.globalCompositeOperation = 'lighter';

      // Draw beam segments (sharp streaks)
      for (let i = segmentsRef.current.length - 1; i >= 0; i--) {
        const s = segmentsRef.current[i];
        s.life -= config.fadeSpeed; // fade
        if (s.life <= 0) {
          segmentsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0.05, s.life);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Inner bright line (white)
        ctx.strokeStyle = 'rgba(255,255,255,0.85)';
        ctx.lineWidth = s.width * 0.6;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(255,255,255,0.6)';
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.stroke();

        // Outer color glow (purple→cyan gradient)
        const grad = ctx.createLinearGradient(s.x1, s.y1, s.x2, s.y2);
        grad.addColorStop(0.0, 'rgba(124,58,237,0.0)');
        grad.addColorStop(0.4, 'rgba(124,58,237,0.6)');
        grad.addColorStop(0.6, 'rgba(34,211,238,0.6)');
        grad.addColorStop(1.0, 'rgba(34,211,238,0.0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.shadowBlur = 18;
        ctx.shadowColor = 'rgba(124,58,237,0.8)';
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.stroke();

        ctx.restore();
      }

      // If motion is reduced, avoid continuous anim loop; otherwise keep drawing
      if (!prefersReducedMotion && segmentsRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    // Initial paint once
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1, // above grid background, below content
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
}