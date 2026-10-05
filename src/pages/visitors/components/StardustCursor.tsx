import React, { useCallback, useEffect, useRef, useState } from 'react';

function drawSparkleStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
}

interface StardustCursorProps {
  enabled?: boolean;
}

export const StardustCursor: React.FC<StardustCursorProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useCallback(
    () =>
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const hasTouch = useCallback(
    () =>
      typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    []
  );
  const [reducedTick, setReducedTick] = useState(0);
  const isReducedMotion = prefersReduced();
  const isTouch = hasTouch();
  void reducedTick;
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const sparklesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; color: string; life: number; decay: number;
    rot: number; vrot: number;
  }>>([]);

  // Track live changes to prefers-reduced-motion (re-render so the render-time check picks it up)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = () => setReducedTick((t) => t + 1);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // (module-level drawSparkleStar is stable, so the effect deps above are complete)

  useEffect(() => {
    if (!enabled || isReducedMotion || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cw = canvas.width = window.innerWidth;
    let ch = canvas.height = window.innerHeight;

    const handleResize = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Never emit stardust over form fields (inputs, textareas, selects, editable regions)
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;

      // Spawn glitter starbursts on mouse move
      if (Math.random() < 0.6) {
        spawnGlitter(e.clientX, e.clientY);
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    function spawnGlitter(x: number, y: number) {
      const colors = ['#38BDF8', '#818CF8', '#A78BFA', '#F472B6', '#34D399', '#FFFFFF'];
      sparklesRef.current.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6 - 0.3,
        size: Math.random() * 4 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.035 + 0.02,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.25,
      });
    }

    function renderCursor() {
      if (!ctx) return;
      ctx.clearRect(0, 0, cw, ch);

      // Smooth lerp for outer glowing ring
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * 0.22;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * 0.22;

      // Render sparkles on canvas
      for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
        const p = sparklesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.rot += p.vrot;

        if (p.life <= 0) {
          sparklesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;

        // Draw 4-point sparkle star
        const s = p.size * p.life;
        drawSparkleStar(ctx, 0, 0, s);
        ctx.restore();
      }

      requestAnimationFrame(renderCursor);
    }

    const animId = requestAnimationFrame(renderCursor);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [enabled, isReducedMotion, isTouch]);

  if (!enabled || isReducedMotion || isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
      style={{ touchAction: 'none' }}
    />
  );
};