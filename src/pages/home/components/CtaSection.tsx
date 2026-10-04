import React from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { CinematicGlassCard } from '@/shared/ui/CinematicGlassCard';
import { CinematicCtaButton } from '@/shared/ui/CinematicCtaButton';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-b border-white/10">
      {/* Visual background gradient with ambient glow */}
      <div className="absolute inset-0 ai-grid-pattern opacity-25 pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-full blur-[130px] pointer-events-none -z-10 animate-liquid-1" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <CinematicGlassCard
          glowColor="blue"
          className="p-8 sm:p-12 md:p-16 text-center border-white/95 dark:border-white/15 shadow-2xl relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide uppercase bg-slate-900/60 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-6 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Join The Student AI Movement</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Ready to Build With <span className="ai-gradient-text">Artificial Intelligence</span>?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Whether you want to train state-of-the-art vision models, participate in national hackathons, or build transformative campus applications, SIET AI Club provides the compute, mentorship, and community.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CinematicCtaButton
              to="/projects"
              variant="neon"
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
              icon={<Mail className="w-4 h-4 text-blue-600 dark:text-cyan-400" />}
              className="w-full sm:w-auto"
            >
              Contact AI Club
            </CinematicCtaButton>
          </div>
        </CinematicGlassCard>
      </div>
    </section>
  );
};
