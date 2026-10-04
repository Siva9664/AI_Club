import React, { useEffect, useState, useCallback } from 'react';
import { getProjects, getProjectFilterMeta } from '@/services/projects';
import type {
  PaginatedResponse,
  ProjectFilterMeta,
  ProjectQueryParams,
  ProjectSummary,
} from '@/types';
import { ProjectCard } from '../components/ProjectCard';
import { FilterToolbar } from '../components/FilterToolbar';
import { Pagination } from '../components/Pagination';
import { LoadingState } from '@/shared/ui/LoadingState';
import { EmptyState } from '@/shared/ui/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { CinematicVideoBackground } from '@/shared/ui/CinematicVideoBackground';
import { Sparkles, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Projects: React.FC = () => {
  // State for all projects
  const [projectsData, setProjectsData] = useState<PaginatedResponse<ProjectSummary> | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<ProjectSummary[]>([]);
  const [filterMeta, setFilterMeta] = useState<ProjectFilterMeta | null>(null);

  // Filter & Query state
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [tag, setTag] = useState('All');
  const [page, setPage] = useState(1);

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch filter metadata once on mount
  useEffect(() => {
    let isMounted = true;
    getProjectFilterMeta()
      .then((meta) => {
        if (isMounted) setFilterMeta(meta);
      })
      .catch((err: Error) => {
        console.error('Failed to load filter metadata:', err);
      });

    // Also fetch featured projects for the top showcase
    getProjects({ featured: true, limit: 3 })
      .then((res) => {
        if (isMounted) setFeaturedProjects(res.data);
      })
      .catch((err) => {
        console.error('Failed to load featured projects:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch projects list based on current filters and pagination
  const loadProjectList = useCallback(async () => {
    let isMounted = true;
    try {
      setError(null);
      setLoading(true);

      const params: ProjectQueryParams = {
        page,
        limit: 12,
        sort: 'newest',
      };

      if (query.trim()) params.q = query.trim();
      if (category && category !== 'All') params.category = category;
      if (status && status !== 'All') params.status = status;
      if (tag && tag !== 'All') params.tag = tag;

      const res = await getProjects(params);
      if (isMounted) {
        setProjectsData(res);
      }
    } catch (err: any) {
      if (isMounted) {
        setError(err?.message || 'Something went wrong while loading the projects.');
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
    return () => { isMounted = false; };
  }, [page, query, category, status, tag]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps -- loadProjectList sets state internally, this is the standard data fetching pattern
    loadProjectList();
  }, [loadProjectList]);

  // Handler for reset / clear
  const handleClearFilters = () => {
    setQuery('');
    setCategory('All');
    setStatus('All');
    setTag('All');
    setPage(1);
  };

  const isFiltered = query !== '' || category !== 'All' || status !== 'All' || tag !== 'All';

  return (
    <div className="min-h-screen pb-20 relative">
      {/* 19. CINEMATIC PROJECT PAGE HERO */}
      <CinematicVideoBackground
        videoSources={[
          {
            src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b4/Attention-animated.webm/Attention-animated.webm.1080p.vp9.webm',
            type: 'video/webm',
          },
          {
            src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b4/Attention-animated.webm/Attention-animated.webm.480p.vp9.webm',
            type: 'video/webm',
          },
          {
            src: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Attention-animated.webm',
            type: 'video/webm',
          },
        ]}
        badgeLabel="TRANSFORMER ATTENTION MECHANISM • MULTI-HEAD ATTENTION"
        posterSrc="/images/ai-quantum-tensor.svg"
        className="py-14 md:py-20 border-b border-white/10"
        overlayClassName="bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/90"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide uppercase bg-slate-900/60 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-4 backdrop-blur-xl">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Innovation Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-md">
            Club Projects &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Frontier Systems
            </span>
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-200/90 max-w-2xl leading-relaxed font-normal">
            Explore the deployed architectures, open models, and neural systems developed by our student researchers. From multimodal LLMs to edge vision and autonomous robotics.
          </p>
        </div>
      </CinematicVideoBackground>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* 20. FEATURED PROJECTS SHOWCASE (Only when not filtering) */}
        {!isFiltered && featuredProjects.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Featured Highlights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={`featured-${project.id}`} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* 21. FILTER & SEARCH TOOLBAR */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {isFiltered ? 'Filtered Results' : 'All Projects'}
            </h2>
            {projectsData && (
              <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 border border-white dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-300 shadow-xs backdrop-blur-md font-semibold">
                Total: {projectsData.meta.total}
              </span>
            )}
          </div>

          <FilterToolbar
            searchQuery={query}
            onSearchChange={(q) => {
              setQuery(q);
              setPage(1);
            }}
            selectedCategory={category}
            onCategoryChange={(cat) => {
              setCategory(cat);
              setPage(1);
            }}
            selectedStatus={status}
            onStatusChange={(st) => {
              setStatus(st);
              setPage(1);
            }}
            selectedTag={tag}
            onTagChange={(t) => {
              setTag(t);
              setPage(1);
            }}
            meta={filterMeta}
            onReset={handleClearFilters}
            isFiltered={isFiltered}
          />
        </section>

        {/* 29. LOADING STATE */}
        {loading && <LoadingState count={6} />}

        {/* 28. ERROR STATE */}
        {!loading && error && (
          <ErrorState
            title="Unable to load projects"
            message={error}
            onRetry={loadProjectList}
          />
        )}

        {/* 27. EMPTY STATE */}
        {!loading && !error && projectsData && projectsData.data.length === 0 && (
          <EmptyState
            title="No projects found"
            message="Try changing your search or filters to discover other club projects."
            onClear={handleClearFilters}
            actionLabel="Clear Filters"
          />
        )}

        {/* 23. PROJECT GRID WITH MOVING & DISAPPEARING ANIMATION */}
        {!loading && !error && projectsData && projectsData.data.length > 0 && (
          <section>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {projectsData.data.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 25, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.88, y: -25, filter: 'blur(6px)' }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(idx * 0.04, 0.2),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* 26. PROJECT PAGINATION */}
            <Pagination
              meta={projectsData.meta}
              onPageChange={(newPage) => {
                setPage(newPage);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            />
          </section>
        )}
      </div>
    </div>
  );
};
