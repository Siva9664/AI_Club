import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { getVisitors } from '@/services/visitors';
import type { Visitor } from '@/types';
import { PageShell } from '@/shared/ui/PageShell';
import { LoadingState } from '@/shared/ui/LoadingState';
import { EmptyState } from '@/shared/ui/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { LazyImage } from '@/shared/ui/LazyImage';
import { VisitorCard } from '../components/VisitorCard';
import { VisitorStats } from '../components/VisitorStats';
import { Lightbox } from '../components/Lightbox';
import { Testimonials } from '../components/Testimonials';
import { StardustCursor } from '../components/StardustCursor';
import { ContactBlock } from '../components/ContactBlock';
import { cn } from '@/shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

type GalleryCat = 'All' | 'Delegations' | 'Keynotes' | 'Lab Sessions' | 'Roundtables';
const CATEGORY_TABS: GalleryCat[] = ['All', 'Delegations', 'Keynotes', 'Lab Sessions', 'Roundtables'];

function visitorCategory(v: Visitor): Exclude<GalleryCat, 'All'> {
  switch (v.visitorType) {
    case 'Collaborator': return 'Delegations';
    case 'Industry Expert': return 'Keynotes';
    case 'Academic': return 'Lab Sessions';
    case 'Alumni': return 'Lab Sessions';
    case 'Guest Speaker': return 'Roundtables';
    default: return 'Keynotes';
  }
}

function fileKey(src: string): string {
  const base = src.split('/').pop() ?? src;
  return base.replace(/\.(svg|jpg|jpeg|png)$/i, '');
}

const GALLERY_META: Record<string, { badge: string; title: string; category: 'Delegations' | 'Keynotes' | 'Lab Sessions' | 'Roundtables'; span: string }> = {
  konyang_delegation_visit: { badge: 'International Delegation', title: 'Konyang University Delegation Visit', category: 'Delegations', span: 'md:col-span-2 md:row-span-2' },
  konyang_campus_interaction: { badge: 'Campus Interaction', title: 'Lab Exploration & Student Dialogue', category: 'Delegations', span: '' },
  'gallery-ibm': { badge: 'Industry Keynote', title: 'Generative AI & Enterprise Workflows', category: 'Keynotes', span: '' },
  'gallery-deepmind': { badge: 'Research Colloquium', title: 'Reinforcement Learning from First Principles', category: 'Keynotes', span: '' },
  'gallery-mit': { badge: 'Roundtable Dialogue', title: 'Ethical Frontiers in AI Governance', category: 'Roundtables', span: '' },
  'gallery-nvidia': { badge: 'Embodied AI Masterclass', title: 'Isaac Sim Robotics Physics Engine', category: 'Lab Sessions', span: 'md:col-span-2' },
  'gallery-anthropic': { badge: 'Constitutional AI', title: 'Mechanistic Interpretability in Transformers', category: 'Keynotes', span: '' },
  'gallery-multilingual': { badge: 'Societal Impact Keynote', title: 'AI for Societal Impact', category: 'Keynotes', span: '' },
  'gallery-alumni': { badge: 'Alumni Mentorship', title: 'From Classrooms to DeepMind Labs', category: 'Lab Sessions', span: '' },
  'gallery-healthcare': { badge: 'Clinical Informatics Talk', title: 'Federated Learning in Healthcare', category: 'Lab Sessions', span: '' },
  'gallery-cloud': { badge: 'Cloud Workshop', title: 'Distributed Transformer Training', category: 'Lab Sessions', span: '' },
  'gallery-neuromorphic': { badge: 'Mechatronics Talk', title: 'Neuromorphic Sensors & Event Vision', category: 'Delegations', span: '' },
  'gallery-quantum': { badge: 'Quantum Lecture', title: 'Quantum Machine Learning', category: 'Roundtables', span: '' },
};

export const Visitors: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [stats, setStats] = useState({ totalVisitors: 0, countries: 0, delegations: 0, keynotes: 0, labSessions: 0, roundtables: 0 });
  const [testimonials, setTestimonials] = useState<Array<{ quote: string; author: string; role: string; photo: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<GalleryCat>('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Visitor | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSession, setLightboxSession] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getVisitors();
      setVisitors(res.visitors);
      setStats(res.stats);
      setTestimonials(res.testimonials);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load visitors.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load sets state internally, this is the standard data fetching pattern
    load();
  }, [load]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return visitors.filter((v) => {
      if (tab !== 'All' && visitorCategory(v) !== tab) return false;
      if (!q) return true;
      return [v.name, v.organization, v.topic ?? '', v.summary, ...(v.tags ?? [])].join(' ').toLowerCase().includes(q);
    });
  }, [visitors, tab, query]);

  const bento = useMemo(() => visitors.flatMap((v) => (v.gallery ?? []).map((src) => {
    const key = fileKey(src);
    const meta = GALLERY_META[key];
    return { id: `${v.id}-${key}`, src, title: meta?.title ?? `${v.name} — visit moments`, speaker: `${v.name} • ${v.organization}`, date: v.visitDate, badge: meta?.badge ?? v.visitorType, category: meta?.category ?? visitorCategory(v), location: v.location, span: meta?.span ?? '' };
  })), [visitors]);

  const galleryFiltered = useMemo(() => (tab === 'All' ? bento : bento.filter((g) => g.category === tab)), [bento, tab]);
  const lightboxItems = useMemo(() => galleryFiltered.map((g) => ({ id: g.id, src: g.src, title: g.title, speaker: g.speaker, date: g.date, badge: g.badge, location: g.location })), [galleryFiltered]);
  const hero = visitors.find((v) => v.id === 'konyang-delegation-visit') ?? visitors[0];

  const openLightbox = (id: string) => {
    const idx = galleryFiltered.findIndex((g) => g.id === id);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxSession((s) => s + 1);
    setLightboxOpen(true);
  };

  return (
    <PageShell title="Visitors & Distinguished Guests" description="International delegations, industry experts, academics, and alumni who visited our AI Lab">
      <StardustCursor />
      {/* HERO — keeps source copy + hero photo */}
      <section aria-labelledby="visitors-hero" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-cyan-300 mb-3">Visitors &amp; Guests</p>
          <h2 id="visitors-hero" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Our Distinguished<br /><span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">Visitors &amp; Guests</span></h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl">Great minds who visited our AI Club, shared their knowledge, inspired our students, and helped us build meaningful connections.</p>
          <p className="mt-3 text-xs font-mono uppercase tracking-wider text-slate-500">Ideas • Meet • Impact</p>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 shadow-xl">
          {loading && <div className="aspect-[16/10] animate-pulse bg-muted/60" />}
          {!loading && hero && (
            <LazyImage src={hero.photo.url} alt={hero.photo.alt || hero.name} aspectRatio="aspect-[16/10]" />
          )}
          {!loading && hero && (
            <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-950/70 text-white backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI Innovation Hub • Konyang Delegation
            </div>
          )}
        </div>
      </section>

      {!loading && !error && <VisitorStats stats={stats} />}

      {/* SEARCH + CATEGORY TABS */}
      <section aria-label="Filter visitors" className="mt-4 mb-8 space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search visitors, organizations, topics…" aria-label="Search visitors" className="w-full pl-11 pr-10 py-3 rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md shadow-sm" />
          {query && (<button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"><X className="w-4 h-4" /></button>)}
        </div>
        <div role="tablist" aria-label="Visitor categories" className="flex flex-wrap gap-2">
          {CATEGORY_TABS.map((c) => (
            <button key={c} role="tab" aria-selected={tab === c} type="button" onClick={() => setTab(c)} className={cn('px-4 py-2 rounded-full text-xs font-bold border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500', tab === c ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md' : 'bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-white/90 dark:border-white/10 hover:bg-white dark:hover:bg-slate-700')}>{c}</button>
          ))}
        </div>
      </section>

      {loading && <LoadingState count={6} />}
      {!loading && error && <ErrorState title="Unable to load visitors" message={error} onRetry={load} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState title="No visitors found" message="Try changing your search or category filter." onClear={() => { setQuery(''); setTab('All'); }} actionLabel="Clear Filters" />
      )}
      {!loading && !error && filtered.length > 0 && (
        <section aria-label="Visitor cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((v, idx) => (
              <motion.div key={v.id} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.2) }}>
                <VisitorCard visitor={v} onClick={(vis) => setSelected(vis)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      )}
      {/* BENTO GALLERY */}
      {!loading && !error && galleryFiltered.length > 0 && (
        <section aria-label="Moments gallery" className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Moments Gallery</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">Glimpses from keynote sessions, lab explorations and delegation visits.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4">
            {galleryFiltered.map((g) => (
              <article key={g.id} tabIndex={0} role="button" aria-label={`Open ${g.title} in lightbox`} onClick={() => openLightbox(g.id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(g.id); } }} className={cn('group relative rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 bg-slate-100 dark:bg-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500', g.span)}>
                <LazyImage src={g.src} alt={g.title} aspectRatio="aspect-auto" className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/25 backdrop-blur-md mb-2">{g.badge}</span>
                  <h3 className="text-sm font-bold text-white leading-snug">{g.title}</h3>
                  <p className="text-[11px] text-slate-300 truncate mt-1">{g.speaker}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">{g.date}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {!loading && !error && testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      {/* VISITOR DETAIL MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4" role="dialog" aria-modal="true" aria-label={`${selected.name} details`} onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }} transition={{ duration: 0.22 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/80 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl">
              <button type="button" onClick={() => setSelected(null)} aria-label="Close visitor details" className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/50 text-white hover:bg-slate-950/70 focus:outline-none focus:ring-2 focus:ring-blue-500"><X className="w-5 h-5" /></button>
              <div className="relative aspect-[16/9] overflow-hidden">
                <LazyImage src={selected.photo.url} alt={selected.photo.alt || selected.name} aspectRatio="aspect-auto" className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-white border border-white/25 backdrop-blur-md">{selected.visitorType}</span>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-mono text-slate-500">{selected.visitDate} • {selected.location}</p>
                <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{selected.name}</h3>
                <p className="text-sm text-blue-600 dark:text-cyan-300 font-semibold mt-1">{selected.role} • {selected.organization}</p>
                <p className="mt-3 text-sm italic text-slate-600 dark:text-slate-300">“{selected.topic}”</p>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selected.description}</p>
                {selected.delegates && selected.delegates.length > 0 && (
                  <div className="mt-5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Delegates</h4>
                    <div className="grid gap-2">
                      {selected.delegates.map((d) => (
                        <div key={d.name} className="rounded-xl border border-slate-200 dark:border-slate-700 p-3">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{d.name}</p>
                          <p className="text-xs text-blue-600 dark:text-cyan-300">{d.role}</p>
                          <p className="text-[11px] font-mono text-slate-500">{d.affiliation}</p>
                        </div>
                      ))}
                    </div>
                    {selected.delegationNote && <p className="mt-2 text-[11px] text-slate-500">{selected.delegationNote}</p>}
                  </div>
                )}
                {selected.quote && (
                  <blockquote className="mt-5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 p-4 text-sm text-slate-700 dark:text-slate-200 italic">
                    “{selected.quote}”
                    <footer className="mt-2 text-xs font-semibold not-italic text-slate-500">— {selected.quoteAuthor || selected.name}</footer>
                  </blockquote>
                )}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(selected.tags ?? []).map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Lightbox key={`lightbox-session-${lightboxSession}`} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} items={lightboxItems} initialIndex={lightboxIndex} onNavigate={(i) => setLightboxIndex(i)} />
      <ContactBlock />
    </PageShell>
  );
};

