import React, { useEffect, useState, useCallback } from 'react';
import { getHome } from '../api/home';
import type { HomeApiResponse } from '../types';
import { HeroSection } from '../components/home/HeroSection';
import { PillarsSection } from '../components/home/PillarsSection';
import { OverviewSection } from '../components/home/OverviewSection';
import { WhatWeDoSection } from '../components/home/WhatWeDoSection';
import { FeaturedProjectsSection } from '../components/home/FeaturedProjectsSection';
import { AchievementsSection } from '../components/home/AchievementsSection';
import { UpcomingEventsSection } from '../components/home/UpcomingEventsSection';
import { RecentEventsSection } from '../components/home/RecentEventsSection';
import { FacilitiesSection } from '../components/home/FacilitiesSection';
import { CtaSection } from '../components/home/CtaSection';
import { ContactPreviewSection } from '../components/home/ContactPreviewSection';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';

export const Home: React.FC = () => {
  const [data, setData] = useState<HomeApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHomeData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getHome();
      setData(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to load home page content.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="h-96 rounded-3xl bg-muted/40 animate-pulse" />
        <LoadingState count={3} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ErrorState
          title="Unable to load Home Page"
          message={error || 'Could not retrieve club data.'}
          onRetry={fetchHomeData}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <HeroSection hero={data.hero} />

      {/* 2. THE 4 PILLARS: AIM, GOAL, WHAT WE HAVE DONE & ONGOING RESEARCH */}
      <PillarsSection />

      {/* 3. AI CLUB OVERVIEW */}
      <OverviewSection overview={data.overview} />

      {/* 3. WHAT WE DO */}
      <WhatWeDoSection activities={data.activities} />

      {/* 4. FEATURED PROJECTS */}
      <FeaturedProjectsSection projects={data.featuredProjects} />

      {/* 5. ACHIEVEMENTS */}
      <AchievementsSection achievements={data.featuredAchievements} />

      {/* 6. UPCOMING EVENTS */}
      <UpcomingEventsSection events={data.upcomingEvents} />

      {/* 7. RECENT EVENTS */}
      <RecentEventsSection events={data.recentEvents} />

      {/* 8. AI LAB & FACILITIES */}
      <FacilitiesSection facilities={data.facilities} />

      {/* 9. CALL TO ACTION */}
      <CtaSection />

      {/* 10. CONTACT PREVIEW */}
      <ContactPreviewSection contact={data.contact} />
    </div>
  );
};
