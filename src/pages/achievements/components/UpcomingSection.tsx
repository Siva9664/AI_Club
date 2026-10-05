import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, CalendarDays } from 'lucide-react';
import type { UpcomingCompetition } from '@/types';
import { UPCOMING_INITIAL, UPCOMING_MAX, formatAchievementDate } from '../lib/constants';

interface UpcomingSectionProps {
  competitions: UpcomingCompetition[];
}

/** First 10 shown; "+ N more" reveals up to UPCOMING_MAX (20). */
export const UpcomingSection: React.FC<UpcomingSectionProps> = ({ competitions }) => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded
    ? competitions.slice(0, UPCOMING_MAX)
    : competitions.slice(0, UPCOMING_INITIAL);
  const hidden = Math.min(competitions.length, UPCOMING_MAX) - visible.length;

  return (
    <section id="ach-upcoming" className="py-16 md:py-20" aria-labelledby="ach-upcoming-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/25 mb-4">
            <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
            On the Horizon
          </span>
          <h2
            id="ach-upcoming-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white"
          >
            Upcoming Competitions
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Confirmed events the club is preparing for. Showing {visible.length} of{' '}
            {Math.min(competitions.length, UPCOMING_MAX)}.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((comp, idx) => (
            <motion.li
              key={comp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.24) }}
              className="flex flex-col rounded-3xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl p-5 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  {comp.type}
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {formatAchievementDate(comp.date)}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {comp.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 flex-1">
                {comp.summary}
              </p>
              {comp.location && (
                <p className="mt-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                  {comp.location}
                </p>
              )}
            </motion.li>
          ))}
        </ul>

        {hidden > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              + {hidden} more
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};