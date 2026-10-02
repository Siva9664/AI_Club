import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { EventCard } from './EventCard';
import type { Event } from '../../types';

export const UpcomingEventsSection: React.FC<{ events: Event[] }> = ({ events }) => {
  const displayEvents = events.slice(0, 4);

  return (
    <section className="py-16 md:py-24 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Live Schedule"
          title="Upcoming Events & Sprints"
          subtitle="Join our hackathons, masterclasses, and hands-on developer workshops."
          action={{
            label: 'View All Events',
            href: '/events',
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};
