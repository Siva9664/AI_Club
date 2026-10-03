import React from 'react';
import { SearchBar } from './SearchBar';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ProjectFilterMeta } from '../../types';

interface FilterToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  meta: ProjectFilterMeta | null;
  onReset: () => void;
  isFiltered: boolean;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedTag,
  onTagChange,
  meta,
  onReset,
  isFiltered,
}) => {
  return (
    <div className="glass-panel w-full bg-white/75 dark:bg-slate-900/75 border border-white/85 dark:border-white/10 rounded-3xl p-4 sm:p-5 shadow-lg shadow-slate-200/50 dark:shadow-black/30 backdrop-blur-2xl mb-8">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search projects by title, summary, or tech..."
          />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Category Filter */}
          <div className="relative">
            <label htmlFor="filter-category" className="sr-only">Filter by Category</label>
            <select
              id="filter-category"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-label="Filter by Category"
              className={cn(
                'w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold bg-white/80 dark:bg-slate-800/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md shadow-xs transition-all',
                selectedCategory && selectedCategory !== 'All'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 font-bold'
                  : 'border-white/90 dark:border-white/10 text-slate-700 dark:text-slate-200'
              )}
            >
              <option value="All">All Categories</option>
              {meta?.categories.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
              <Filter className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <label htmlFor="filter-status" className="sr-only">Filter by Status</label>
            <select
              id="filter-status"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              aria-label="Filter by Status"
              className={cn(
                'w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold bg-white/80 dark:bg-slate-800/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md shadow-xs transition-all',
                selectedStatus && selectedStatus !== 'All'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 font-bold'
                  : 'border-white/90 dark:border-white/10 text-slate-700 dark:text-slate-200'
              )}
            >
              <option value="All">All Statuses</option>
              {meta?.statuses.filter((s) => s !== 'All').map((st) => (
                <option key={st} value={st}>
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tech Tag Filter */}
          <div className="relative">
            <label htmlFor="filter-tag" className="sr-only">Filter by Technology</label>
            <select
              id="filter-tag"
              value={selectedTag}
              onChange={(e) => onTagChange(e.target.value)}
              aria-label="Filter by Technology Tag"
              className={cn(
                'w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold bg-white/80 dark:bg-slate-800/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md shadow-xs transition-all',
                selectedTag && selectedTag !== 'All'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 font-bold'
                  : 'border-white/90 dark:border-white/10 text-slate-700 dark:text-slate-200'
              )}
            >
              <option value="All">All Technologies</option>
              {meta?.tags.filter((t) => t !== 'All').map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
              <span className="text-[11px] font-mono text-slate-400">#</span>
            </div>
          </div>
        </div>

        {/* Reset Filter Button */}
        {isFiltered && (
          <button
            onClick={onReset}
            type="button"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-slate-800/80 hover:bg-white border border-white/90 dark:border-white/10 shadow-xs backdrop-blur-md transition-all self-end lg:self-center"
            title="Reset filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};
