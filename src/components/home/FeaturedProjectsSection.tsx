import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard } from '../projects/ProjectCard';
import type { ProjectSummary } from '../../types';

import { motion } from 'framer-motion';

export const FeaturedProjectsSection: React.FC<{ projects: ProjectSummary[] }> = ({ projects }) => {
  const displayProjects = projects.slice(0, 6);

  return (
    <section className="py-16 md:py-24 border-b border-white/80 dark:border-white/5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

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
          {displayProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
