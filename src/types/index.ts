/**
 * Shared type definitions for AI Club frontend
 */

// Base types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface TechStackItem {
  name: string;
  category: string;
  icon?: string;
}

// Alias for backward compatibility
export type Image = ImageAsset;
export type TechItem = TechStackItem;
export type Person = Contributor;
export type Links = ProjectLinks;
export type ArchitectureInfo = ProjectArchitecture;
export type DemoInfo = ProjectDemo;
export type PaginationMeta = PaginatedResponse<any>['meta'];

// Home page types
export interface Hero {
  smallLabel: string;
  headline: string;
  supportingText: string;
  primaryCta: { label: string; url: string };
  secondaryCta: { label: string; url: string };
  badge: string;
  stats: Array<{ label: string; value: string }>;
}

export interface Overview {
  about: string;
  scope: string[];
  aim: string;
  goals: string[];
}

export interface Activity {
  id: string;
  title: string;
  summary: string;
  icon: string;
  category: string;
  link: string;
}

export interface Facility {
  id: string;
  title: string;
  summary: string;
  image: ImageAsset;
  specs: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  timing?: string;
  type: string;
  summary: string;
  status: 'upcoming' | 'completed';
  image?: ImageAsset;
  location?: string;
  action?: {
    label: string;
    url: string;
  };
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  labLocation: string;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

export interface ClubApiResponse {
  hero: Hero;
  overview: Overview;
  activities: Activity[];
  featuredProjects: ProjectSummary[];
  featuredAchievements: Achievement[];
  upcomingEvents: Event[];
  recentEvents: Event[];
  facilities: Facility[];
  contact: ContactInfo;
}

// Alias for backward compatibility
export type HomeApiResponse = ClubApiResponse;

// Achievement types
export interface Achievement extends BaseEntity {
  title: string;
  category: 'hackathon' | 'competition' | 'collaboration' | 'certificate';
  date: string;
  year: number;
  description: string;
  image?: ImageAsset;
  recipient: string;
  organization?: string;
  tags: string[];
  featured: boolean;
  proofUrl?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  priority: number;
  summary?: string;
}

export interface Ambassador {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: ImageAsset;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface UpcomingCompetition {
  id: string;
  title: string;
  date: string;
  type: string;
  summary: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  image?: ImageAsset;
  location?: string;
  action?: {
    label: string;
    url: string;
  };
}

// Visitor types
export interface Visitor extends BaseEntity {
  name: string;
  role: string;
  organization: string;
  bio?: string;
  topic?: string;
  photo: ImageAsset;
  visitDate: string;
  year: number;
  visitorType: 'Collaborator' | 'Industry Expert' | 'Academic' | 'Alumni' | 'Guest Speaker';
  summary: string;
  description: string;
  delegates: Delegate[];
  delegationNote?: string;
  quote?: string;
  quoteAuthor?: string;
  tags: string[];
  gallery: string[];
  location?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  priority: number;
  featured: boolean;
}

export interface Delegate {
  name: string;
  role: string;
  affiliation: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  speaker: string;
  date: string;
  badge: string;
  category?: string;
  location?: string;
  caption?: string;
}

// Chatbot types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface FAQEntry {
  category: string;
  question: string;
  answer: string;
}

// Auth types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  avatar?: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

// Contact types
export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  message: string;
}

// Project types
export interface ProjectSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  thumbnail?: ImageAsset;
  tags: string[];
  category: string;
  status: string;
  featured: boolean;
  team?: string;
}

export interface ProjectDetail extends BaseEntity {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  category?: string;
  tags: string[];
  thumbnail?: ImageAsset;
  team?: string;
  projectLinks?: Record<string, string>;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  priority: number;
  featured: boolean;
  rejectionReason?: string;
  heroImage?: ImageAsset;
  overview?: string;
  problem?: string;
  solution?: string;
  objectives?: string[];
  features?: ProjectFeature[];
  techStack?: TechStackItem[];
  architecture?: ProjectArchitecture;
  screenshots?: ImageAsset[];
  demo?: ProjectDemo;
  contributors?: Contributor[];
  links?: ProjectLinks;
  results?: ProjectResult[];
  futureScope?: string[];
  relatedProjects?: RelatedProject[];
  startedOn?: string;
  completedOn?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProjectArchitecture {
  image: ImageAsset;
  caption: string;
  description: string;
}

export interface ProjectDemo {
  type: 'link' | 'embed' | 'video';
  url: string;
  label: string;
}

export interface Contributor {
  name: string;
  role: string;
  photo: ImageAsset;
  github?: string;
  linkedin?: string;
  profileLink?: string;
  skills?: string[];
  contribution?: string;
}

export interface ProjectLinks {
  github?: string;
  liveDemo?: string;
  documentation?: string;
  paper?: string;
}

export interface ProjectResult {
  metric: string;
  label: string;
  detail: string;
}

export interface RelatedProject {
  id: string;
  slug: string;
  title: string;
  summary: string;
  thumbnail: ImageAsset;
  tags: string[];
  category: string;
  status: string;
  featured: boolean;
}

// Project filter types
export interface ProjectFilterMeta {
  categories: string[];
  tags: string[];
  statuses: string[];
}

export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  featured?: boolean;
  q?: string;
  sort?: string;
  status?: string;
}

export type ProjectStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'completed' | 'ongoing';
export type EventStatus = 'upcoming' | 'completed' | 'ongoing';

// Brand icons
export interface BrandIconProps {
  className?: string;
  size?: number;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}