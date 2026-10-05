import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAchievementsBundle } from '@/services/achievements';
import type {
  Achievement,
  AchievementCategory,
  AchievementStats,
  Ambassador,
  UpcomingCompetition,
} from '@/types';
import { SEARCH_DEBOUNCE_MS } from '../lib/constants';

const VALID_CATEGORIES: Array<AchievementCategory | 'all'> = [
  'all', 'competition', 'hackathon', 'get-together', 'collaboration',
  'free-course', 'certificate', 'ambassador', 'other',
];

/**
 * Owns every piece of page state for /achievements.
 * Category, year and the debounced query all live in the URL query string so
 * a filtered view can be shared or reloaded.
 */
export function useAchievementsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [all, setAll] = useState<Achievement[]>([]);
  const [featured, setFeatured] = useState<Achievement[]>([]);
  const [upcoming, setUpcoming] = useState<UpcomingCompetition[]>([]);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [stats, setStats] = useState<AchievementStats | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Achievement opened by clicking a card. When ?focus=<id> is present the
  // modal target is derived from the URL instead (see `selected` below).
  const [picked, setPicked] = useState<Achievement | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const categoryParam = searchParams.get('category') ?? 'all';
  const category: AchievementCategory | 'all' = VALID_CATEGORIES.includes(
    categoryParam as AchievementCategory | 'all'
  ) ? (categoryParam as AchievementCategory | 'all') : 'all';

  const yearParam = searchParams.get('year') ?? 'all';
  const year: number | 'all' =
    yearParam === 'all' || !/^\d{4}$/.test(yearParam) ? 'all' : Number(yearParam);

  // `q` in the URL is the single source of truth for the search term.
  // `search` mirrors it for the input; the debounced write pushes back to the
  // URL. `lastUrlSearch` (state, not a ref) re-syncs on back/forward.
  const urlSearch = searchParams.get('q') ?? '';
  const [search, setSearch] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);
  const [lastUrlSearch, setLastUrlSearch] = useState(urlSearch);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (lastUrlSearch !== urlSearch) {
    setLastUrlSearch(urlSearch);
    setSearch(urlSearch);
    setDebouncedSearch(urlSearch);
  }

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const bundle = await getAchievementsBundle();
        if (cancelled) return;
        setAll(bundle.achievements);
        setFeatured(bundle.featured);
        setUpcoming(bundle.upcomingCompetitions);
        setAmbassadors(bundle.ambassadors);
        setStats(bundle.stats);
        setYears(bundle.years);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load achievements.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [reloadToken]);

  const load = useCallback(() => {
    setLoading(true);
    setReloadToken((t) => t + 1);
  }, []);

  // Debounced search: the input updates immediately, the URL (and therefore the
  // filter) only after SEARCH_DEBOUNCE_MS of quiet.
  const onSearchChange = useCallback((value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          const q = value.trim();
          if (q) next.set('q', q);
          else next.delete('q');
          return next;
        },
        { replace: true }
      );
    }, SEARCH_DEBOUNCE_MS);
  }, [setSearchParams]);

  useEffect(
    () => () => { if (debounceRef.current) clearTimeout(debounceRef.current); },
    []
  );

  const filtered = useMemo(() => {
    let results = [...all];
    if (category !== 'all') results = results.filter((a) => a.category === category);
    if (year !== 'all') results = results.filter((a) => a.year === year);
    const q = debouncedSearch.toLowerCase().trim();
    if (q) {
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.recipient.toLowerCase().includes(q) ||
          (a.summary ?? '').toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          (a.metric ?? '').toLowerCase().includes(q)
      );
    }
    return results;
  }, [all, category, year, debouncedSearch]);

  const setFilter = useCallback(
    (key: 'category' | 'year' | 'q' | 'focus', value: string | null) => {
      const next = new URLSearchParams(searchParams);
      if (value === null || value === '' || value === 'all') next.delete(key);
      else next.set(key, value);
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const onCategoryChange = useCallback(
    (value: AchievementCategory | 'all') => setFilter('category', value === 'all' ? null : value),
    [setFilter]
  );
  const onYearChange = useCallback(
    (value: number | 'all') => setFilter('year', value === 'all' ? null : String(value)),
    [setFilter]
  );

  const clearFilters = useCallback(() => {
    setSearch('');
    setDebouncedSearch('');
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // Deep link: /achievements?focus=<id> opens that achievement's modal.
  // Derived during render (no effect needed).
  const focusId = searchParams.get('focus');
  const selected = useMemo(() => {
    if (focusId) return all.find((a) => a.id === focusId) ?? null;
    return picked;
  }, [focusId, all, picked]);

  const setSelected = useCallback((achievement: Achievement | null) => {
    setPicked(achievement);
  }, []);

  const closeModal = useCallback(() => {
    setPicked(null);
    if (focusId) setFilter('focus', null);
  }, [focusId, setFilter]);

  return {
    all, featured, upcoming, ambassadors, stats, years,
    loading, error, selected, filtered,
    search, onSearchChange,
    category, onCategoryChange,
    year, onYearChange,
    clearFilters, setSelected, closeModal, load,
  };
}