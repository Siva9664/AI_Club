import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const stored = localStorage.getItem('ai-club-auth');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('ai-club-auth');
      }
    }
    setIsLoading(false);
  }, []);

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
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};