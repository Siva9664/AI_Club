import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CinematicLandingScreenProps {
  onEnter: () => void;
  isOpen: boolean;
}

export const CinematicLandingScreen: React.FC<CinematicLandingScreenProps> = ({
  onEnter,
  isOpen,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState<number>(10);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playCount, setPlayCount] = useState<number>(0);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  const handleEnter = () => {
    if (!hasEntered) {
      setHasEntered(true);
      onEnter();
    }
  };

  // Auto-play video on mount (loop is false so it auto-triggers onEnded)
  useEffect(() => {
    if (isOpen) {
      setHasEntered(false);
      setIsPlaying(false);
      setProgress(0);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (videoRef.current?.duration && isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
                setVideoDuration(videoRef.current.duration);
              }
              setIsPlaying(true);
              setPlayCount((prev) => prev + 1);
            })
            .catch(() => {});
        }
      }
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [isOpen]);

  // Enter the site when video ends, or if user presses any key or clicks
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = () => {
      handleEnter();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasEntered, onEnter]);

  // Video playback listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    const handleLoadedMetadata = () => {
      if (video.duration && isFinite(video.duration) && video.duration > 0) {
        setVideoDuration(video.duration);
      }
    };

    const handlePlay = () => {
      if (video.duration && isFinite(video.duration) && video.duration > 0) {
        setVideoDuration(video.duration);
      }
      setIsPlaying(true);
      setPlayCount((prev) => prev + 1);
    };

    const handleEnded = () => {
      handleEnter();
    };

    const handleTimeUpdate = () => {
      if (video.duration && video.duration > 0) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    if (video.readyState >= 1 && video.duration && isFinite(video.duration) && video.duration > 0) {
      setVideoDuration(video.duration);
    }
    if (!video.paused) {
      setIsPlaying(true);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isOpen, hasEntered, onEnter]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cinematic-landing-portal"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.15,
            filter: 'blur(25px)',
            transition: {
              duration: 0.95,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          onClick={handleEnter}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100 select-none cursor-pointer"
          title="Click anywhere or wait for video to end to enter"
        >
          {/* 1. BACKGROUND VIDEO (PEXELS 36388363: GLOWING SILVER NEON CIRCUIT CHIP) */}
          <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden bg-slate-950">
            <video
              ref={videoRef}
              autoPlay
              loop={false}
              muted
              playsInline
              onCanPlay={(e) => {
                setIsLoaded(true);
                const d = e.currentTarget.duration;
                if (d && isFinite(d) && d > 0) setVideoDuration(d);
              }}
              onLoadedMetadata={(e) => {
                const d = e.currentTarget.duration;
                if (d && isFinite(d) && d > 0) setVideoDuration(d);
              }}
              onPlay={(e) => {
                const d = e.currentTarget.duration;
                if (d && isFinite(d) && d > 0) setVideoDuration(d);
                setIsPlaying(true);
              }}
              onEnded={handleEnter}
              className={cn(
                'absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-all duration-1000',
                // PURE SILVER THEME: Transforms circuit into incandescent liquid silver & chrome glowing pathways
                'grayscale contrast-[135%] brightness-[115%]',
                isLoaded ? 'opacity-90' : 'opacity-0'
              )}
            >
              <source src="/videos/landing-circuit.mp4" type="video/mp4" />
              <source src="https://videos.pexels.com/video-files/36388363/15431375_1920_1080_30fps.mp4" type="video/mp4" />
              <source src="https://www.pexels.com/download/video/36388363/" type="video/mp4" />
            </video>

            {/* Ambient Liquid Silver Central Light Flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-b from-white/20 via-slate-200/10 to-transparent blur-[140px] pointer-events-none rounded-full animate-pulse" />

            {/* Specular Chrome Shimmer Tint Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/40 to-slate-950/85 pointer-events-none" />

            {/* High-Tech Silver Radial Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
          </div>

          {/* 2. INITIAL STYLED ENTRY PULSE FLASH */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.8, 2.6],
              opacity: [0, 0.85, 0],
            }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-white via-slate-200 to-transparent blur-3xl pointer-events-none"
          />

          {/* 3. DYNAMIC FLOATING CONTAINER (ONE-TIME MOTION MATCHING LANDING VIDEO TIMING) */}
          <motion.div
            key={`portal-content-${playCount}`}
            style={{ perspective: 1200 }}
            initial={{ opacity: 0, y: 30 }}
            animate={isPlaying ? {
              opacity: 1,
              y: [20, 0, -8, 0],
              rotateX: [2, 0, -1.5, 0],
            } : { opacity: 0 }}
            transition={{
              duration: videoDuration,
              ease: 'easeOut',
            }}
            className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-7xl w-full mx-auto select-none"
          >
            {/* LIQUID SILVER AURA BEHIND TEXT (ONE-TIME SYNCED TO VIDEO) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isPlaying ? {
                scale: [0.8, 1.12, 1.15, 0.85],
                opacity: [0, 0.7, 0.7, 0],
              } : { opacity: 0 }}
              transition={{
                duration: videoDuration,
                times: [0, 0.2, 0.82, 1],
                ease: 'easeInOut',
              }}
              className="absolute -inset-16 rounded-full bg-radial from-white/30 via-slate-300/10 to-transparent blur-3xl -z-10 pointer-events-none"
            />

            {/* 1. MONUMENTAL PRIMARY DISPLAY: "WELCOME TO" (LARGER THAN AI CLUB) */}
            {/* ONE-TIME APPEAR WITH ELASTIC BOUNCE ANIMATION MATCHING VIDEO TIMING */}
            <div className="relative inline-block py-2 px-3 sm:px-6">
              {/* Central Specular Silver Bounce Flare (Replaces right slide) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isPlaying ? {
                  scale: [0, 1.45, 0.9, 1.15, 0],
                  opacity: [0, 0.85, 0.35, 0.7, 0],
                } : { scale: 0, opacity: 0 }}
                transition={{
                  duration: Math.min(2.8, videoDuration * 0.38),
                  delay: videoDuration * 0.08,
                  ease: 'easeOut',
                }}
                className="absolute inset-0 -inset-x-8 bg-radial from-white/45 via-slate-200/20 to-transparent blur-2xl pointer-events-none mix-blend-overlay -z-10"
              />

              <motion.h1
                // ONE-TIME BOUNCE ANIMATION: Drops down with elastic bounce out of blur, holds during video, dissolves before ending
                initial={{
                  opacity: 0,
                  scale: 0.35,
                  filter: 'blur(45px) drop-shadow(0 0 0px rgba(255,255,255,0))',
                  y: -95,
                }}
                animate={isPlaying ? {
                  opacity: [0, 1, 1, 1, 1, 1, 1, 0.4, 0],
                  filter: [
                    'blur(45px) drop-shadow(0 0 0 rgba(255,255,255,0))',
                    'blur(0px) drop-shadow(0 0 55px rgba(255,255,255,0.95)) drop-shadow(0 15px 35px rgba(0,0,0,0.95))',
                    'blur(0px) drop-shadow(0 0 40px rgba(255,255,255,0.85)) drop-shadow(0 12px 30px rgba(0,0,0,0.95))',
                    'blur(0px) drop-shadow(0 0 45px rgba(255,255,255,0.85)) drop-shadow(0 12px 30px rgba(0,0,0,0.95))',
                    'blur(0px) drop-shadow(0 0 45px rgba(255,255,255,0.85)) drop-shadow(0 12px 30px rgba(0,0,0,0.95))',
                    'blur(0px) drop-shadow(0 0 50px rgba(255,255,255,0.9)) drop-shadow(0 12px 30px rgba(0,0,0,0.95))',
                    'blur(0px) drop-shadow(0 0 45px rgba(255,255,255,0.85)) drop-shadow(0 12px 30px rgba(0,0,0,0.95))',
                    'blur(22px) drop-shadow(0 0 25px rgba(255,255,255,0.4))',
                    'blur(50px) drop-shadow(0 0 0 rgba(255,255,255,0))',
                  ],
                  // Elastic bounce on vertical drop and scale
                  y: [-95, 12, -26, 8, 0, -6, 0, 8, 18],
                  scale: [0.35, 1.2, 0.92, 1.05, 1.0, 1.01, 1.0, 1.04, 1.08],
                  letterSpacing: ['0.02em', '0.08em', '0.07em', '0.08em', '0.08em', '0.09em', '0.08em', '0.11em', '0.14em'],
                } : {
                  opacity: 0,
                  scale: 0.35,
                  filter: 'blur(45px)',
                  y: -95,
                }}
                transition={{
                  duration: videoDuration,
                  times: [0, 0.08, 0.14, 0.19, 0.24, 0.52, 0.80, 0.92, 1.0],
                  ease: 'easeInOut',
                }}
                onAnimationComplete={() => {
                  if (isPlaying) {
                    handleEnter();
                  }
                }}
                className="font-['Orbitron',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] 2xl:text-[12rem] font-black uppercase leading-[0.92] tracking-[0.08em] bg-gradient-to-b from-white via-slate-100 to-zinc-400 bg-clip-text text-transparent break-words select-none"
              >
                Welcome to
              </motion.h1>
            </div>

            {/* 2. SECONDARY DISPLAY: "AI CLUB" (SMALLER THAN "WELCOME TO") */}
            {/* ONE-TIME COMPLEMENTARY BOUNCE ANIMATION MATCHING VIDEO TIMING */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.45,
                filter: 'blur(35px)',
                y: 75,
              }}
              animate={isPlaying ? {
                opacity: [0, 1, 1, 1, 1, 1, 1, 0.4, 0],
                filter: [
                  'blur(35px) drop-shadow(0 0 0 rgba(255,255,255,0))',
                  'blur(0px) drop-shadow(0 0 30px rgba(255,255,255,0.8)) drop-shadow(0 8px 20px rgba(0,0,0,0.85))',
                  'blur(0px) drop-shadow(0 0 25px rgba(255,255,255,0.7)) drop-shadow(0 8px 20px rgba(0,0,0,0.85))',
                  'blur(0px) drop-shadow(0 0 25px rgba(255,255,255,0.7)) drop-shadow(0 8px 20px rgba(0,0,0,0.85))',
                  'blur(0px) drop-shadow(0 0 25px rgba(255,255,255,0.7)) drop-shadow(0 8px 20px rgba(0,0,0,0.85))',
                  'blur(0px) drop-shadow(0 0 28px rgba(255,255,255,0.75)) drop-shadow(0 8px 20px rgba(0,0,0,0.85))',
                  'blur(0px) drop-shadow(0 0 25px rgba(255,255,255,0.7)) drop-shadow(0 8px 20px rgba(0,0,0,0.85))',
                  'blur(18px) drop-shadow(0 0 15px rgba(255,255,255,0.3))',
                  'blur(40px) drop-shadow(0 0 0 rgba(255,255,255,0))',
                ],
                // Upward elastic bounce
                y: [75, -10, 18, -5, 0, 5, 0, -6, -15],
                scale: [0.45, 1.16, 0.93, 1.04, 1.0, 1.01, 1.0, 1.03, 1.06],
                letterSpacing: ['0.25em', '0.44em', '0.40em', '0.42em', '0.42em', '0.44em', '0.42em', '0.48em', '0.55em'],
              } : {
                opacity: 0,
                scale: 0.45,
                filter: 'blur(35px)',
                y: 75,
              }}
              transition={{
                duration: videoDuration,
                times: [0, 0.10, 0.16, 0.22, 0.28, 0.54, 0.80, 0.92, 1.0],
                ease: 'easeInOut',
              }}
              onAnimationComplete={() => {
                if (isPlaying) {
                  handleEnter();
                }
              }}
              className="relative inline-block mt-3 sm:mt-6 px-4"
            >
              <h2 className="font-['Orbitron',sans-serif] text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold uppercase tracking-[0.42em] bg-gradient-to-r from-slate-300 via-white to-slate-300 bg-clip-text text-transparent">
                AI CLUB
              </h2>
            </motion.div>

            {/* OPTICAL LIGHT PARTICLES (VERTICAL BOUNCE FLOAT - NO RIGHT SLIDE) */}
            <motion.div
              animate={isPlaying ? {
                y: [-24, 6, -14, 0, 10],
                opacity: [0, 0.9, 0.9, 0.7, 0],
                scale: [0.6, 1.3, 1.0, 1.1, 0.4],
              } : { opacity: 0 }}
              transition={{
                duration: videoDuration,
                times: [0, 0.15, 0.3, 0.8, 1],
                ease: 'easeInOut',
              }}
              className="absolute -top-6 right-1/4 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_#ffffff] pointer-events-none"
            />
            <motion.div
              animate={isPlaying ? {
                y: [20, -5, 12, 0, -8],
                opacity: [0, 0.85, 0.85, 0.65, 0],
                scale: [0.5, 1.2, 0.95, 1.0, 0.3],
              } : { opacity: 0 }}
              transition={{
                duration: videoDuration,
                times: [0, 0.18, 0.34, 0.82, 1],
                ease: 'easeInOut',
              }}
              className="absolute -bottom-4 left-1/4 w-2 h-2 rounded-full bg-slate-200 shadow-[0_0_12px_#ffffff] pointer-events-none"
            />
          </motion.div>

          {/* 4. SLENDER SILVER PROGRESS LINE (FILLS AS VIDEO PLAYS TO ENTER SITE) */}
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/10 pointer-events-none">
            <motion.div
              className="h-full bg-gradient-to-r from-slate-400 via-white to-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.9)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
