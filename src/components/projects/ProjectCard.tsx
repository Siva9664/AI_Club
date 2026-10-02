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
        'group relative flex flex-col rounded-2xl border border-border/80 bg-card overflow-hidden transition-all duration-300',
        'hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/40',
        featured && 'ring-1 ring-primary/20 dark:ring-primary/30',
        className
      )}
    >
      {/* CARD IMAGE CONTAINER */}
      <Link
        to={projectUrl}
        className="block relative overflow-hidden aspect-[16/10] bg-muted/30 focus:outline-none"
        tabIndex={-1}
        aria-hidden="true"
      >
        <LazyImage
          src={thumbnail.url}
          alt={thumbnail.alt || title}
          className="transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Status / Category Badges positioned over image */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <CategoryBadge category={category} className="bg-background/80 dark:bg-card/90 backdrop-blur-md" />
        </div>

        <div className="absolute top-3 right-3 z-10">
          <StatusBadge status={status} className="bg-background/80 dark:bg-card/90 backdrop-blur-md" />
        </div>

        {team && (
          <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5 text-xs text-white/90 font-medium">
            <Users className="w-3.5 h-3.5" />
            <span className="truncate max-w-[200px]">{team}</span>
          </div>
        )}
      </Link>

      {/* CARD BODY */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          {/* TITLE */}
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            <Link
              to={projectUrl}
              className="focus:outline-none focus:underline"
            >
              {title}
            </Link>
          </h3>

          {/* SUMMARY */}
          <p className="mt-2.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {summary}
          </p>

          {/* TECH STACK TAGS */}
          <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/50"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-muted/60 text-muted-foreground">
                +{tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* CARD FOOTER & VIEW PROJECT ACTION */}
        <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono">
            {category}
          </span>

          <Link
            to={projectUrl}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary group-hover:text-accent transition-colors focus:outline-none focus:underline"
          >
            <span>View Project</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};
