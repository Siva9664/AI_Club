import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CinematicCtaButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'glass' | 'neon' | 'secondary' | 'silver';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  arrow?: boolean;
  sparkle?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const CinematicCtaButton: React.FC<CinematicCtaButtonProps> = ({
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  arrow = true,
  sparkle = false,
  className,
  children,
}) => {
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs rounded-xl gap-1.5',
    md: 'px-6 py-3 text-sm rounded-2xl gap-2',
    lg: 'px-8 py-3.5 text-base rounded-2xl gap-2.5',
  };

  const variantStyles = {
    silver:
      'bg-gradient-to-r from-slate-100 via-white to-zinc-200 dark:from-slate-200 dark:via-white dark:to-zinc-300 text-slate-900 shadow-[0_10px_30px_-5px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_35px_-4px_rgba(255,255,255,0.6)] border border-white hover:border-slate-200',
    primary:
      'bg-gradient-to-r from-slate-800 via-slate-900 to-zinc-900 dark:from-slate-200 dark:via-white dark:to-zinc-300 text-white dark:text-slate-900 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_35px_-6px_rgba(0,0,0,0.4)] border border-white/20 dark:border-white',
    glass:
      'bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-800 dark:text-slate-100 backdrop-blur-xl border border-white/90 dark:border-white/10 shadow-[0_10px_25px_-10px_rgba(15,23,42,0.1)] hover:shadow-[0_15px_30px_-8px_rgba(255,255,255,0.15)]',
    neon:
      'bg-gradient-to-r from-slate-200 via-white to-slate-300 text-slate-950 shadow-[0_10px_30px_-5px_rgba(255,255,255,0.5)] hover:shadow-[0_15px_35px_-4px_rgba(255,255,255,0.7)] border border-white',
    secondary:
      'bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700',
  };

  const commonClass = cn(
    'relative inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300',
    'active:scale-95 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50',
    'overflow-hidden group cursor-pointer',
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const innerContent = (
    <>
      {sparkle && <Sparkles className="w-4 h-4 shrink-0 text-amber-300 animate-pulse" />}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      )}
      {/* Specular sheen on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
    </>
  );

  if (to) {
    return (
      <Link to={to} className={commonClass}>
        {innerContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={commonClass}>
        {innerContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} type="button" className={commonClass}>
      {innerContent}
    </button>
  );
};
