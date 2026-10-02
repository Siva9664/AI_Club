import React from 'react';
import { ExternalLink, BookOpen, FileText } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import type { Links } from '../../types';

export const ProjectLinks: React.FC<{ links?: Links }> = ({ links }) => {
  if (!links) return null;

  const hasAnyLink = links.github || links.liveDemo || links.documentation || links.paper;
  if (!hasAnyLink) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-card border border-border text-foreground hover:bg-muted hover:border-primary/50 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <GithubIcon className="w-4 h-4" />
          <span>Source Code</span>
        </a>
      )}

      {links.liveDemo && (
        <a
          href={links.liveDemo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Live Demo</span>
        </a>
      )}

      {links.documentation && (
        <a
          href={links.documentation}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-card border border-border text-foreground hover:bg-muted transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <BookOpen className="w-4 h-4" />
          <span>Documentation</span>
        </a>
      )}

      {links.paper && (
        <a
          href={links.paper}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-card border border-border text-foreground hover:bg-muted transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <FileText className="w-4 h-4" />
          <span>Research Paper</span>
        </a>
      )}
    </div>
  );
};
