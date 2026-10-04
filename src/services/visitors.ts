import { isMockMode, simulateDelay, apiClient } from './client';
import type { Visitor, GalleryItem } from '@/types';
import visitorsData from './mock-data/visitors.json';

const visitors = visitorsData.visitors as Visitor[];
const stats = visitorsData.stats;
const testimonials = visitorsData.testimonials;

export async function getVisitors(): Promise<{
  visitors: Visitor[];
  stats: {
    totalVisitors: number;
    countries: number;
    delegations: number;
    keynotes: number;
    labSessions: number;
    roundtables: number;
  };
  testimonials: Array<{ quote: string; author: string; role: string; photo: string }>;
}> {
  if (isMockMode()) {
    await simulateDelay();
    return { visitors, stats, testimonials };
  }
  const res = await apiClient.get<{ data: { visitors: Visitor[]; stats: any; testimonials: any[] } }>('/visitors');
  return res.data;
}

export async function getVisitorById(id: string): Promise<Visitor> {
  if (isMockMode()) {
    await simulateDelay();
    const visitor = visitors.find((v: Visitor) => v.id === id);
    if (!visitor) throw new Error('Visitor not found');
    return visitor;
  }
  const res = await apiClient.get<{ data: Visitor }>(`/visitors/${id}`);
  return res.data;
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (isMockMode()) {
    await simulateDelay();
    // Flatten gallery from all visitors
    return visitors.flatMap((v: Visitor) =>
      v.gallery.map((src, idx) => ({
        id: `${v.id}-${idx}`,
        src,
        title: `${v.name} - Gallery ${idx + 1}`,
        speaker: v.name,
        date: v.visitDate,
        badge: v.visitorType,
      }))
    );
  }
  const res = await apiClient.get<{ data: GalleryItem[] }>('/visitors/gallery');
  return res.data;
}