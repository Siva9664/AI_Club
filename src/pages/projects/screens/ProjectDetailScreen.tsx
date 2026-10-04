import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '@/services/projects';
import { ApiError } from '@/services/client';
import type { ProjectDetail as ProjectDetailType } from '@/types';
import { DetailHero } from '../components/DetailHero';
import { TechStack } from '../components/TechStack';
import { Gallery } from '../components/Gallery';
import { ArchitectureView } from '../components/ArchitectureView';
import { DemoSection } from '../components/DemoSection';
import { ContributorCard } from '../components/ContributorCard';
import { ProjectLinks } from '../components/ProjectLinks';
import { ProjectCard } from '../components/ProjectCard';
import { NotFoundPage } from '@/shared/ui/NotFoundPage';
import { ErrorState } from '@/shared/ui/ErrorState';
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
          <div className="glass-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white/75 dark:bg-slate-900/75 border border-white/85 dark:border-white/10 shadow-lg backdrop-blur-xl">
            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
                Repository & Deployment
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Explore project source code and live links
              </h3>
            </div>
            <ProjectLinks links={project.links} />
          </div>
        )}

        {/* 32. OVERVIEW (Strong editorial typography layout) */}
        <section className="space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20">
            Executive Summary
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Project Overview
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {project.overview}
          </p>
        </section>

        {/* 33. PROBLEM & 34. SOLUTION (Two-column contrasting block) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PROBLEM */}
          <div className="glass-card p-7 sm:p-8 rounded-3xl border border-rose-200/80 dark:border-rose-900/30 bg-rose-50/70 dark:bg-rose-950/20 backdrop-blur-xl shadow-md relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">The Problem</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* SOLUTION */}
          <div className="glass-card p-7 sm:p-8 rounded-3xl border border-blue-200/80 dark:border-blue-900/30 bg-blue-50/70 dark:bg-blue-950/20 backdrop-blur-xl shadow-md relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Solution</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
              {project.solution}
            </p>
          </div>
        </section>

        {/* 35. OBJECTIVES */}
        {project.objectives && project.objectives.length > 0 && (
          <section className="glass-card p-8 rounded-3xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 shadow-lg backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Core Objectives
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.objectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-white/10 shadow-2xs backdrop-blur-md"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
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
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20">
                Capabilities
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Key Features & Engineering Highlights
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 hover:bg-white/95 dark:hover:bg-slate-800/90 backdrop-blur-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 shadow-2xs">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Results & Outcomes
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.results.map((res, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-md hover:shadow-lg transition-all"
                >
                  {res.metric && (
                    <div className="text-3xl font-black font-mono text-blue-600 dark:text-blue-400 mb-1">
                      {res.metric}
                    </div>
                  )}
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{res.label}</div>
                  {res.detail && (
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
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
          <section className="glass-card p-8 rounded-3xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Future Scope & Roadmap
              </h3>
            </div>
            <ul className="space-y-3">
              {project.futureScope.map((scopeItem, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
                  <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
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
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20">
                Project Creators
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
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
          <section className="pt-8 border-t border-white/80 dark:border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Related Projects
              </h3>
              <Link
                to="/projects"
                className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
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
