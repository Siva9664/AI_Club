import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Link2, Check, ExternalLink } from 'lucide-react';
import type { Achievement } from '@/types';
import { LazyImage } from '@/shared/ui/LazyImage';
import { cn } from '@/shared/lib/utils';
import { CATEGORY_BADGE, CATEGORY_LABEL, formatAchievementDate } from '../lib/constants';

interface DetailModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

const FOCUSABLE =
  'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const DetailModal: React.FC<DetailModalProps> = ({ achievement, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);

  const trapFocus = useCallback((e: KeyboardEvent) => {
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  // Esc closes; Tab is trapped while open. Body scroll is locked.
  useEffect(() => {
    if (!achievement) return;
    restoreRef.current = document.activeElement as HTMLElement;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'Tab') trapFocus(e);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus?.();
    };
  }, [achievement, onClose, trapFocus]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  if (!achievement) return null;

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/achievements?focus=${achievement.id}`
      : `/achievements?focus=${achievement.id}`;

  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const ta = document.createElement('textarea');
        ta.value = shareUrl;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ach-modal-title"
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border border-white/10 bg-white dark:bg-slate-900 shadow-2xl focus:outline-none"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close achievement details"
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950/85 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative">
            <LazyImage
              src={achievement.image?.url ?? ''}
              alt={achievement.image?.alt || achievement.title}
              aspectRatio="aspect-[16/9]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border',
                  CATEGORY_BADGE[achievement.category]
                )}
              >
                {CATEGORY_LABEL[achievement.category]}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {formatAchievementDate(achievement.date)}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {achievement.year} Academic Year
              </span>
            </div>

            <h2
              id="ach-modal-title"
              className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white"
            >
              {achievement.title}
            </h2>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Recipient / Team
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {achievement.recipient}
              </p>
            </div>

            {achievement.metric && (
              <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong className="font-bold">Key Impact / Award:</strong> {achievement.metric}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Overview &amp; Technical Accomplishment
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {achievement.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              {achievement.proofUrl && (
                <a
                  href={achievement.proofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  View Proof
                </a>
              )}
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-600 font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                ) : (
                  <Link2 className="w-4 h-4" aria-hidden="true" />
                )}
                {copied ? 'Link copied' : 'Copy link'}
              </button>
              <span aria-live="polite" className="sr-only">
                {copied ? 'Link copied to clipboard' : ''}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};