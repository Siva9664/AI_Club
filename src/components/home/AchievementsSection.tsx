import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { AchievementCard } from './AchievementCard';
import type { Achievement } from '../../types';

export const AchievementsSection: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const displayAchievements = achievements.slice(0, 8);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 border-b border-white/80 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            badge="Recognition"
            title="Honors & Achievements"
            subtitle="National hackathon titles, hardware grants, and research publications."
            action={{
              label: 'Explore AI Projects',
              href: '/projects',
            }}
            className="mb-0 flex-1"
          />

          {/* Carousel Arrows */}
          <div className="hidden sm:flex items-center gap-2 pl-4">
            <button
              onClick={() => scroll('left')}
              type="button"
              aria-label="Scroll achievements left"
              className="p-2.5 rounded-2xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-800/75 hover:bg-white text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-md transition-all hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              type="button"
              aria-label="Scroll achievements right"
              className="p-2.5 rounded-2xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-800/75 hover:bg-white text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-md transition-all hover:scale-105"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swipe-friendly / Horizontal Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 snap-start"
            >
              <AchievementCard achievement={achievement} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
