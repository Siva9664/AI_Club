import React from 'react';
import { Search, X } from 'lucide-react';
import type { AchievementCategory } from '@/types';
import { cn } from '@/shared/lib/utils';
import { CATEGORY_TABS } from '../lib/constants';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: AchievementCategory | 'all';
  onCategoryChange: (value: AchievementCategory | 'all') => void;
  year: number | 'all';
  onYearChange: (value: number | 'all') => void;
  years: number[];
  shown: number;
  total: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  year,
  onYearChange,
  years,
  shown,
  total,
}) => (
  <section id="ach-gallery" className="py-14 md:py-16" aria-labelledby="ach-gallery-heading">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-9">
        <h2
          id="ach-gallery-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white"
        >
          Achievement Gallery
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Search by title, recipient or summary and narrow the hall of fame by category and year.
        </p>
      </div>

      <div className="rounded-[2rem] border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-5 sm:p-6 shadow-lg space-y-5">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
          {/* Debounced search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="ach-search" className="sr-only">
              Search achievements
            </label>
            <input
              id="ach-search"
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, recipient, summary..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl text-sm bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-white/10 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Year filter */}
          <div className="lg:w-44">
            <label htmlFor="ach-year" className="sr-only">
              Filter by year
            </label>
            <select
              id="ach-year"
              value={String(year)}
              onChange={(e) =>
                onYearChange(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="w-full px-4 py-3 rounded-2xl text-sm bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-white/10 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">All Years</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap" aria-live="polite">
            Showing <strong className="text-slate-900 dark:text-white">{shown}</strong> of{' '}
            <strong className="text-slate-900 dark:text-white">{total}</strong> achievements
          </p>
        </div>

        {/* Category tabs */}
        <div role="tablist" aria-label="Achievement categories" className="flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={category === tab.value}
              onClick={() => onCategoryChange(tab.value)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 dark:focus:ring-offset-slate-950',
                category === tab.value
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                  : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 border border-white/90 dark:border-white/10 hover:bg-white dark:hover:bg-slate-700/70'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  </section>
);