import React from 'react';
import { LoadingState } from '@/shared/ui/LoadingState';
import { EmptyState } from '@/shared/ui/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { AchievementsHero } from '../components/AchievementsHero';
import { StatsSection } from '../components/StatsSection';
import { FeaturedCarousel } from '../components/FeaturedCarousel';
import { MilestonesTimeline } from '../components/MilestonesTimeline';
import { FilterBar } from '../components/FilterBar';
import { AchievementCard } from '../components/AchievementCard';
import { UpcomingSection } from '../components/UpcomingSection';
import { AmbassadorsSection } from '../components/AmbassadorsSection';
import { JourneySection } from '../components/JourneySection';
import { DetailModal } from '../components/DetailModal';
import { useAchievementsPage } from '../hooks/useAchievementsPage';

export const Achievements: React.FC = () => {
  const page = useAchievementsPage();

  return (
    <div className="pb-20">
      <AchievementsHero />

      {page.error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            title="Unable to load achievements"
            message={page.error}
            onRetry={page.load}
          />
        </div>
      )}

      {page.loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingState count={6} />
        </div>
      )}

      {!page.loading && !page.error && page.stats && (
        <>
          <StatsSection stats={page.stats} />
          <FeaturedCarousel items={page.featured} onOpen={page.setSelected} />
          <MilestonesTimeline achievements={page.all} years={page.years} onOpen={page.setSelected} />

          <FilterBar
            search={page.search}
            onSearchChange={page.onSearchChange}
            category={page.category}
            onCategoryChange={page.onCategoryChange}
            year={page.year}
            onYearChange={page.onYearChange}
            years={page.years}
            shown={page.filtered.length}
            total={page.all.length}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {page.filtered.length === 0 ? (
              <EmptyState
                title="No achievements found"
                message="No achievement matches your search and filters. Try a different term or reset the filters."
                onClear={page.clearFilters}
                actionLabel="Reset Filters"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {page.filtered.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    onOpen={page.setSelected}
                  />
                ))}
              </div>
            )}
          </div>

          <UpcomingSection competitions={page.upcoming} />
          <AmbassadorsSection ambassadors={page.ambassadors} />
          <JourneySection />
        </>
      )}

      <DetailModal achievement={page.selected} onClose={page.closeModal} />
    </div>
  );
};