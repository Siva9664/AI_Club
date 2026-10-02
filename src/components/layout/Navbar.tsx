import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Bot, Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
];

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'glass-nav shadow-lg shadow-black/5 dark:shadow-black/20'
          : 'bg-background/80 backdrop-blur-md border-b border-border/40'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* LEFT: AI Club Logo & Branding */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-1"
            aria-label="SIET AI Club Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent p-0.5 shadow-glow-sm flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-background dark:bg-card rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-foreground flex items-center gap-1.5">
                SIET AI CLUB
                <span className="hidden sm:inline-flex text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-primary/10 text-primary border border-primary/20">
                  AI LAB
                </span>
              </span>
              <span className="text-[11px] font-medium text-muted-foreground hidden xs:block">
                Sri Shakthi Inst. of Engg. & Tech.
              </span>
            </div>
          </Link>

          {/* CENTER: Desktop Navigation (Home & Projects Only) */}
          <nav
            className="hidden md:flex items-center gap-2"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary',
                    isActive
                      ? 'text-primary bg-primary/10 shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: Theme Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 rounded-xl text-foreground/80 hover:text-foreground hover:bg-muted/60 border border-border/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER NAVIGATION (Home & Projects Only) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border bg-card/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 shadow-xl"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                      isActive
                        ? 'text-primary bg-primary/10 font-bold'
                        : 'text-foreground/85 hover:bg-muted/60'
                    )
                  }
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-60" />
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>SIET AI CLUB • AI LAB</span>
              <span>v1.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
