import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { CinematicVideoBackground } from '../common/CinematicVideoBackground';
import { CinematicGlassCard } from '../common/CinematicGlassCard';
import { CinematicCtaButton } from '../common/CinematicCtaButton';
import type { Hero } from '../../types';

export const HeroSection: React.FC<{ hero: Hero }> = ({ hero }) => {
  return (
    <CinematicVideoBackground
      badgeLabel="PEXELS 37013442 • 4K AI MOTION FEED"
      posterSrc="/images/ai-neural-mesh.svg"
      className="py-16 md:py-24 border-b border-white/10"
      overlayClassName="bg-gradient-to-b from-slate-950/45 via-slate-900/35 to-slate-950/50 backdrop-blur-[1px]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-8 text-center"
        >
          {/* Emblem Motto Silver Glass Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2 rounded-2xl text-[11px] sm:text-xs font-mono font-bold tracking-wide uppercase bg-slate-900/75 text-slate-200 border border-slate-300/30 shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-slate-200 shrink-0 animate-pulse" />
            <span>Learn AI • Research New Ideas • Solve Real Problems • Build Applications</span>
          </div>

          {/* Main Headline with Silver Liquid Gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] max-w-4xl mx-auto drop-shadow-md">
            Architecting Frontier{' '}
            <span className="bg-gradient-to-r from-white via-slate-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)]">
              Artificial Intelligence
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200/95 leading-relaxed max-w-3xl mx-auto font-normal drop-shadow-sm">
            The premier academic AI research laboratory and collegiate development guild at Sri Shakthi Institute of Engineering & Technology. Bridging foundational neural research with high-impact production engineering.
          </p>

          {/* Primary & Secondary Cinematic CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <CinematicCtaButton
              to="/projects"
              variant="silver"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore Projects
            </CinematicCtaButton>

            <CinematicCtaButton
              href="#contact"
              variant="glass"
              size="lg"
              arrow={false}
              className="w-full sm:w-auto bg-slate-900/75 text-slate-100 hover:bg-slate-900 border-white/30 hover:border-white/50"
            >
              Contact AI Lab
            </CinematicCtaButton>
          </div>

          {/* Live Stats Strip with Silver Liquid Glass Tiles */}
          {hero.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 max-w-3xl mx-auto">
              {hero.stats.map((stat, idx) => (
                <CinematicGlassCard
                  key={idx}
                  glowColor="silver"
                  className="p-4 rounded-2xl text-center bg-slate-900/65 border-white/20 backdrop-blur-xl"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono bg-gradient-to-r from-white via-slate-200 to-zinc-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-1">
                    {stat.label}
                  </div>
                </CinematicGlassCard>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </CinematicVideoBackground>
  );
};
