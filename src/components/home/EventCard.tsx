import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LazyImage } from '../common/LazyImage';
import { StatusBadge } from '../common/StatusBadge';
import { cn } from '../../lib/utils';
import type { Event } from '../../types';

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, compact = false }) => {
  return (
    <article
      className={cn(
        'glass-card group flex flex-col rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl shadow-lg shadow-slate-200/50 dark:shadow-black/30',
        compact && 'text-sm'
      )}
    >
      <div className={cn('relative overflow-hidden bg-slate-100 dark:bg-slate-800', compact ? 'aspect-[16/9]' : 'aspect-[16/10]')}>
        <LazyImage
          src={event.image.url}
          alt={event.image.alt || event.title}
          className="transition-transform duration-700 group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/85 dark:bg-slate-900/85 text-slate-800 dark:text-slate-100 backdrop-blur-md border border-white/90 dark:border-white/10 shadow-xs">
            {event.type}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <StatusBadge status={event.status} className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-white/90 dark:border-white/10 shadow-xs" />
        </div>

        <div className="absolute bottom-2.5 left-3 text-xs text-white/95 font-mono flex items-center gap-1.5 drop-shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-blue-300" />
          {event.date}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className={cn('font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors', compact ? 'text-base line-clamp-1' : 'text-lg line-clamp-2')}>
            {event.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {event.summary}
          </p>

          <div className="mt-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            {event.timing && (
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{event.timing}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
          </div>
        </div>

        {event.action && (
          <div className="mt-5 pt-3 border-t border-slate-200/70 dark:border-slate-800">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:text-indigo-600 transition-colors"
            >
              <span>{event.action.label}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};
