import type { AchievementCategory } from '@/types';

export const CATEGORY_TABS: Array<{ value: AchievementCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'competition', label: 'Competitions' },
  { value: 'hackathon', label: 'Hackathons' },
  { value: 'get-together', label: 'Get-Togethers' },
  { value: 'collaboration', label: 'Collaborations' },
  { value: 'free-course', label: 'Free Courses' },
  { value: 'certificate', label: 'Certificates' },
  { value: 'ambassador', label: 'Ambassadors' },
  { value: 'other', label: 'Other' },
];

/** Tailwind-safe static class maps (never build class names dynamically). */
export const CATEGORY_BADGE: Record<AchievementCategory, string> = {
  hackathon: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
  competition: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
  collaboration: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
  certificate: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
  ambassador: 'bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-500/30',
  'get-together': 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
  'free-course': 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30',
  other: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30',
};

export const CATEGORY_LABEL: Record<AchievementCategory, string> = {
  hackathon: 'Hackathon',
  competition: 'Competition',
  collaboration: 'Collaboration',
  certificate: 'Certificate',
  ambassador: 'Ambassador',
  'get-together': 'Get-Together',
  'free-course': 'Free Course',
  other: 'Other',
};

/** First 10 upcoming competitions shown; "+ more" reveals up to 20. */
export const UPCOMING_INITIAL = 10;
export const UPCOMING_MAX = 20;

/** Debounce for the search box, in ms (achievement.html used 300). */
export const SEARCH_DEBOUNCE_MS = 300;

/** Formats an ISO date as "22 Aug 2026" (same shape as achievement.html). */
export function formatAchievementDate(iso: string): string {
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const m = Number(parts[1]) - 1;
  if (m < 0 || m > 11) return iso;
  return `${Number(parts[2])} ${months[m]} ${parts[0]}`;
}