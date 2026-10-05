import React from 'react';
import { motion } from 'framer-motion';
import type { Achievement } from '@/types';
import { cn } from '@/shared/lib/utils';
import { CATEGORY_BADGE, CATEGORY_LABEL, formatAchievementDate } from '../lib/constants';

interface TimelineProps {
  achievements: Achievement[];
  years: number[];
  onOpen: (achievement: Achievement) => void;
}

/** "Milestones That Define Us" — alternating timeline grouped by year. */
export const MilestonesTimeline: React.FC<TimelineProps> = ({ achievements, years, onOpen }) => {
  const sorted = [...achievements].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="ach-milestones" className="py-16 md:py-24" aria-labelledby="ach-milestones-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/25 mb-4">
            Chronicles of Excellence
          </span>
          <h2
            id="ach-milestones-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white"
          >
            Milestones That Define Us
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Trace our progression from ambitious undergraduate research projects to world-class competitive accolades.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent"
            aria-hidden="true"
          />
          <ol className="space-y-8">
            {years.map((year) => {
              const items = sorted.filter((i) => i.year === year);
              if (items.length === 0) return null;
              return (
                <li key={year}>
                  <h3 className="relative z-10 mb-5 ml-12 md:mx-auto md:w-fit inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-black font-mono bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-amber-400/40 shadow-lg">
                    {year}
                  </h3>
                  <ul className="space-y-5">
                    {items.map((item, idx) => (
                      <li key={item.id} className="relative pl-12 md:pl-0">
                        <span
                          className="absolute left-[13px] md:left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-400/20"
                          aria-hidden="true"
                        />
                        <motion.button
                          type="button"
                          onClick={() => onOpen(item)}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.2) }}
                          className={cn(
                            'w-full text-left rounded-2xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl p-5 shadow-md',
                            'hover:shadow-xl hover:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300',
                            idx % 2 === 0
                              ? 'md:mr-[calc(50%+2.5rem)]'
                              : 'md:ml-[calc(50%+2.5rem)]'
                          )}
                          aria-label={`View details for ${item.title}`}
                        >
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span
                              className={cn(
                                'text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border',
                                CATEGORY_BADGE[item.category]
                              )}
                            >
                              {CATEGORY_LABEL[item.category]}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                              {formatAchievementDate(item.date)}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                            {item.summary || item.description}
                          </p>
                          {item.metric && (
                            <p className="mt-2 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                              {item.metric}
                            </p>
                          )}
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};