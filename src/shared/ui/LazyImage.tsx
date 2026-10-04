import React, { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Image as ImageIcon } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  aspectRatio = 'aspect-[16/10]',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-muted/40 flex items-center justify-center', aspectRatio, className)}>
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-muted/70 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-muted/60 text-muted-foreground">
          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-xs">{alt || 'Image preview unavailable'}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500 ease-out',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
          {...props}
        />
      )}
    </div>
  );
};
