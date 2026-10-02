// src/types/index.ts

/** Generic list response returned by the API */
export interface ApiList<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

/** Standard error shape returned by the API */
export interface ApiError {
  message: string;
  code?: number;
}

/** Project resource */
export interface Project {
  id: number;
  slug: string;
  name: string;
  summary: string;
  description?: string;
}

/** Achievement resource */
export interface Achievement {
  id: number;
  name: string;
  year: number;
  description?: string;
}

/** Guest resource */
export interface Guest {
  id: number;
  name: string;
  role: string;
  bio?: string;
}

/** Member resource (club member) */
export interface Member {
  id: number;
  name: string;
  role: string; // e.g., "member", "admin"
  email: string;
}

/** User model – used for authentication */
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'member' | 'guest';
}
