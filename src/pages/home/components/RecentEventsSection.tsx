import React from 'react';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { EventCard } from './EventCard';
import type { Event } from '@/types';

export const RecentEventsSection: React.FC<{ events: Event[] }> = ({ events }) => {
  if (!events || events.length === 0) return null;
  const displayEvents = events.slice(0, 4);

  return (
    <section className="py-12 md:py-16 border-b border-white/80 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Archived"
          title="Recent Activities & Bootcamps"
          subtitle="Highlights from our recently concluded technical sprints and student exhibitions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {displayEvents.map((event) => (
            <EventCard key={event.id} event={event} compact />
          ))}
        </div>
      </div>
    </section>
  );
};
