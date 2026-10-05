import { isMockMode, simulateDelay, apiClient, ApiError } from './client';
import type { ProjectDetail, ProjectSummary, ProjectFilterMeta, ProjectQueryParams } from '@/types';
import projectsData from './mock-data/projects.json';

const allProjects = projectsData as ProjectDetail[];

export async function getProjects(params?: ProjectQueryParams): Promise<{ data: ProjectSummary[]; meta: any }> {
  if (isMockMode()) {
    await simulateDelay();
    let filtered = allProjects;

    if (params?.category && params.category !== 'All') {
      filtered = filtered.filter((p: ProjectDetail) => p.category === params.category);
    }
    if (params?.tag) {
      filtered = filtered.filter((p: ProjectDetail) => p.tags.includes(params.tag!));
    }
    if (params?.featured) {
      filtered = filtered.filter((p: ProjectDetail) => p.featured);
    }
    if (params?.q) {
      const q = params.q.toLowerCase();
      filtered = filtered.filter((p: ProjectDetail) =>
        p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
      );
    }

    return { data: filtered as ProjectSummary[], meta: { page: 1, limit: filtered.length, total: filtered.length, totalPages: 1 } };
  }
  const res = await apiClient.get<{ data: ProjectSummary[]; meta: any }>('/projects', params);
  return res;
}

export async function getProject(slug: string): Promise<ProjectDetail> {
  if (isMockMode()) {
    await simulateDelay();
    const project = allProjects.find((p: ProjectDetail) => p.slug === slug);
    if (!project) throw new ApiError('Project not found', 404);
    return project;
  }
  const res = await apiClient.get<{ data: ProjectDetail }>(`/projects/${slug}`);
  return res.data;
}

export async function getProjectFilterMeta(): Promise<ProjectFilterMeta> {
  if (isMockMode()) {
    await simulateDelay();
    const categories: string[] = [...new Set(allProjects.map((p: ProjectDetail) => p.category).filter(Boolean))] as string[];
    const tags: string[] = [...new Set(allProjects.flatMap((p: ProjectDetail) => (p.tags as string[])))].sort();
    return { categories: categories.sort(), tags, statuses: ['draft', 'pending', 'approved', 'rejected'] };
  }
  const res = await apiClient.get<ProjectFilterMeta>('/projects/meta');
  return res;
}