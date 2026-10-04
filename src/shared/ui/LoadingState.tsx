import React from 'react';
import { cn } from '@/shared/lib/utils';

interface LoadingStateProps {
  count?: number;
  layout?: 'grid' | 'list';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  count = 6,
  layout = 'grid',
  className,
}) => {
  return (
    <div
      className={cn(
        layout === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
          : 'space-y-4',
        className
      )}
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading content..."
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm animate-pulse flex flex-col"
        >
          {/* Card thumbnail skeleton */}
          <div className="w-full aspect-[16/10] bg-muted/60 relative">
            <div className="absolute top-3 left-3 w-20 h-5 rounded-full bg-muted/80" />
            <div className="absolute top-3 right-3 w-16 h-5 rounded-full bg-muted/80" />
          </div>

          {/* Card body skeleton */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <div className="h-6 w-3/4 rounded-md bg-muted/80 mb-3" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted/60" />
                <div className="h-4 w-5/6 rounded bg-muted/60" />
              </div>
            </div>

            {/* Tags skeleton */}
            <div className="pt-2">
              <div className="flex flex-wrap gap-1.5 mb-4">
                <div className="h-5 w-14 rounded-md bg-muted/70" />
                <div className="h-5 w-16 rounded-md bg-muted/70" />
                <div className="h-5 w-12 rounded-md bg-muted/70" />
              </div>

              {/* Footer action skeleton */}
              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <div className="h-4 w-24 rounded bg-muted/60" />
                <div className="h-4 w-20 rounded bg-muted/80" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
