import React from 'react';
import { motion } from 'framer-motion';
import type { Ambassador } from '@/types';
import { LazyImage } from '@/shared/ui/LazyImage';

export const AmbassadorsSection: React.FC<{ ambassadors: Ambassador[] }> = ({ ambassadors }) => (
  <section id="ach-ambassadors" className="py-16 md:py-20" aria-labelledby="ach-ambassadors-heading">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300 border border-fuchsia-500/25 mb-4">
          Ambassadors
        </span>
        <h2
          id="ach-ambassadors-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white"
        >
          Club Ambassadors
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Student ambassadors representing the club with industry and academic partners.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ambassadors.map((amb, idx) => (
          <motion.li
            key={amb.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <LazyImage
              src={amb.image.url}
              alt={amb.image.alt || amb.name}
              aspectRatio="aspect-[4/3]"
            />
            <div className="p-5 flex flex-col gap-2 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{amb.name}</h3>
                {amb.sample && (
                  <span className="shrink-0 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                    Sample
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-fuchsia-700 dark:text-fuchsia-300">
                {amb.role}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 flex-1">{amb.bio}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);