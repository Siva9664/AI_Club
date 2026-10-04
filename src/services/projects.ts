import { apiClient } from './client';
import type { ProjectDetail, ProjectSummary, ProjectFilterMeta, ProjectQueryParams } from '@/types';

const MOCK_BASE_URL = '/mock-data';

export async function getProjects(params?: ProjectQueryParams): Promise<{ data: ProjectSummary[]; meta: any }> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const res = await fetch(`${MOCK_BASE_URL}/projects.json`);
    const data = await res.json();
    let filtered = data.projects;

    if (params?.category && params.category !== 'All') {
      filtered = filtered.filter((p: ProjectSummary) => p.category === params.category);
    }
    if (params?.tag) {
      filtered = filtered.filter((p: ProjectSummary) => p.tags.includes(params.tag!));
    }
    if (params?.featured) {
      filtered = filtered.filter((p: ProjectSummary) => p.featured);
    }
    if (params?.q) {
      const q = params.q.toLowerCase();
      filtered = filtered.filter((p: ProjectSummary) =>
        p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
      );
    }

    return { data: filtered, meta: { page: 1, limit: filtered.length, total: filtered.length, totalPages: 1 } };
  }
  const res = await apiClient.get<{ data: ProjectSummary[]; meta: any }>('/projects', params);
  return res;
}

export async function getProject(slug: string): Promise<ProjectDetail> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const res = await fetch(`${MOCK_BASE_URL}/projects.json`);
    const data = await res.json();
    const project = data.projects.find((p: ProjectDetail) => p.slug === slug);
    if (!project) throw new Error('Project not found');
    return project;
  }
  const res = await apiClient.get<{ data: ProjectDetail }>(`/projects/${slug}`);
  return res.data;
}

export async function getProjectFilterMeta(): Promise<ProjectFilterMeta> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const res = await fetch(`${MOCK_BASE_URL}/projects.json`);
    const data: { projects: ProjectDetail[] } = await res.json();
    const categories: string[] = [...new Set(data.projects.map((p: ProjectDetail) => p.category).filter(Boolean))] as string[];
    const tags: string[] = [...new Set(data.projects.flatMap((p: ProjectDetail) => (p.tags as string[])))].sort();
    return { categories: categories.sort(), tags, statuses: ['draft', 'pending', 'approved', 'rejected'] };
  }
  const res = await apiClient.get<ProjectFilterMeta>('/projects/meta');
  return res;
}