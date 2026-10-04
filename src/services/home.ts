import { isMockMode, simulateDelay, apiClient } from './client';
import type { ClubApiResponse } from '@/types';
import homeData from './mock-data/home.json';

export async function getHome(): Promise<ClubApiResponse> {
  if (isMockMode()) {
    await simulateDelay();
    return homeData as unknown as ClubApiResponse;
  }
  const res = await apiClient.get<ClubApiResponse>('/home');
  return res;
}