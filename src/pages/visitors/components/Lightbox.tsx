import React, { useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import type { GalleryItem } from '@/types';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  initialIndex: number;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  items,
  initialIndex,
  onNavigate,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  const trapFocus = useCallback((e: KeyboardEvent) => {
    const focusableElements = lightboxRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }, []);

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
    onNavigate(nextIndex);
  }, [currentIndex, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
    onNavigate(prevIndex);
  }, [currentIndex, items.length, onNavigate]);

  // Body scroll lock + focus management on open/close.
  // NOTE: initialIndex is consumed once per mount via useState(initialIndex);
  // the parent remounts the lightbox (key) each time a new image is opened,
  // so no index-sync effect is needed here.
  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      lightboxRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      prevFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === 'Tab') {
        trapFocus(e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goNext, goPrev, trapFocus]);

  const currentItem = items[currentIndex];

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={lightboxRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/98 backdrop-blur-xl p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery lightbox"
        tabIndex={-1}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 dark:bg-slate-900/80 hover:bg-white/20 dark:hover:bg-slate-800/90 text-white/80 hover:text-white transition-colors backdrop-blur-md"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className={cn(
            'absolute left-4 z-10 p-3 rounded-full bg-white/10 dark:bg-slate-900/80 hover:bg-white/20 dark:hover:bg-slate-800/90 text-white/80 hover:text-white transition-colors backdrop-blur-md',
            items.length <= 1 && 'opacity-30 pointer-events-none'
          )}
          aria-label="Previous image"
          disabled={items.length <= 1}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className={cn(
            'absolute right-4 z-10 p-3 rounded-full bg-white/10 dark:bg-slate-900/80 hover:bg-white/20 dark:hover:bg-slate-800/90 text-white/80 hover:text-white transition-colors backdrop-blur-md',
            items.length <= 1 && 'opacity-30 pointer-events-none'
          )}
          aria-label="Next image"
          disabled={items.length <= 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div className="relative max-w-[90vw] max-h-[80vh] flex flex-col items-center">
          <motion.img
            src={currentItem.src}
            alt={currentItem.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
          />

          {/* Metadata Bar */}
          <div className="mt-4 w-full max-w-[800px] px-4 text-center">
            <div className="mb-2">
              <span className={cn(
                'inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border shadow-sm',
                currentItem.category === 'delegation' && 'bg-blue-500/15 text-blue-400 border-blue-500/30',
                currentItem.category === 'keynote' && 'bg-purple-500/15 text-purple-400 border-purple-500/30',
                currentItem.category === 'lab' && 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                currentItem.category === 'roundtable' && 'bg-amber-500/15 text-amber-400 border-amber-500/30',
              )}>
                {currentItem.badge}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{currentItem.title}</h3>
            <p className="text-sm text-slate-300 mb-2">{currentItem.speaker} &bull; <span className="text-slate-500">{currentItem.date}</span></p>
            <p className="text-xs text-slate-400">{currentItem.location}</p>
            {currentItem.caption && (
              <p className="mt-2 text-sm text-slate-400 italic max-w-2xl mx-auto">{currentItem.caption}</p>
            )}
            <div className="mt-3 text-xs font-mono text-slate-500">
              {currentIndex + 1} / {items.length}
            </div>
          </div>
        </div>

        {/* Keyboard hints */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs text-slate-500 hidden sm:flex">
          <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">&larr;</kbd>
          <span className="px-2">Previous</span>
          <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">Esc</kbd>
          <span className="px-2">Close</span>
          <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">&rarr;</kbd>
          <span className="px-2">Next</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};