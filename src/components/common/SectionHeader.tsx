import React from 'react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  action,
  className,
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14',
        isCenter && 'text-center md:flex-col md:items-center',
        className
      )}
    >
      <div className={cn('max-w-3xl', isCenter && 'mx-auto')}>
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {badge}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex-shrink-0">
          <Link
            to={action.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors group"
          >
            <span>{action.label}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
};
