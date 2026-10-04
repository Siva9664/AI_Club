import { apiClient } from './client';
import type { Achievement, Ambassador, UpcomingCompetition } from '@/types';

const MOCK_BASE_URL = '/mock-data';

export async function getAchievements(): Promise<{
  achievements: Achievement[];
  featured: Achievement[];
  ambassadors: Ambassador[];
  upcomingCompetitions: UpcomingCompetition[];
}> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const res = await fetch(`${MOCK_BASE_URL}/achievements.json`);
    return res.json();
  }
  const res = await apiClient.get<{ data: { achievements: Achievement[]; featured: Achievement[]; ambassadors: Ambassador[]; upcomingCompetitions: UpcomingCompetition[] } }>('/achievements');
  return res.data;
}

export async function getAchievementById(id: string): Promise<Achievement> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const res = await fetch(`${MOCK_BASE_URL}/achievements.json`);
    const data = await res.json();
    const achievement = data.achievements.find((a: Achievement) => a.id === id);
    if (!achievement) throw new Error('Achievement not found');
    return achievement;
  }
  const res = await apiClient.get<{ data: Achievement }>(`/achievements/${id}`);
  return res.data;
}

export async function getAmbassadors(): Promise<Ambassador[]> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const res = await fetch(`${MOCK_BASE_URL}/achievements.json`);
    const data = await res.json();
    return data.ambassadors;
  }
  const res = await apiClient.get<{ data: Ambassador[] }>('/achievements/ambassadors');
  return res.data;
}

export async function getUpcomingCompetitions(): Promise<UpcomingCompetition[]> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const res = await fetch(`${MOCK_BASE_URL}/achievements.json`);
    const data = await res.json();
    return data.upcomingCompetitions;
  }
  const res = await apiClient.get<{ data: UpcomingCompetition[] }>('/achievements/competitions');
  return res.data;
}