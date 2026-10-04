import { apiClientGet, isMockMode, simulateDelay } from './client';
import type { Activity, ClubApiResponse, Facility, HomeApiResponse } from '@/types';
import mockHomeData from './mock-data/home.json';

/**
 * Fetches complete homepage data payload
 */
export async function getHome(): Promise<HomeApiResponse> {
  if (isMockMode()) {
    await simulateDelay(280);
    return mockHomeData as unknown as HomeApiResponse;
  }
  return apiClientGet<HomeApiResponse>('/home');
}

/**
 * Fetches general club metadata and contact info
 */
export async function getClub(): Promise<ClubApiResponse> {
  if (isMockMode()) {
    await simulateDelay(200);
    return {
      name: 'SIET AI Club',
      institution: 'Sri Shakthi Institute of Engineering and Technology',
      tagline: 'Building the Next Generation of AI Engineers',
      contact: mockHomeData.contact,
      activities: mockHomeData.activities as Activity[],
      facilities: mockHomeData.facilities as Facility[],
    };
  }
  return apiClientGet<ClubApiResponse>('/club');
}

/**
 * Fetches club activity streams
 */
export async function getActivities(): Promise<Activity[]> {
  if (isMockMode()) {
    await simulateDelay(180);
    return mockHomeData.activities as Activity[];
  }
  return apiClientGet<Activity[]>('/club/activities');
}

/**
 * Fetches club laboratory and computing facilities
 */
export async function getFacilities(): Promise<Facility[]> {
  if (isMockMode()) {
    await simulateDelay(180);
    return mockHomeData.facilities as Facility[];
  }
  return apiClientGet<Facility[]>('/club/facilities');
}
