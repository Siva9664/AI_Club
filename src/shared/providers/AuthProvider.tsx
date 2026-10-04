import React, { useState, useCallback } from 'react';
import { AuthContext } from './AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  avatar?: string;
}

// Mock credentials
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@club.test': {
    password: 'admin123',
    user: { id: '1', name: 'Club Admin', email: 'admin@club.test', role: 'admin' },
  },
  'member@club.test': {
    password: 'member123',
    user: { id: '2', name: 'Alex Rivera', email: 'member@club.test', role: 'member' },
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ai-club-auth');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          localStorage.removeItem('ai-club-auth');
        }
      }
    }
    return null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const record = MOCK_USERS[email];
    if (!record || record.password !== password) {
      throw new Error('Invalid email or password');
    }
    setUser(record.user);
    localStorage.setItem('ai-club-auth', JSON.stringify(record.user));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ai-club-auth');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading: false, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};