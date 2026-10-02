import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Users, Calendar } from 'lucide-react';
import { StatusBadge, CategoryBadge } from '../common/StatusBadge';
import { LazyImage } from '../common/LazyImage';
import type { ProjectDetail } from '../../types';

export const DetailHero: React.FC<{ project: ProjectDetail }> = ({ project }) => {
  return (
    <div className="relative pt-6 pb-12 md:pb-16 border-b border-border/60 overflow-hidden">
      {/* Background glow behind hero */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BREADCRUMB & BACK ACTION */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-muted-foreground font-medium">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 opacity-50" />
            <Link to="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 opacity-50" />
            <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs">
              {project.title}
            </span>
          </nav>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border/60 hover:bg-muted/60"
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
              <CategoryBadge category={project.category} size="md" />
              <StatusBadge status={project.status} size="md" />
              {project.team && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-muted text-foreground border border-border/60">
                  <Users className="w-3 h-3 text-primary" />
                  {project.team}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {project.summary}
            </p>

            {/* DATES */}
            {(project.startedOn || project.completedOn) && (
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-muted-foreground">
                {project.startedOn && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>Started: <strong className="text-foreground">{project.startedOn}</strong></span>
                  </div>
                )}
                {project.completedOn && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>Completed: <strong className="text-foreground">{project.completedOn}</strong></span>
                  </div>
                )}
              </div>
            )}

            {/* TECH STACK TAG PILLS */}
            <div className="pt-2">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-xs font-mono px-3 py-1 rounded-lg bg-card border border-border/80 text-foreground/90 shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Hero Image (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-card aspect-[16/11]">
              <LazyImage
                src={project.heroImage?.url || project.thumbnail.url}
                alt={project.heroImage?.alt || project.title}
                aspectRatio="aspect-[16/11]"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
