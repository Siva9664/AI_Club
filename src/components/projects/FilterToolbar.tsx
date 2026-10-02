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
    <div className="w-full bg-card/80 border border-border/80 rounded-2xl p-4 sm:p-5 shadow-sm backdrop-blur-md mb-8">
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
                'w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border text-xs sm:text-sm font-medium bg-card text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-colors',
                selectedCategory && selectedCategory !== 'All'
                  ? 'border-primary text-primary bg-primary/5 font-semibold'
                  : 'border-border text-muted-foreground'
              )}
            >
              <option value="All">All Categories</option>
              {meta?.categories.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-muted-foreground">
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
                'w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border text-xs sm:text-sm font-medium bg-card text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-colors',
                selectedStatus && selectedStatus !== 'All'
                  ? 'border-primary text-primary bg-primary/5 font-semibold'
                  : 'border-border text-muted-foreground'
              )}
            >
              <option value="All">All Statuses</option>
              {meta?.statuses.filter((s) => s !== 'All').map((st) => (
                <option key={st} value={st}>
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-muted-foreground">
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
                'w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border text-xs sm:text-sm font-medium bg-card text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-colors',
                selectedTag && selectedTag !== 'All'
                  ? 'border-primary text-primary bg-primary/5 font-semibold'
                  : 'border-border text-muted-foreground'
              )}
            >
              <option value="All">All Technologies</option>
              {meta?.tags.filter((t) => t !== 'All').map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-muted-foreground">
              <span className="text-[11px] font-mono text-muted-foreground">#</span>
            </div>
          </div>
        </div>

        {/* Reset Filter Button */}
        {isFiltered && (
          <button
            onClick={onReset}
            type="button"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border transition-colors self-end lg:self-center"
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
