import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { AchievementStats } from '@/types';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';

interface CountUpProps {
  target: number;
  suffix?: string;
  durationMs?: number;
}

/** Scroll-triggered counter, mirroring achievement.html's IntersectionObserver countUp. */
export const CountUp: React.FC<CountUpProps> = ({ target, suffix = '', durationMs = 1600 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView) return;
    // Under reduced motion we jump straight to the final value; the state
    // update is driven by the rAF loop below in the animated case.
    if (reduced) {
      const t = setTimeout(() => setValue(target), 0);
      return () => clearTimeout(t);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutCubic, same easing as the source page
      setValue(Math.floor(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, durationMs, reduced]);

  return (
    <span ref={ref}>
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};

const STAT_CARDS: Array<{
  key: keyof AchievementStats;
  label: string;
  desc: string;
  icon: React.ReactNode;
  suffix: string;
}> = [
  {
    key: 'totalAchievements',
    label: 'Achievements',
    desc: 'Hall of Fame Records',
    suffix: '+',
    icon: (
      <>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </>
    ),
  },
  {
    key: 'totalCompetitions',
    label: 'Competitions',
    desc: 'Victories & Podiums',
    suffix: '+',
    icon: (
      <>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
        <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </>
    ),
  },
  {
    key: 'totalCertificates',
    label: 'Certificates',
    desc: 'Cloud & ML Specialist',
    suffix: '+',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="7" y1="8" x2="17" y2="8" />
        <line x1="7" y1="12" x2="13" y2="12" />
        <circle cx="16" cy="14" r="2" />
      </>
    ),
  },
  {
    key: 'totalCollaborations',
    label: 'Collaborations',
    desc: 'Labs & Industry Tie-ups',
    suffix: '+',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    key: 'trainedMembers',
    label: 'Members Trained',
    desc: 'Across Workshops & Courses',
    suffix: '+',
    icon: (
      <>
        <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
        <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
      </>
    ),
  },
];

export const StatsSection: React.FC<{ stats: AchievementStats }> = ({ stats }) => (
  <section id="ach-stats" className="py-16 md:py-20" aria-labelledby="ach-stats-heading">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="ach-stats-heading" className="sr-only">
        Achievement statistics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {STAT_CARDS.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center p-5 md:p-6 rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-3 w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/25 to-cyan-400/20 border border-amber-400/25 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-amber-500 dark:text-amber-300"
                aria-hidden="true"
              >
                {card.icon}
              </svg>
            </div>
            <span className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-500 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
              <CountUp target={stats[card.key]} suffix={card.suffix} />
            </span>
            <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-100">{card.label}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);