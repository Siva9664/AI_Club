import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles, Cpu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LoginBox } from './LoginBox';
import { cn } from '@/shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

// Only Home and Projects as requested
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
      setIsScrolled(window.scrollY > 15);
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
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'glass-nav bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-white/80 dark:border-white/10 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] py-1'
          : 'bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-b border-white/60 dark:border-white/5 py-1.5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* LEFT: Site Logo in Left Corner Near SIET AI LAB */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-2xl px-1 py-1 transition-all"
            aria-label="SIET AI Lab Homepage"
          >
            <div className="relative shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-slate-300 via-white to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-800 shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-300 ring-2 ring-white/90 dark:ring-white/20 overflow-hidden">
              <img
                src="/logo.png"
                alt="SIET AI LAB Official Logo Emblem"
                className="w-full h-full object-cover rounded-full"
              />
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"
                title="AI Lab Cluster Operational"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                SIET AI LAB
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden xs:block">
                Sri Shakthi Inst. of Engg. & Tech.
              </span>
            </div>
          </Link>

          {/* CENTER: Desktop Navigation (Home & Projects Only) */}
          <nav
            className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/90 dark:border-white/10 shadow-sm"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary',
                    isActive
                      ? 'text-slate-900 dark:text-white bg-gradient-to-r from-slate-200 via-white to-slate-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 shadow-sm border border-slate-300/80 dark:border-white/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/40'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT CORNER: Actions & Login Box */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Replay Cinematic AI Chip Intro Button */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-landing-portal'))}
              type="button"
              title="Replay Cinematic AI Chip Intro"
              aria-label="Replay Cinematic AI Chip Intro"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700/80 shadow-xs backdrop-blur-md active:scale-95 transition-all cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
              <span>Intro</span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Explore Projects Button */}
            <Link
              to="/projects"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-slate-200/60 dark:bg-slate-700/60 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-600 active:scale-95 transition-all border border-slate-300 dark:border-slate-600 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Projects</span>
            </Link>

            {/* LOGIN BOX (IN RIGHT CORNER) */}
            <LoginBox />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 rounded-2xl text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/80 dark:border-white/10 hover:bg-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER / DROPDOWN NAVIGATION */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-white/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-3 shadow-xl"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all',
                      isActive
                        ? 'text-slate-900 dark:text-white bg-slate-200/80 dark:bg-slate-700/80 border border-slate-300/80 dark:border-white/20'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                    )
                  }
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </NavLink>
              ))}

              {/* Mobile Intro Replay Link */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-landing-portal'));
                }}
                className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-slate-500" />
                  <span>Replay AI Chip Intro</span>
                </div>
                <Sparkles className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                SIET AI SILVER LAB
              </span>
              <Link
                to="/projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>View Projects</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
