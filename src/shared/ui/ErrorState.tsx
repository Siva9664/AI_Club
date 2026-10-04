import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  status?: number;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to load projects',
  message = 'Something went wrong while loading the projects.',
  onRetry,
  status,
}) => {
  return (
    <div
      role="alert"
      className="w-full py-16 px-6 text-center border border-destructive/20 rounded-3xl bg-destructive/5 my-8 flex flex-col items-center justify-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">
        {title} {status ? `(${status})` : ''}
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base mb-6">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
};
