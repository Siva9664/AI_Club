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
        'flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/60',
        className
      )}
    >
      <div className="text-xs text-muted-foreground font-mono">
        Showing <span className="font-semibold text-foreground">{startIdx}</span> -{' '}
        <span className="font-semibold text-foreground">{endIdx}</span> of{' '}
        <span className="font-semibold text-foreground">{total}</span> projects
      </div>

      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          type="button"
          aria-label="Previous Page"
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden xs:inline">Previous</span>
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              type="button"
              aria-label={`Go to page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={cn(
                'w-9 h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-colors',
                p === page
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'border border-border bg-card text-foreground hover:bg-muted'
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
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span className="hidden xs:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};
