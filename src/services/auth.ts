import { isMockMode, simulateDelay, apiClient } from './client';
import type { User, LoginCredentials, RegisterData } from '@/types';

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@club.test': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@club.test',
      name: 'Admin User',
      role: 'admin',
      avatar: '',
      createdAt: new Date().toISOString(),
    },
  },
  'member@club.test': {
    password: 'member123',
    user: {
      id: '2',
      email: 'member@club.test',
      name: 'Member User',
      role: 'member',
      avatar: '',
      createdAt: new Date().toISOString(),
    },
  },
};

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  if (isMockMode()) {
    await simulateDelay();
    const mockUser = MOCK_USERS[credentials.email];
    if (!mockUser || mockUser.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }
    return mockUser.user;
  }
  const res = await apiClient.post<User>('/auth/login', credentials);
  return res;
}

export async function registerUser(data: RegisterData): Promise<User> {
  if (isMockMode()) {
    await simulateDelay();
    if (MOCK_USERS[data.email]) {
      throw new Error('Email already registered');
    }
    const newUser: User = {
      id: String(Date.now()),
      email: data.email,
      name: data.name,
      role: 'member',
      avatar: '',
      createdAt: new Date().toISOString(),
    };
    MOCK_USERS[data.email] = { password: data.password, user: newUser };
    return newUser;
  }
  const res = await apiClient.post<User>('/auth/register', data);
  return res;
}

export async function getCurrentUser(): Promise<User> {
  if (isMockMode()) {
    await simulateDelay();
    // In mock mode, we return the user from localStorage/session
    // This is handled by AuthProvider
    throw new Error('Use AuthContext for current user in mock mode');
  }
  const res = await apiClient.get<User>('/auth/me');
  return res;
}

export async function logoutUser(): Promise<void> {
  if (isMockMode()) {
    await simulateDelay();
    return;
  }
  await apiClient.post('/auth/logout', {});
}

export async function refreshToken(): Promise<string> {
  if (isMockMode()) {
    return 'mock-token';
  }
  const res = await apiClient.post<{ token: string }>('/auth/refresh', {});
  return res.token;
}