import React from 'react';
import { Cpu, CheckCircle } from 'lucide-react';
import { LazyImage } from '@/shared/ui/LazyImage';
import type { Facility } from '@/types';

export const FacilityCard: React.FC<{ facility: Facility }> = ({ facility }) => {
  return (
    <article className="glass-card group flex flex-col rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl shadow-lg shadow-slate-200/50 dark:shadow-black/30">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <LazyImage
          src={facility.image.url}
          alt={facility.image.alt || facility.title}
          className="transition-transform duration-700 group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/95 font-medium drop-shadow-sm">
          <Cpu className="w-3.5 h-3.5 text-blue-300" />
          <span>SIET AI Infrastructure</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
            {facility.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {facility.summary}
          </p>
        </div>

        {facility.specs && facility.specs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
              Key Specifications
            </span>
            <div className="flex flex-wrap gap-1.5">
              {facility.specs.map((spec, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-white/90 dark:border-white/10 shadow-2xs"
                >
                  <CheckCircle className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
