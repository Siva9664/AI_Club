import { isMockMode, simulateDelay, apiClient } from './client';
import type { Achievement, Ambassador, UpcomingCompetition } from '@/types';
import achievementsData from './mock-data/achievements.json';

const achievements = achievementsData.achievements as Achievement[];
const featured = achievementsData.featured as Achievement[];
const ambassadors = achievementsData.ambassadors as Ambassador[];
const upcomingCompetitions = achievementsData.upcomingCompetitions as UpcomingCompetition[];

export async function getAchievements(): Promise<{
  achievements: Achievement[];
  featured: Achievement[];
  ambassadors: Ambassador[];
  upcomingCompetitions: UpcomingCompetition[];
}> {
  if (isMockMode()) {
    await simulateDelay();
    return { achievements, featured, ambassadors, upcomingCompetitions };
  }
  const res = await apiClient.get<{ data: { achievements: Achievement[]; featured: Achievement[]; ambassadors: Ambassador[]; upcomingCompetitions: UpcomingCompetition[] } }>('/achievements');
  return res.data;
}

export async function getAchievementById(id: string): Promise<Achievement> {
  if (isMockMode()) {
    await simulateDelay();
    const achievement = achievements.find((a: Achievement) => a.id === id);
    if (!achievement) throw new Error('Achievement not found');
    return achievement;
  }
  const res = await apiClient.get<{ data: Achievement }>(`/achievements/${id}`);
  return res.data;
}

export async function getAmbassadors(): Promise<Ambassador[]> {
  if (isMockMode()) {
    await simulateDelay();
    return ambassadors;
  }
  const res = await apiClient.get<{ data: Ambassador[] }>('/achievements/ambassadors');
  return res.data;
}

export async function getUpcomingCompetitions(): Promise<UpcomingCompetition[]> {
  if (isMockMode()) {
    await simulateDelay();
    return upcomingCompetitions;
  }
  const res = await apiClient.get<{ data: UpcomingCompetition[] }>(`/achievements/competitions`);
  return res.data;
}