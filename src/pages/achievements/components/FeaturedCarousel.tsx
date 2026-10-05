import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Achievement } from '@/types';
import { LazyImage } from '@/shared/ui/LazyImage';
import { cn } from '@/shared/lib/utils';
import { CATEGORY_BADGE, CATEGORY_LABEL, formatAchievementDate } from '../lib/constants';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';

interface FeaturedCarouselProps {
  items: Achievement[];
  onOpen: (achievement: Achievement) => void;
}

const AUTOPLAY_MS = 5000;

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ items, onOpen }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const go = useCallback(
    (next: number) => setIndex(((next % items.length) + items.length) % items.length),
    [items.length]
  );

  // Autoplay, paused on hover/focus and disabled entirely under reduced motion.
  useEffect(() => {
    if (paused || reduced || items.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, reduced, items.length]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
  };

  if (items.length === 0) return null;
  const active = items[index];

  return (
    <section id="ach-featured" className="py-16 md:py-20" aria-labelledby="ach-featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/25 mb-4">
            Featured
          </span>
          <h2
            id="ach-featured-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white"
          >
            Hall of Fame Highlights
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A rotating showcase of the achievements the club is most proud of.
          </p>
        </div>
<div
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured achievements"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const diff = e.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(diff) > 40) go(diff < 0 ? index + 1 : index - 1);
            touchStart.current = null;
          }}
          className="relative rounded-[2rem] overflow-hidden border border-white/80 dark:border-white/10 shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <AnimatePresence mode="wait">
            <motion.button
              key={active.id}
              type="button"
              onClick={() => onOpen(active)}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative block w-full text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400"
              aria-label={`View details for ${active.title}`}
            >
              <LazyImage
                src={active.image?.url ?? ''}
                alt={active.image?.alt || active.title}
                aspectRatio="aspect-[16/9] sm:aspect-[21/9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <span
                  className={cn(
                    'inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md mb-3',
                    CATEGORY_BADGE[active.category]
                  )}
                >
                  {CATEGORY_LABEL[active.category]}
                </span>
                <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight max-w-3xl">
                  {active.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 max-w-2xl line-clamp-2">
                  {active.summary || active.description}
                </p>
                <p className="mt-3 text-[11px] font-mono text-slate-400">
                  {formatAchievementDate(active.date)} &bull; {active.recipient}
                </p>
              </div>
            </motion.button>
          </AnimatePresence>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous featured achievement"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/50 text-white hover:bg-slate-950/75 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next featured achievement"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/50 text-white hover:bg-slate-950/75 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 right-6 flex items-center gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      'h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-amber-400',
                      i === index ? 'w-7 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white/80'
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};