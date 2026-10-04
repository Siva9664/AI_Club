import { apiClient } from './client';
import type { Visitor, GalleryItem } from '@/types';

const MOCK_BASE_URL = '/mock-data';

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
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const res = await fetch(`${MOCK_BASE_URL}/visitors.json`);
    return res.json();
  }
  const res = await apiClient.get<{ data: { visitors: Visitor[]; stats: any; testimonials: any[] } }>('/visitors');
  return res.data;
}

export async function getVisitorById(id: string): Promise<Visitor> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const res = await fetch(`${MOCK_BASE_URL}/visitors.json`);
    const data = await res.json();
    const visitor = data.visitors.find((v: Visitor) => v.id === id);
    if (!visitor) throw new Error('Visitor not found');
    return visitor;
  }
  const res = await apiClient.get<{ data: Visitor }>(`/visitors/${id}`);
  return res.data;
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const res = await fetch(`${MOCK_BASE_URL}/visitors.json`);
    const data = await res.json();
    // Flatten gallery from all visitors
    return data.visitors.flatMap((v: Visitor) =>
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