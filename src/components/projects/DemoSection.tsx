import React from 'react';
import { Play, ExternalLink } from 'lucide-react';
import type { DemoInfo } from '../../types';

export const DemoSection: React.FC<{ demo?: DemoInfo }> = ({ demo }) => {
  if (!demo || !demo.url) return null;

  return (
    <div className="rounded-3xl border border-border/80 bg-card/70 p-6 md:p-8 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
          <Play className="w-4 h-4" />
          <span>Interactive Prototype & Demonstration</span>
        </div>
      </div>

      {demo.type === 'video' ? (
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/60 bg-black">
          <iframe
            src={demo.url}
            title="Project Demo Video"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-muted/40 border border-border/60">
          <div>
            <h4 className="text-base font-bold text-foreground">
              {demo.label || 'Live Cloud Deployment'}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Test inference requests, inspect live model metrics, and view real-time latency dashboards.
            </p>
          </div>
          <a
            href={demo.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 active:scale-95 shadow-md transition-all shrink-0"
          >
            <span>{demo.label || 'Launch Live Demo'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
};
