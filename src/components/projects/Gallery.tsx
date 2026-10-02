import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { LazyImage } from '../common/LazyImage';
import { Lightbox } from '../common/Lightbox';
import type { Image as ImageType } from '../../types';

export const Gallery: React.FC<{ screenshots: ImageType[] }> = ({ screenshots }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  if (!screenshots || screenshots.length === 0) return null;

  const handleOpen = (idx: number) => {
    setActiveIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshots.map((img, idx) => (
          <div
            key={idx}
            onClick={() => handleOpen(idx)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden border border-border/80 bg-card aspect-[16/10] shadow-sm hover:shadow-xl transition-all duration-300"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleOpen(idx);
            }}
            aria-label={`View screenshot ${idx + 1}: ${img.alt || 'Project screenshot'}`}
          >
            <LazyImage
              src={img.url}
              alt={img.alt || `Screenshot ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="p-3 rounded-full bg-black/60 text-white backdrop-blur-md transform scale-90 group-hover:scale-100 transition-transform">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
            {img.alt && (
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs truncate">
                {img.alt}
              </div>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        images={screenshots}
        currentIndex={activeIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActiveIdx}
      />
    </>
  );
};
