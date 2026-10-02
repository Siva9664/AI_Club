import React, { useState } from 'react';
import { ZoomIn, Network } from 'lucide-react';
import { LazyImage } from '../common/LazyImage';
import { Lightbox } from '../common/Lightbox';
import type { ArchitectureInfo } from '../../types';

export const ArchitectureView: React.FC<{ architecture?: ArchitectureInfo }> = ({ architecture }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!architecture || !architecture.image?.url) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-border/80 bg-card/70 overflow-hidden shadow-sm backdrop-blur-sm">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-primary">
          <Network className="w-4 h-4" />
          <span>System Design & Inference Pipeline</span>
        </div>

        {architecture.description && (
          <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
            {architecture.description}
          </p>
        )}

        <div
          onClick={() => setIsOpen(true)}
          className="group relative cursor-pointer rounded-2xl overflow-hidden border border-border/60 bg-muted/40 aspect-[21/9] sm:aspect-[16/9]"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setIsOpen(true);
          }}
          aria-label="Click to enlarge architecture diagram"
        >
          <LazyImage
            src={architecture.image.url}
            alt={architecture.image.alt || 'System Architecture Diagram'}
            aspectRatio="aspect-[16/9]"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/70 text-white backdrop-blur-md text-xs font-semibold">
              <ZoomIn className="w-4 h-4" />
              <span>Click to Enlarge Architecture</span>
            </div>
          </div>
        </div>

        {architecture.caption && (
          <p className="mt-4 text-xs sm:text-sm text-center text-muted-foreground italic">
            {architecture.caption}
          </p>
        )}
      </div>

      <Lightbox
        images={[architecture.image]}
        currentIndex={0}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onIndexChange={() => {}}
      />
    </div>
  );
};
