import { isMockMode, simulateDelay, apiClient } from './client';
import type {
  Achievement,
  AchievementQuery,
  AchievementStats,
  Ambassador,
  UpcomingCompetition,
} from '@/types';
import achievementsData from './mock-data/achievements.json';

const achievements = achievementsData.achievements as Achievement[];
const featured = achievementsData.featured as Achievement[];
const ambassadors = achievementsData.ambassadors as Ambassador[];
const upcomingCompetitions = achievementsData.upcomingCompetitions as UpcomingCompetition[];
const stats = achievementsData.stats as AchievementStats;
const years = achievementsData.years as number[];

export interface AchievementsBundle {
  achievements: Achievement[];
  featured: Achievement[];
  ambassadors: Ambassador[];
  upcomingCompetitions: UpcomingCompetition[];
  stats: AchievementStats;
  years: number[];
}

/**
 * Single entry point used by the page. In mock mode the filters are applied
 * in-memory exactly like achievement.html's getAchievements() did.
 */
export async function getAchievementsBundle(
  query: AchievementQuery = {}
): Promise<AchievementsBundle> {
  if (isMockMode()) {
    await simulateDelay();
    return {
      achievements: filterAchievements(query),
      featured,
      ambassadors,
      upcomingCompetitions,
      stats,
      years,
    };
  }
  const res = await apiClient.get<{ data: AchievementsBundle }>(
    '/achievements',
    query as Record<string, unknown>
  );
  return res.data;
}

function filterAchievements(query: AchievementQuery): Achievement[] {
  let results = [...achievements];

  if (query.category && query.category !== 'all') {
    results = results.filter((item) => item.category === query.category);
  }
  if (query.year && query.year !== 'all') {
    results = results.filter((item) => item.year === query.year);
  }
  if (query.featured === true) {
    results = results.filter((item) => item.featured === true);
  }
  const q = query.q?.toLowerCase().trim();
  if (q) {
    results = results.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      (item.summary ?? '').toLowerCase().includes(q) ||
      item.recipient.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.metric ?? '').toLowerCase().includes(q)
    );
  }
  return results;
}

export async function getAchievements(): Promise<Achievement[]> {
  if (isMockMode()) {
    await simulateDelay();
    return achievements;
  }
  const res = await apiClient.get<{ data: Achievement[] }>('/achievements');
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

export async function getAchievementStats(): Promise<AchievementStats> {
  if (isMockMode()) {
    await simulateDelay();
    return stats;
  }
  const res = await apiClient.get<{ data: AchievementStats }>('/achievements/stats');
  return res.data;
}