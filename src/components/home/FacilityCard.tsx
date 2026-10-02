import React from 'react';
import { Cpu, CheckCircle } from 'lucide-react';
import { LazyImage } from '../common/LazyImage';
import type { Facility } from '../../types';

export const FacilityCard: React.FC<{ facility: Facility }> = ({ facility }) => {
  return (
    <article className="group flex flex-col rounded-2xl border border-border/80 bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
      <div className="relative aspect-[16/10] overflow-hidden">
        <LazyImage
          src={facility.image.url}
          alt={facility.image.alt || facility.title}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-medium">
          <Cpu className="w-3.5 h-3.5 text-primary" />
          <span>SIET AI Infrastructure</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {facility.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {facility.summary}
          </p>
        </div>

        {facility.specs && facility.specs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-2">
              Key Specifications
            </span>
            <div className="flex flex-wrap gap-1.5">
              {facility.specs.map((spec, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-foreground/80 border border-border/40"
                >
                  <CheckCircle className="w-2.5 h-2.5 text-primary shrink-0" />
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
