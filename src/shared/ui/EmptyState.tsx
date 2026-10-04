import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onClear?: () => void;
  actionLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No projects found',
  message = 'Try changing your search or filters.',
  onClear,
  actionLabel = 'Clear Filters',
}) => {
  return (
    <div className="w-full py-16 px-6 text-center border border-dashed border-border rounded-3xl bg-card/40 my-8 flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-2xl bg-muted/70 flex items-center justify-center text-muted-foreground mb-4">
        <SearchX className="w-8 h-8 opacity-80" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base mb-6">
        {message}
      </p>

      {onClear && (
        <button
          onClick={onClear}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <RotateCcw className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};
