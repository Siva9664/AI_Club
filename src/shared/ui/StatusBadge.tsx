import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Sparkles, Clock, CheckCircle2, Calendar } from 'lucide-react';
import type { ProjectStatus, EventStatus } from '@/types';

interface StatusBadgeProps {
  status?: ProjectStatus | EventStatus | string;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  size = 'sm',
}) => {
  if (!status) return null;

  const normalized = status.toLowerCase();

  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  if (normalized === 'featured') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 backdrop-blur-sm',
          sizeClasses,
          className
        )}
      >
        <Sparkles className="w-3 h-3" />
        Featured
      </span>
    );
  }

  if (normalized === 'ongoing') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 backdrop-blur-sm',
          sizeClasses,
          className
        )}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        Ongoing
      </span>
    );
  }

  if (normalized === 'completed') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 backdrop-blur-sm',
          sizeClasses,
          className
        )}
      >
        <CheckCircle2 className="w-3 h-3" />
        Completed
      </span>
    );
  }

  if (normalized === 'upcoming') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 backdrop-blur-sm',
          sizeClasses,
          className
        )}
      >
        <Calendar className="w-3 h-3" />
        Upcoming
      </span>
    );
  }

  // Fallback / Generic category badge
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full bg-muted text-muted-foreground border border-border/80',
        sizeClasses,
        className
      )}
    >
      <Clock className="w-3 h-3 mr-1 opacity-70" />
      {status}
    </span>
  );
};

export const CategoryBadge: React.FC<{
  category: string;
  className?: string;
  size?: 'sm' | 'md';
}> = ({
  category,
  className,
  size = 'sm',
}) => {
  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm',
        sizeClasses,
        className
      )}
    >
      {category}
    </span>
  );
};
