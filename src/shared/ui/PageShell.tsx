import React from 'react';
import { cn } from '@/shared/lib/utils';

interface PageShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const PageShell: React.FC<PageShellProps> = ({
  title,
  description,
  children,
  className,
}) => (
  <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12', className)}>
    <header className="mb-10">
      <h1 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.05em] bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white bg-clip-text text-transparent">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-lg text-muted-foreground max-w-3xl">{description}</p>
      )}
    </header>
    <main>{children}</main>
  </div>
);