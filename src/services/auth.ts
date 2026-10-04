import { apiClient } from './client';
import type { User, LoginCredentials, RegisterData } from '@/types';

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    // Mock is handled by AuthContext
    throw new Error('Use AuthContext for mock login');
  }
  const res = await apiClient.post<User>('/auth/login', credentials);
  return res;
}

export async function registerUser(data: RegisterData): Promise<User> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    throw new Error('Use AuthContext for mock register');
  }
  const res = await apiClient.post<User>('/auth/register', data);
  return res;
}

export async function getCurrentUser(): Promise<User> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    throw new Error('Use AuthContext for mock user');
  }
  const res = await apiClient.get<User>('/auth/me');
  return res;
}

export async function logoutUser(): Promise<void> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    throw new Error('Use AuthContext for mock logout');
  }
  await apiClient.post('/auth/logout', {});
}

export async function refreshToken(): Promise<string> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    return 'mock-token';
  }
  const res = await apiClient.post<{ token: string }>('/auth/refresh', {});
  return res.token;
}