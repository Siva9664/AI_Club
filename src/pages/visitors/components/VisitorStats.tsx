import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

interface StatsProps {
  stats: {
    totalVisitors: number;
    countries: number;
    delegations: number;
    keynotes: number;
    labSessions: number;
    roundtables: number;
  };
}

export const VisitorStats: React.FC<StatsProps> = ({ stats }) => {
  const statItems = [
    { number: stats.totalVisitors + '+', label: 'Distinguished Visitors', icon: 'Users' },
    { number: stats.countries + '+', label: 'Countries Represented', icon: 'Globe' },
    { number: stats.delegations + '+', label: 'International Delegations', icon: 'Flag' },
    { number: stats.keynotes + '+', label: 'Keynotes & Symposia', icon: 'Mic' },
    { number: stats.labSessions + '+', label: 'Lab Sessions', icon: 'Cpu' },
    { number: stats.roundtables + '+', label: 'Roundtable Dialogues', icon: 'Users2' },
  ];

  return (
    <section className="py-16 md:py-20 relative" aria-labelledby="stats-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {statItems.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'stats-card glass-card relative flex flex-col items-center text-center p-6 md:p-8 rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg',
                'hover:-translate-y-1 hover:shadow-xl transition-all duration-300'
              )}
            >
              <div className="relative mb-4">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-transparent to-indigo-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                  {stat.number}
                </span>
              </div>
              <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300 leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};