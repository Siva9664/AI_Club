import React, { useEffect, useState, useCallback } from 'react';
import { getProjects, getProjectMeta } from '../api/projects';
import type {
  PaginatedResponse,
  ProjectFilterMeta,
  ProjectQueryParams,
  ProjectSummary,
} from '../types';
import { ProjectCard } from '../components/projects/ProjectCard';
import { FilterToolbar } from '../components/projects/FilterToolbar';
import { Pagination } from '../components/projects/Pagination';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { Sparkles, Layers } from 'lucide-react';

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
    getProjectMeta()
      .then((meta) => {
        if (isMounted) setFilterMeta(meta);
      })
      .catch((err) => {
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
  const fetchProjectList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

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
      setProjectsData(res);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong while loading the projects.');
    } finally {
      setLoading(false);
    }
  }, [page, query, category, status, tag]);

  useEffect(() => {
    fetchProjectList();
  }, [fetchProjectList]);

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
    <div className="min-h-screen pb-20">
      {/* 19. PROJECT PAGE HERO */}
      <section className="relative py-12 md:py-16 border-b border-border/50 overflow-hidden">
        {/* Subtle AI background visual */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute inset-0 ai-grid-pattern opacity-25 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>AI Innovation Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Club Projects
          </h1>

          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">
            Explore the ideas, experiments and AI solutions built by our community. From computer vision to agentic LLMs and edge robotics.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* 20. FEATURED PROJECTS SHOWCASE (Only when not filtering) */}
        {!isFiltered && featuredProjects.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
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
            <h2 className="text-xl font-bold text-foreground">
              {isFiltered ? 'Filtered Results' : 'All Projects'}
            </h2>
            {projectsData && (
              <span className="text-xs font-mono text-muted-foreground">
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
            onRetry={fetchProjectList}
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

        {/* 23. PROJECT GRID */}
        {!loading && !error && projectsData && projectsData.data.length > 0 && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projectsData.data.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

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
