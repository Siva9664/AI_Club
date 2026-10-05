import React from 'react';
import { motion } from 'framer-motion';

const QUICK_STATS: Array<[string, string]> = [
  ['25+', 'Major Laurels'],
  ['100%', 'Student Driven'],
  ['Tier-1', 'National Rank'],
];

/** Ported from achievement.html's hero (badge, title, CTA, quick stats, 3D trophy). */
export const AchievementsHero: React.FC = () => (
  <section className="relative overflow-hidden py-20 md:py-28" aria-labelledby="ach-hero-heading">
    <div
      className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(245,158,11,0.18),transparent_70%)]"
      aria-hidden="true"
    />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/25 mb-5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
            AI Club Hall of Fame
          </span>
          <h1
            id="ach-hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight"
          >
            Celebrating Innovation.
            <span className="block bg-gradient-to-r from-amber-500 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
              Recognizing Excellence.
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl">
            Explore the achievements, milestones, certifications, competitions, collaborations and
            accomplishments of our AI Club community.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#ach-milestones"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Explore Milestones
            </a>
            <a
              href="#ach-gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-600 font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Filter Gallery
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {QUICK_STATS.map(([num, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block text-2xl font-black text-slate-900 dark:text-white">{num}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* 3D holographic trophy + orbit rings (decorative) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
          aria-hidden="true"
        >
          <div className="relative mx-auto w-72 h-72 motion-reduce:animate-none">
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="absolute inset-6 rounded-full border border-dashed border-amber-400/40 motion-safe:animate-[spin_28s_linear_infinite]" />
            <div className="absolute inset-14 rounded-full border border-cyan-400/30 motion-safe:animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 220" className="w-40 h-44">
                <defs>
                  <linearGradient id="achTrophy" x1="20" y1="20" x2="180" y2="200" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fffbeb" />
                    <stop offset="42%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#c2410c" />
                  </linearGradient>
                </defs>
                <path d="M60 195 L140 195 L130 175 L70 175 Z" fill="url(#achTrophy)" />
                <rect x="75" y="170" width="50" height="8" rx="2" fill="#fbbf24" />
                <rect x="92" y="135" width="16" height="35" rx="3" fill="#f59e0b" />
                <path d="M50 40 L150 40 C150 40 145 125 100 135 C55 125 50 40 50 40 Z" fill="url(#achTrophy)" />
                <path d="M50 50 C25 50 20 85 45 100 C52 104 55 100 55 96 C35 84 38 62 52 60 Z" fill="url(#achTrophy)" />
                <path d="M150 50 C175 50 180 85 155 100 C148 104 145 100 145 96 C165 84 162 62 148 60 Z" fill="url(#achTrophy)" />
                <circle cx="100" cy="80" r="18" fill="#0b0f19" stroke="#fbbf24" strokeWidth="2" />
                <path d="M93 80 L100 73 L107 80 L100 87 Z" fill="#f59e0b" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);