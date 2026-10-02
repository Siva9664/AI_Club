import React from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Trophy,
  GraduationCap,
  Terminal,
  Network,
  Users,
  ArrowRight,
  Activity as ActivityIcon,
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import type { Activity } from '../../types';

// Map icon strings to Lucide components
const getLucideIcon = (iconName: string) => {
  switch (iconName) {
    case 'FolderGit2':
      return <FolderGit2 className="w-6 h-6" />;
    case 'Trophy':
      return <Trophy className="w-6 h-6" />;
    case 'GraduationCap':
      return <GraduationCap className="w-6 h-6" />;
    case 'Terminal':
      return <Terminal className="w-6 h-6" />;
    case 'Network':
      return <Network className="w-6 h-6" />;
    case 'Users':
      return <Users className="w-6 h-6" />;
    default:
      return <ActivityIcon className="w-6 h-6" />;
  }
};

export const WhatWeDoSection: React.FC<{ activities: Activity[] }> = ({ activities }) => {
  return (
    <section className="py-16 md:py-24 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Core Pillars"
          title="What We Do"
          subtitle="Learn. Build. Compete. Collaborate."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act) => (
            <Link
              key={act.id}
              to={act.link}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-border/80 bg-card hover:border-primary/50 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {getLucideIcon(act.icon)}
                </div>

                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                  {act.category}
                </span>

                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {act.title}
                </h3>

                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                  {act.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-accent transition-colors">
                <span>Explore {act.title}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
