import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Users, Calendar } from 'lucide-react';
import { StatusBadge, CategoryBadge } from '@/shared/ui/StatusBadge';
import { LazyImage } from '@/shared/ui/LazyImage';
import type { ProjectDetail } from '@/types';

export const DetailHero: React.FC<{ project: ProjectDetail }> = ({ project }) => {
  return (
    <div className="relative pt-6 pb-12 md:pb-16 border-b border-white/80 dark:border-white/5 overflow-hidden">
      {/* Background glow behind hero */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-tr from-sky-400/20 to-indigo-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BREADCRUMB & BACK ACTION */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium px-4 py-2 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/10 shadow-xs backdrop-blur-md">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 opacity-50" />
            <Link to="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Projects
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 opacity-50" />
            <span className="text-slate-900 dark:text-white font-bold truncate max-w-[200px] sm:max-w-xs">
              {project.title}
            </span>
          </nav>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 hover:bg-white backdrop-blur-md shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* HERO CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: Metadata & Overview (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={project.category || 'Uncategorized'} size="md" />
              <StatusBadge status={project.status} size="md" />
              {project.team && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-white/90 dark:border-white/10 backdrop-blur-md shadow-2xs">
                  <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  {project.team}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.summary}
            </p>

            {/* DATES */}
            {(project.startedOn || project.completedOn) && (
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                {project.startedOn && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Started: <strong className="text-slate-900 dark:text-white">{project.startedOn}</strong></span>
                  </div>
                )}
                {project.completedOn && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Completed: <strong className="text-slate-900 dark:text-white">{project.completedOn}</strong></span>
                  </div>
                )}
              </div>
            )}

            {/* TECH STACK TAG PILLS */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-xs font-mono px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-white/10 text-slate-700 dark:text-slate-300 shadow-2xs backdrop-blur-md font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Hero Image (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/95 dark:border-white/15 shadow-[0_20px_50px_-15px_rgba(59,130,246,0.25)] bg-slate-900/80 backdrop-blur-2xl aspect-[16/11]">
              <LazyImage
                src={project.heroImage?.url || project.thumbnail?.url || ''}
                alt={project.heroImage?.alt || project.thumbnail?.alt || project.title}
                aspectRatio="aspect-[16/11]"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
