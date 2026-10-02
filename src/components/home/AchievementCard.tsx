import React from 'react';
import { Award, Calendar, Users } from 'lucide-react';
import { LazyImage } from '../common/LazyImage';
import type { Achievement } from '../../types';

export const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  return (
    <article className="group flex flex-col rounded-2xl border border-border/80 bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
      <div className="relative aspect-[16/10] overflow-hidden">
        <LazyImage
          src={achievement.image.url}
          alt={achievement.image.alt || achievement.title}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
            <Award className="w-3 h-3" />
            {achievement.category}
          </span>
        </div>
        <div className="absolute bottom-2.5 right-3 text-xs text-white/80 font-mono flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {achievement.date}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {achievement.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {achievement.summary}
          </p>
        </div>

        {achievement.recipient && (
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium text-foreground">{achievement.recipient}</span>
          </div>
        )}
      </div>
    </article>
  );
};
