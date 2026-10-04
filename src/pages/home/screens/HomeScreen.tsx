import React, { useEffect, useState, useCallback } from 'react';
import { getHome } from '@/services/home';
import type { HomeApiResponse } from '@/types';
import { HeroSection } from '../components/HeroSection';
import { PillarsSection } from '../components/PillarsSection';
import { OverviewSection } from '../components/OverviewSection';
import { WhatWeDoSection } from '../components/WhatWeDoSection';
import { FeaturedProjectsSection } from '../components/FeaturedProjectsSection';
import { AchievementsSection } from '../components/AchievementsSection';
import { UpcomingEventsSection } from '../components/UpcomingEventsSection';
import { RecentEventsSection } from '../components/RecentEventsSection';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { CtaSection } from '../components/CtaSection';
import { ContactPreviewSection } from '../components/ContactPreviewSection';
import { LoadingState } from '@/shared/ui/LoadingState';
import { ErrorState } from '@/shared/ui/ErrorState';

export const Home: React.FC = () => {
  const [data, setData] = useState<HomeApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    let isMounted = true;
    try {
      setError(null);
      setLoading(true);
      const res = await getHome();
      if (isMounted) {
        setData(res);
      }
    } catch (err: any) {
      if (isMounted) {
        setError(err?.message || 'Failed to load home page content.');
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps -- loadData sets state internally, this is the standard data fetching pattern
    loadData();
  }, [loadData]);

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
          onRetry={loadData}
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
