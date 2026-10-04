import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';

export interface VideoSource {
  src: string;
  type: string;
}

interface CinematicVideoBackgroundProps {
  videoSrc?: string;
  videoSources?: VideoSource[];
  posterSrc?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
  className?: string;
  badgeLabel?: string;
}

export const CinematicVideoBackground: React.FC<CinematicVideoBackgroundProps> = ({
  videoSrc,
  videoSources,
  posterSrc = '/images/ai-neural-mesh.svg',
  overlayClassName,
  children,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // User Requested Background Video: Pexels 37013442 (Local zero-buffer + CDN stream)
  const defaultSources: VideoSource[] = [
    {
      src: '/videos/hero-background.mp4',
      type: 'video/mp4',
    },
    {
      src: 'https://videos.pexels.com/video-files/37013442/15681498_3840_2160_30fps.mp4',
      type: 'video/mp4',
    },
    {
      src: 'https://www.pexels.com/download/video/37013442/',
      type: 'video/mp4',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/92/Infinitely_wide_neural_network.webm/Infinitely_wide_neural_network.webm.1080p.vp9.webm',
      type: 'video/webm',
    },
  ];

  const activeSources = videoSources || (videoSrc ? [{ src: videoSrc, type: 'video/mp4' }] : defaultSources);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Canvas Neural Particle Mesh Fallback & Hybrid Depth Layer
  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for high-tech neural network
    const particleCount = Math.min(Math.floor(width / 35), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.5,
      hue: Math.random() > 0.5 ? 210 : 265, // Blue / Violet
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting synaptic lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 210 ? 'rgba(56, 189, 248, 0.7)' : 'rgba(168, 85, 247, 0.7)';
        ctx.shadowColor = p.hue === 210 ? '#38bdf8' : '#a855f7';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      {/* BACKGROUND VIDEO & MULTI-TIER FALLBACK CONTAINER */}
      <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden bg-slate-950">
        {/* 1. Static Animated Vector Poster Fallback (always rendered underneath) */}
        <img
          src={posterSrc}
          alt="Cinematic Machine Learning Background Visual"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-opacity duration-1000 opacity-60"
          loading="eager"
        />

        {/* 2. Neural Canvas Stream (Fallback & Continuous Hybrid Depth Layer) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen"
        />

        {/* 3. High-Definition Looping Video (Pexels 37013442 4K - Fully Visible as Requested) */}
        {!prefersReducedMotion && !hasError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={posterSrc}
            onCanPlay={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={cn(
              'absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-700',
              isLoaded ? 'opacity-90 dark:opacity-85' : 'opacity-0'
            )}
          >
            {activeSources.map((source, idx) => (
              <source key={idx} src={source.src} type={source.type} />
            ))}
          </video>
        )}
      </div>

      {/* SILVER-TINTED TRANSLUCENT OVERLAY (PRESERVES AAA READABILITY WHILE KEEPING VIDEO FULLY VISIBLE) */}
      <div
        className={cn(
          'absolute inset-0 -z-10 pointer-events-none',
          'bg-gradient-to-b from-slate-950/45 via-slate-900/35 to-slate-950/50 backdrop-blur-[1px]',
          overlayClassName
        )}
      />

      {/* AMBIENT SILVER / PLATINUM COLOR GLOWS */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-gradient-to-br from-slate-200/15 via-zinc-400/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[550px] h-[350px] bg-gradient-to-tl from-slate-300/15 via-zinc-500/10 to-transparent blur-[120px] rounded-full" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
