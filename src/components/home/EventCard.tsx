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
        'group flex flex-col rounded-2xl border border-border/80 bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40',
        compact && 'text-sm'
      )}
    >
      <div className={cn('relative overflow-hidden', compact ? 'aspect-[16/9]' : 'aspect-[16/10]')}>
        <LazyImage
          src={event.image.url}
          alt={event.image.alt || event.title}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-background/80 dark:bg-card/90 text-foreground backdrop-blur-md border border-border/40">
            {event.type}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <StatusBadge status={event.status} className="bg-background/80 dark:bg-card/90 backdrop-blur-md" />
        </div>

        <div className="absolute bottom-2.5 left-3 text-xs text-white/90 font-mono flex items-center gap-1">
          <Calendar className="w-3 h-3 text-primary" />
          {event.date}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className={cn('font-bold text-foreground group-hover:text-primary transition-colors', compact ? 'text-base line-clamp-1' : 'text-lg line-clamp-2')}>
            {event.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {event.summary}
          </p>

          <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
            {event.timing && (
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{event.timing}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
          </div>
        </div>

        {event.action && (
          <div className="mt-5 pt-3 border-t border-border/50">
            <Link
              to={event.action.url}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary group-hover:text-accent transition-colors"
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
