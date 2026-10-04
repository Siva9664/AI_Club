import { apiClient } from './client';
import type { ContactPayload } from '@/types';

export async function sendContactMessage(payload: ContactPayload): Promise<{ success: boolean; message: string }> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: 'Message sent successfully! We will get back to you soon.' };
  }
  const res = await apiClient.post<{ success: boolean; message: string }>('/contact', payload);
  return res;
}