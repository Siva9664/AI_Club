import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard } from '../projects/ProjectCard';
import type { ProjectSummary } from '../../types';

export const FeaturedProjectsSection: React.FC<{ projects: ProjectSummary[] }> = ({ projects }) => {
  const displayProjects = projects.slice(0, 6);

  return (
    <section className="py-16 md:py-24 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Innovations"
          title="Featured Projects"
          subtitle="Explore what our AI community is building."
          action={{
            label: 'View All Projects',
            href: '/projects',
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
