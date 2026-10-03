import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { FacilityCard } from './FacilityCard';
import type { Facility } from '../../types';

export const FacilitiesSection: React.FC<{ facilities: Facility[] }> = ({ facilities }) => {
  const displayFacilities = facilities.slice(0, 6);

  return (
    <section className="py-16 md:py-24 border-b border-white/80 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Hardware & Silicon"
          title="AI Lab & Research Facilities"
          subtitle="Explore our dedicated compute clusters, embedded robotics stations, and collaborative ideation pods."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayFacilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      </div>
    </section>
  );
};
