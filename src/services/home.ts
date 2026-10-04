import { apiClient } from './client';
import type { ClubApiResponse } from '@/types';

export async function getHome(): Promise<ClubApiResponse> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const res = await fetch('/mock-data/home.json');
    return res.json();
  }
  const res = await apiClient.get<ClubApiResponse>('/home');
  return res;
}