import React from 'react';
import { Award, Calendar, Users } from 'lucide-react';
import { LazyImage } from '@/shared/ui/LazyImage';
import type { Achievement } from '@/types';

export const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  return (
    <article className="glass-card group flex flex-col rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-lg shadow-slate-200/50 dark:shadow-black/30">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <LazyImage
          src={achievement.image.url}
          alt={achievement.image.alt || achievement.title}
          className="transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-400/90 text-slate-950 border border-amber-300 shadow-sm backdrop-blur-md">
            <Award className="w-3.5 h-3.5" />
            {achievement.category}
          </span>
        </div>
        <div className="absolute bottom-2.5 right-3 text-xs text-white/95 font-mono flex items-center gap-1.5 drop-shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-blue-300" />
          {achievement.date}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
            {achievement.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {achievement.summary}
          </p>
        </div>

        {achievement.recipient && (
          <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">{achievement.recipient}</span>
          </div>
        )}
      </div>
    </article>
  );
};
