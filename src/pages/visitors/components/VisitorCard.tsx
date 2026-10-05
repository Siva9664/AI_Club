import React from 'react';
import { cn } from '@/shared/lib/utils';
import { LazyImage } from '@/shared/ui/LazyImage';
import type { Visitor } from '@/types';

interface VisitorCardProps {
  visitor: Visitor;
  onClick: (visitor: Visitor) => void;
}

export const VisitorCard: React.FC<VisitorCardProps> = ({ visitor, onClick }) => {
  const typeClass = cn('visitor-badge', {
    'badge-collaborator': visitor.visitorType === 'Collaborator',
    'badge-expert': visitor.visitorType === 'Industry Expert',
    'badge-academic': visitor.visitorType === 'Academic',
    'badge-alumni': visitor.visitorType === 'Alumni',
    'badge-guest-speaker': visitor.visitorType === 'Guest Speaker',
    'badge-delegation': visitor.visitorType === 'Collaborator' && (visitor.delegates?.length ?? 0) > 0,
  });

  const isDelegation = visitor.visitorType === 'Collaborator' && visitor.delegates?.length;

  return (
    <article
      className={cn(
        'visitor-card glass-card group relative flex flex-col rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50'
      )}
      onClick={() => onClick(visitor)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(visitor);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${visitor.name}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <LazyImage
          src={visitor.photo.url}
          alt={visitor.photo.alt || visitor.name}
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className={cn(
            'inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border shadow-sm',
            typeClass
          )}>
            {visitor.visitorType === 'Collaborator' && (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            )}
            {visitor.visitorType === 'Industry Expert' && (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8"/>
                <path d="M12 17v4"/>
              </svg>
            )}
            {visitor.visitorType === 'Academic' && (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            )}
            {visitor.visitorType === 'Alumni' && (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            )}
            {visitor.visitorType === 'Guest Speaker' && (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            )}
            {visitor.visitorType === 'Collaborator' && (visitor.delegates?.length ?? 0) === 0 && (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            )}
            {visitor.visitorType}
          </span>
        </div>

        {isDelegation && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-500/90 text-white border border-blue-400 shadow-sm backdrop-blur-md">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {visitor.delegates?.length || 0} Delegates
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 text-xs text-white/95 font-mono flex items-center gap-1.5 drop-shadow-sm">
          <svg className="w-3.5 h-3.5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {visitor.visitDate}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>{visitor.year}</span>
            <span>&bull;</span>
            <span>{visitor.location}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
            {visitor.name}
          </h3>

          <div className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 line-clamp-1">
            {visitor.role}
          </div>

          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
            {visitor.organization}
          </div>

          <div className="mt-3">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Keynote / Topic
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-200 line-clamp-2">
              &ldquo;{visitor.topic}&rdquo;
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {visitor.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-white/90 dark:border-white/10 shadow-2xs backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
            {visitor.tags && visitor.tags.length > 3 && (
              <span className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-500">
                +{visitor.tags.length - 3}
              </span>
            )}
          </div>

          <button
            className="inline-flex items-center justify-center w-full gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 active:scale-95 shadow-sm shadow-blue-500/25 transition-all border border-blue-400/30"
            onClick={(e) => {
              e.stopPropagation();
              onClick(visitor);
            }}
          >
            <span>View Details</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};