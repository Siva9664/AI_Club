import { ApiError, apiClientGet, isMockMode, simulateDelay } from './client';
import type {
  PaginatedResponse,
  ProjectDetail,
  ProjectFilterMeta,
  ProjectQueryParams,
  ProjectSummary,
} from '../types';
import mockProjectsData from '../data/projects.json';

/**
 * Fetches paginated and filtered list of projects
 */
export async function getProjects(params: ProjectQueryParams = {}): Promise<PaginatedResponse<ProjectSummary>> {
  if (isMockMode()) {
    await simulateDelay(260);

    const {
      page = 1,
      limit = 12,
      sort = 'newest',
      category,
      status,
      tag,
      q,
      featured,
    } = params;

    // Enforce API limits
    const safeLimit = Math.min(Math.max(1, limit), 50);
    const safePage = Math.max(1, page);

    let results = [...(mockProjectsData as unknown as ProjectDetail[])];

    // Search query filter (q)
    if (q && q.trim()) {
      const query = q.trim().toLowerCase();
      results = results.filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(query);
        const summaryMatch = p.summary.toLowerCase().includes(query);
        const tagMatch = p.tags.some((t) => t.toLowerCase().includes(query));
        const catMatch = p.category.toLowerCase().includes(query);
        return titleMatch || summaryMatch || tagMatch || catMatch;
      });
    }

    // Category filter
    if (category && category !== 'All') {
      results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    // Status filter
    if (status && status !== 'All') {
      results = results.filter((p) => p.status.toLowerCase() === status.toLowerCase());
    }

    // Tag filter
    if (tag && tag !== 'All') {
      results = results.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
    }

    // Featured filter
    if (featured !== undefined) {
      results = results.filter((p) => p.featured === Boolean(featured));
    }

    // Sorting
    if (sort === 'title') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'oldest') {
      results.sort((a, b) => (a.startedOn || '').localeCompare(b.startedOn || ''));
    } else {
      // default newest: proj-008, proj-007, etc. or reverse order of array
      results.sort((a, b) => b.id.localeCompare(a.id));
    }

    const total = results.length;
    const totalPages = Math.ceil(total / safeLimit) || 1;
    const startIndex = (safePage - 1) * safeLimit;
    const paginatedItems = results.slice(startIndex, startIndex + safeLimit);

    // Map to ProjectSummary shape
    const data: ProjectSummary[] = paginatedItems.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      thumbnail: p.thumbnail,
      tags: p.tags,
      category: p.category,
      status: p.status,
      featured: p.featured,
      team: p.team,
    }));

    return {
      data,
      meta: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages,
      },
    };
  }

  return apiClientGet<PaginatedResponse<ProjectSummary>>('/projects', params);
}

/**
 * Fetches metadata for project discovery filters (categories, statuses, tags)
 */
export async function getProjectMeta(): Promise<ProjectFilterMeta> {
  if (isMockMode()) {
    await simulateDelay(150);

    const categories = Array.from(
      new Set(mockProjectsData.map((p) => p.category))
    ).sort();

    const statuses = Array.from(
      new Set(mockProjectsData.map((p) => p.status))
    ).sort();

    const allTags = mockProjectsData.flatMap((p) => p.tags);
    const tags = Array.from(new Set(allTags)).sort();

    return {
      categories: ['All', ...categories],
      statuses: ['All', ...statuses],
      tags: ['All', ...tags],
    };
  }

  return apiClientGet<ProjectFilterMeta>('/projects/meta');
}

/**
 * Fetches a single project by URL-safe slug
 */
export async function getProject(slug: string): Promise<ProjectDetail> {
  if (isMockMode()) {
    await simulateDelay(240);

    const found = mockProjectsData.find(
      (p) => p.slug.toLowerCase() === slug.toLowerCase()
    );

    if (!found) {
      throw new ApiError('Project not found', 404, { slug });
    }

    return found as unknown as ProjectDetail;
  }

  return apiClientGet<ProjectDetail>(`/projects/${encodeURIComponent(slug)}`);
}
