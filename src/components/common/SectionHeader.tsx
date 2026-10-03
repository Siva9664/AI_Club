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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase liquid-glass-card text-blue-600 dark:text-cyan-300 border border-white/90 dark:border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.15)] mb-3 backdrop-blur-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
            {badge}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex-shrink-0">
          <Link
            to={action.href}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-cyan-400 hover:text-indigo-600 dark:hover:text-cyan-300 transition-colors group px-4 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-white/10 shadow-xs hover:shadow-md"
          >
            <span>{action.label}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
};
