export interface Image {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CtaButton {
  label: string;
  url: string;
}

export interface Hero {
  smallLabel: string;
  headline: string;
  supportingText: string;
  primaryCta: CtaButton;
  secondaryCta: CtaButton;
  badge?: string;
  stats?: { label: string; value: string }[];
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

export type ProjectStatus = 'featured' | 'ongoing' | 'completed';

export interface ProjectSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  thumbnail: Image;
  tags: string[];
  category: string;
  status: ProjectStatus;
  featured: boolean;
  team?: string;
}

export interface TechItem {
  name: string;
  icon?: string;
  category?: 'AI / Machine Learning' | 'Frontend' | 'Backend & APIs' | 'Database & Storage' | 'Hardware & Edge' | 'Tools & Cloud' | string;
}

export interface Person {
  name: string;
  role: string;
  photo?: string | Image;
  profileLink?: string;
  github?: string;
  linkedin?: string;
}

export interface Links {
  github?: string;
  liveDemo?: string;
  documentation?: string;
  paper?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectResult {
  metric?: string;
  label: string;
  detail?: string;
}

export interface ArchitectureInfo {
  image: Image;
  caption?: string;
  description?: string;
}

export interface DemoInfo {
  type: 'video' | 'link';
  url: string;
  label?: string;
}

export interface ProjectDetail extends ProjectSummary {
  heroImage: Image;
  overview: string;
  problem: string;
  solution: string;
  objectives: string[];
  features: ProjectFeature[];
  techStack: TechItem[];
  architecture?: ArchitectureInfo;
  screenshots?: Image[];
  demo?: DemoInfo;
  contributors: Person[];
  links?: Links;
  results?: ProjectResult[];
  futureScope?: string[];
  relatedProjects?: ProjectSummary[];
  startedOn?: string;
  completedOn?: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  image: Image;
  recipient?: string;
  team?: string;
  award?: string;
}

export type EventStatus = 'upcoming' | 'ongoing' | 'completed';

export interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  summary: string;
  status: EventStatus;
  image: Image;
  action?: CtaButton;
  location?: string;
  timing?: string;
}

export interface Facility {
  id: string;
  title: string;
  summary: string;
  image: Image;
  specs?: string[];
}

export interface Social {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  labLocation?: string;
  socialLinks: Social[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  sort?: 'newest' | 'oldest' | 'title';
  category?: string;
  status?: string;
  tag?: string;
  q?: string;
  featured?: boolean;
}

export interface ProjectFilterMeta {
  categories: string[];
  statuses: string[];
  tags: string[];
}

export interface HomeApiResponse {
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

export interface ClubApiResponse {
  name: string;
  institution: string;
  tagline: string;
  contact: ContactInfo;
  activities: Activity[];
  facilities: Facility[];
}
