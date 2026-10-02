import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileQuestion } from 'lucide-react';

interface NotFoundPageProps {
  title?: string;
  message?: string;
  backUrl?: string;
  backLabel?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  title = 'Project Not Found',
  message = "The project you're looking for doesn't exist or may have been removed.",
  backUrl = '/projects',
  backLabel = 'Back to Projects',
}) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="w-20 h-20 rounded-3xl bg-muted/60 text-muted-foreground flex items-center justify-center mb-6 border border-border">
        <FileQuestion className="w-10 h-10 opacity-70" />
      </div>

      <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold mb-2">
        404 Error
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
        {title}
      </h1>

      <p className="text-base text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
        {message}
      </p>

      <Link
        to={backUrl}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 active:scale-95 shadow-md transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{backLabel}</span>
      </Link>
    </div>
  );
};
