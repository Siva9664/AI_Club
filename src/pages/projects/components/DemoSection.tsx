import React from 'react';
import { Play, ExternalLink } from 'lucide-react';
import type { DemoInfo } from '@/types';

export const DemoSection: React.FC<{ demo?: DemoInfo }> = ({ demo }) => {
  if (!demo || !demo.url) return null;

  return (
    <div className="glass-card rounded-3xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 p-6 md:p-8 backdrop-blur-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20">
          <Play className="w-3.5 h-3.5" />
          <span>Interactive Prototype & Demonstration</span>
        </div>
      </div>

      {demo.type === 'video' ? (
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 bg-black shadow-xl">
          <iframe
            src={demo.url}
            title="Project Demo Video"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-white/10 shadow-xs backdrop-blur-md">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {demo.label || 'Live Cloud Deployment'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Test inference requests, inspect live model metrics, and view real-time latency dashboards.
            </p>
          </div>
          <a
            href={demo.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 active:scale-95 shadow-md shadow-blue-500/25 transition-all shrink-0 border border-blue-400/30"
          >
            <span>{demo.label || 'Launch Live Demo'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
};
