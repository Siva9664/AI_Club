import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/app-setup/providers/ThemeProvider';
import { cn } from '@/shared/lib/utils';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={cn(
        'relative inline-flex items-center justify-center p-2 rounded-xl text-foreground/80 hover:text-foreground hover:bg-muted/70 border border-border/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary',
        className
      )}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
