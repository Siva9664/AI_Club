import React from 'react';
import { cn } from '@/shared/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CinematicGlassCardProps extends HTMLMotionProps<'div'> {
  glowColor?: 'blue' | 'purple' | 'emerald' | 'amber' | 'cyan' | 'silver' | 'none';
  interactive?: boolean;
  borderSpecular?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const CinematicGlassCard: React.FC<CinematicGlassCardProps> = ({
  glowColor = 'silver',
  interactive = true,
  borderSpecular = true,
  className,
  children,
  ...props
}) => {
  const glowStyles = {
    silver: 'hover:shadow-[0_20px_50px_-15px_rgba(255,255,255,0.25)] hover:border-slate-300 dark:hover:border-slate-400',
    blue: 'hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.22)] hover:border-blue-400/40',
    purple: 'hover:shadow-[0_20px_50px_-15px_rgba(168,85,247,0.22)] hover:border-purple-400/40',
    emerald: 'hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.22)] hover:border-emerald-400/40',
    amber: 'hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.22)] hover:border-amber-400/40',
    cyan: 'hover:shadow-[0_20px_50px_-15px_rgba(6,182,212,0.22)] hover:border-cyan-400/40',
    none: '',
  };

  return (
    <motion.div
      whileHover={interactive ? { y: -4, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      className={cn(
        'relative rounded-3xl overflow-hidden transition-all duration-300',
        // Translucent liquid glass base
        'bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl',
        // Layered soft shadows & inner highlight
        'shadow-[0_12px_40px_-12px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]',
        // Subtle borders with top specular sheen
        borderSpecular
          ? 'border border-white/90 dark:border-white/10'
          : 'border border-slate-200/80 dark:border-slate-800',
        interactive && 'cursor-pointer',
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {/* Specular Top Sheen Highlight */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 dark:from-white/[0.04] to-transparent pointer-events-none rounded-t-3xl" />

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
