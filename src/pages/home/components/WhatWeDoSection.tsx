import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import { SectionHeader } from '@/shared/ui/SectionHeader';
import type { Activity } from '@/types';

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
    <section className="py-16 md:py-24 border-b border-white/80 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Core Pillars"
          title="What We Do"
          subtitle="Learn. Build. Compete. Collaborate."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act, idx) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              animate={{
                y: [0, -5, 0],
              }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="flex"
            >
              <Link
                to="/projects"
                className="group relative flex flex-col justify-between w-full p-6 sm:p-7 rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/80 hover:bg-white/95 dark:hover:bg-slate-800/90 backdrop-blur-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/30 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary overflow-hidden"
              >
                {/* Specular top sheen */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none" />

                {/* Moving light sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-xs">
                    {getLucideIcon(act.icon)}
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    {act.category}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {act.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {act.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:text-indigo-600 transition-colors">
                  <span>Explore Projects in {act.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
