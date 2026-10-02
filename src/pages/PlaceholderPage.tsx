import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Clock, FolderGit2 } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  category: string;
  description: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  category,
  description,
}) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium uppercase bg-primary/10 text-primary border border-primary/25">
          <Clock className="w-3.5 h-3.5" />
          <span>{category} • Coming In Phase 2</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          {title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm max-w-lg mx-auto text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Architecture Readiness</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            This route is pre-wired into the SIET AI Club frontend architecture. API contracts and design tokens are already configured for rapid component plug-in.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 active:scale-95 shadow-md transition-all"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Explore Active Projects</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-card border border-border text-foreground hover:bg-muted transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
