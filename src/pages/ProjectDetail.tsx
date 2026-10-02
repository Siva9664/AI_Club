import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../api/projects';
import { ApiError } from '../api/client';
import type { ProjectDetail as ProjectDetailType } from '../types';
import { DetailHero } from '../components/projects/DetailHero';
import { TechStack } from '../components/projects/TechStack';
import { Gallery } from '../components/projects/Gallery';
import { ArchitectureView } from '../components/projects/ArchitectureView';
import { DemoSection } from '../components/projects/DemoSection';
import { ContributorCard } from '../components/projects/ContributorCard';
import { ProjectLinks } from '../components/projects/ProjectLinks';
import { ProjectCard } from '../components/projects/ProjectCard';
import { NotFoundPage } from '../components/common/NotFoundPage';
import { ErrorState } from '../components/common/ErrorState';
import {
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  BarChart3,
  TrendingUp,
  Compass,
  ArrowRight,
} from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchProjectData = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setErrorStatus(null);
      setErrorMessage(null);
      const data = await getProject(slug);
      setProject(data);
    } catch (err: any) {
      if (err instanceof ApiError) {
        setErrorStatus(err.status);
        setErrorMessage(err.message);
      } else {
        setErrorStatus(500);
        setErrorMessage(err?.message || 'Failed to load project details.');
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProjectData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchProjectData]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 animate-pulse">
        <div className="h-8 w-60 rounded bg-muted/60" />
        <div className="h-96 rounded-3xl bg-muted/50" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 rounded-2xl bg-muted/40" />
          <div className="h-64 rounded-2xl bg-muted/40" />
        </div>
      </div>
    );
  }

  // 47. 404 NOT FOUND HANDLING
  if (errorStatus === 404 || (!project && !loading && !errorMessage)) {
    return (
      <NotFoundPage
        title="Project Not Found"
        message="The project you're looking for doesn't exist or may have been removed."
        backUrl="/projects"
        backLabel="Back to Projects"
      />
    );
  }

  // GENERAL ERROR STATE
  if (errorStatus || !project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ErrorState
          title="Unable to load project"
          message={errorMessage || 'An error occurred while loading this project.'}
          status={errorStatus || undefined}
          onRetry={fetchProjectData}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* 31. PROJECT DETAIL HERO */}
      <DetailHero project={project} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* 42. ACTION LINKS (GitHub, Demo, Docs, Paper) */}
        {project.links && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border/80 shadow-sm">
            <div>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                Repository & Deployment
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                Explore project source code and live links
              </h3>
            </div>
            <ProjectLinks links={project.links} />
          </div>
        )}

        {/* 32. OVERVIEW (Strong editorial typography layout) */}
        <section className="space-y-4 max-w-4xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            Executive Summary
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Project Overview
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {project.overview}
          </p>
        </section>

        {/* 33. PROBLEM & 34. SOLUTION (Two-column contrasting block) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PROBLEM */}
          <div className="p-7 sm:p-8 rounded-3xl border border-destructive/20 bg-destructive/5 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-destructive/10 text-destructive">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">The Problem</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* SOLUTION */}
          <div className="p-7 sm:p-8 rounded-3xl border border-primary/30 bg-primary/5 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/15 text-primary">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Our Solution</h3>
            </div>
            <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
              {project.solution}
            </p>
          </div>
        </section>

        {/* 35. OBJECTIVES */}
        {project.objectives && project.objectives.length > 0 && (
          <section className="p-8 rounded-3xl border border-border/80 bg-card shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Core Objectives
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.objectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-muted/30 border border-border/40"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-foreground/90 leading-relaxed font-medium">
                    {obj}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 36. KEY FEATURES */}
        {project.features && project.features.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                Capabilities
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
                Key Features & Engineering Highlights
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-colors shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-foreground mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 37. TECHNOLOGY STACK */}
        {project.techStack && project.techStack.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                Frameworks & Models
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
                Technology Stack
              </h3>
            </div>

            <TechStack techStack={project.techStack} />
          </section>
        )}

        {/* 38. ARCHITECTURE */}
        {project.architecture && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                Technical Blueprint
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
                System Architecture & Workflow
              </h3>
            </div>

            <ArchitectureView architecture={project.architecture} />
          </section>
        )}

        {/* 40. DEMO (Embedded video or live simulator link) */}
        {project.demo && (
          <section className="space-y-4">
            <DemoSection demo={project.demo} />
          </section>
        )}

        {/* 39. SCREENSHOTS GALLERY */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                Interface Preview
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
                Project Screenshots
              </h3>
            </div>

            <Gallery screenshots={project.screenshots} />
          </section>
        )}

        {/* 43. RESULTS & OUTCOMES */}
        {project.results && project.results.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Results & Outcomes
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.results.map((res, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm"
                >
                  {res.metric && (
                    <div className="text-3xl font-black font-mono text-primary mb-1">
                      {res.metric}
                    </div>
                  )}
                  <div className="text-sm font-bold text-foreground">{res.label}</div>
                  {res.detail && (
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {res.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 44. FUTURE SCOPE */}
        {project.futureScope && project.futureScope.length > 0 && (
          <section className="p-8 rounded-3xl border border-border/80 bg-card shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-accent" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Future Scope & Roadmap
              </h3>
            </div>
            <ul className="space-y-3">
              {project.futureScope.map((scopeItem, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{scopeItem}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 41. CONTRIBUTORS */}
        {project.contributors && project.contributors.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                Project Creators
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
                Contributors & Mentors
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.contributors.map((contrib, idx) => (
                <ContributorCard key={idx} contributor={contrib} />
              ))}
            </div>
          </section>
        )}

        {/* 45. RELATED PROJECTS */}
        {project.relatedProjects && project.relatedProjects.length > 0 && (
          <section className="pt-8 border-t border-border/60 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Related Projects
              </h3>
              <Link
                to="/projects"
                className="text-xs sm:text-sm font-semibold text-primary hover:text-accent flex items-center gap-1"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.relatedProjects.map((rel) => (
                <ProjectCard key={rel.id} project={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
