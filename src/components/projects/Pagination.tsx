import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { PaginationMeta } from '../../types';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (newPage: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  meta,
  onPageChange,
  className,
}) => {
  const { page, totalPages, total, limit } = meta;

  if (totalPages <= 1) return null;

  const startIdx = (page - 1) * limit + 1;
  const endIdx = Math.min(page * limit, total);

  // Generate page numbers
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      aria-label="Project Pagination"
      className={cn(
        'flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/80 dark:border-white/5',
        className
      )}
    >
      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
        Showing <span className="font-bold text-slate-900 dark:text-white">{startIdx}</span> -{' '}
        <span className="font-bold text-slate-900 dark:text-white">{endIdx}</span> of{' '}
        <span className="font-bold text-slate-900 dark:text-white">{total}</span> projects
      </div>

      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          type="button"
          aria-label="Previous Page"
          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-2xl text-xs font-bold border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-md shadow-xs transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden xs:inline">Previous</span>
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1.5">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              type="button"
              aria-label={`Go to page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={cn(
                'w-9 h-9 rounded-2xl text-xs font-bold flex items-center justify-center transition-all',
                p === page
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/30'
                  : 'border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-white backdrop-blur-md shadow-xs hover:scale-105'
              )}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          type="button"
          aria-label="Next Page"
          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-2xl text-xs font-bold border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-md shadow-xs transition-all hover:scale-105 active:scale-95"
        >
          <span className="hidden xs:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};
