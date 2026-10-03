import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { LazyImage } from '../common/LazyImage';
import { StatusBadge, CategoryBadge } from '../common/StatusBadge';
import { cn } from '../../lib/utils';
import type { ProjectSummary } from '../../types';

interface ProjectCardProps {
  project: ProjectSummary;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const {
    slug,
    title,
    summary,
    thumbnail,
    tags,
    category,
    status,
    team,
    featured,
  } = project;

  const projectUrl = `/projects/${slug}`;

  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-3xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl overflow-hidden transition-all duration-300',
        'hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.25)] hover:border-white dark:hover:border-blue-400/40 shadow-xl shadow-slate-200/50 dark:shadow-black/40',
        featured && 'ring-2 ring-blue-500/40 dark:ring-cyan-400/40',
        className
      )}
    >
      {/* Specular Top Sheen Highlight */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 dark:from-white/[0.04] to-transparent pointer-events-none rounded-t-3xl z-20" />

      {/* CARD IMAGE CONTAINER */}
      <Link
        to={projectUrl}
        className="block relative overflow-hidden aspect-[16/10] bg-slate-900 focus:outline-none"
        tabIndex={-1}
        aria-hidden="true"
      >
        <LazyImage
          src={thumbnail.url}
          alt={thumbnail.alt || title}
          className="transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent opacity-80 group-hover:opacity-65 transition-opacity" />

        {/* Status / Category Badges positioned over image */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <CategoryBadge category={category} className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-white/90 dark:border-white/10 text-slate-800 dark:text-slate-100 shadow-sm" />
        </div>

        <div className="absolute top-3 right-3 z-10">
          <StatusBadge status={status} className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-white/90 dark:border-white/10 shadow-sm" />
        </div>

        {team && (
          <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5 text-xs text-white/95 font-medium drop-shadow-sm">
            <Users className="w-3.5 h-3.5 text-blue-300" />
            <span className="truncate max-w-[200px]">{team}</span>
          </div>
        )}
      </Link>

      {/* CARD BODY */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          {/* TITLE */}
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-blue-600">
            <Link
              to={projectUrl}
              className="focus:outline-none focus:underline"
            >
              {title}
            </Link>
          </h3>

          {/* SUMMARY */}
          <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {summary}
          </p>

          {/* TECH STACK TAGS */}
          <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-[11px] font-mono px-2.5 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-white/90 dark:border-white/10 shadow-2xs"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-500">
                +{tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* CARD FOOTER & VIEW PROJECT ACTION */}
        <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">
            {category}
          </span>

          <Link
            to={projectUrl}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:text-indigo-600 transition-colors focus:outline-none focus:underline"
          >
            <span>View Project</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};
