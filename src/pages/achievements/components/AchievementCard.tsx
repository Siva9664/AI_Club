import React from 'react';
import { motion } from 'framer-motion';
import type { Achievement } from '@/types';
import { LazyImage } from '@/shared/ui/LazyImage';
import { cn } from '@/shared/lib/utils';
import { CATEGORY_BADGE, CATEGORY_LABEL, formatAchievementDate } from '../lib/constants';

interface AchievementCardProps {
  achievement: Achievement;
  onOpen: (achievement: Achievement) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onOpen }) => {
  const badge = CATEGORY_BADGE[achievement.category];

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(achievement)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group flex flex-col text-left rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl shadow-lg',
        'hover:-translate-y-1.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 transition-all duration-300'
      )}
      aria-label={`View details for ${achievement.title}`}
    >
      <div className="relative">
        <LazyImage
          src={achievement.image?.url ?? ''}
          alt={achievement.image?.alt || achievement.title}
          aspectRatio="aspect-[4/3]"
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <span
          className={cn(
            'absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md',
            badge
          )}
        >
          {CATEGORY_LABEL[achievement.category]}
        </span>
        {achievement.featured && (
          <span className="absolute top-3 right-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-400/90 text-slate-900 border border-amber-200">
            Featured
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          {formatAchievementDate(achievement.date)} &bull; {achievement.year}
        </p>
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors line-clamp-2">
          {achievement.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
          {achievement.summary || achievement.description}
        </p>
        {achievement.metric && (
          <p className="mt-auto pt-3 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
            {achievement.metric}
          </p>
        )}
      </div>
    </motion.button>
  );
};