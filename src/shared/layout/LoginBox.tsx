import React, { useState, useRef, useEffect } from 'react';
import { User, Lock, LogIn, LogOut, CheckCircle, Eye, EyeOff, Shield, X, ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/shared/providers/AuthContext';

export const LoginBox: React.FC = () => {
  const { user, login, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      setNotification('Successfully signed in!');
      setTimeout(() => {
        setNotification(null);
        setIsOpen(false);
        setEmail('');
        setPassword('');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* TRIGGER BUTTON (RIGHT CORNER) */}
      {!isAuthenticated ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-expanded={isOpen}
          aria-label="Open AI Lab Member Login Box"
          className={cn(
            'inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer',
            'glass-pill bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700/80',
            'border border-white/90 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95',
            isOpen && 'ring-2 ring-blue-500/40 bg-white dark:bg-slate-700'
          )}
        >
          <div className="w-6 h-6 rounded-full bg-blue-600/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <LogIn className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline font-semibold">Login</span>
          <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform duration-200', isOpen && 'rotate-180')} />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-expanded={isOpen}
          aria-label="Open User Account Details"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-bold glass-pill bg-white/85 dark:bg-slate-800/85 text-slate-800 dark:text-slate-100 border border-emerald-500/30 shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-[10px] font-mono">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-slate-700 dark:text-slate-200">{user?.name?.split(' ')[0] || 'User'}</span>
          <ChevronDown className={cn('w-3 h-3 text-slate-400 transition-transform duration-200', isOpen && 'rotate-180')} />
        </button>
      )}

      {/* FLOATING GLASS LOGIN BOX / ACCOUNT MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl z-50 liquid-glass-panel p-6 shadow-2xl border border-white/95 dark:border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {isAuthenticated ? 'AI Lab Member Profile' : 'AI Lab Portal Sign In'}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isAuthenticated ? 'GPU Cluster Connected' : 'Access compute nodes & models'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Close Login Box"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* NOTIFICATION FEEDBACK */}
            {notification && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{notification}</span>
              </div>
            )}

            {error && (
              <div className="mt-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <X className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* AUTHENTICATED STATE */}
            {isAuthenticated && user ? (
              <div className="mt-4 space-y-4">
                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Active Identity</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{user.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Role</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-mono font-bold capitalize">
                      {user.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Cluster Node</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      RTX-6000-Node-02
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70">
                    <span className="block font-black text-sm text-slate-900 dark:text-white">3</span>
                    <span className="text-[10px] text-slate-500">Active Repos</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70">
                    <span className="block font-black text-sm text-slate-900 dark:text-white">14.2h</span>
                    <span className="text-[10px] text-slate-500">GPU Time</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Lab</span>
                </button>
              </div>
            ) : (
              /* LOGIN FORM */
              <form onSubmit={handleLogin} className="mt-4 space-y-3.5">
                {/* Email / ID Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    Institutional Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@club.test"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs glass-input focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-800 dark:text-slate-100"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-9 py-2 rounded-xl text-xs glass-input focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-800 dark:text-slate-100"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || authLoading}
                  className="w-full py-2.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In to AI Lab'}
                </button>

                {/* Demo Credentials Hint */}
                <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800 text-center text-[10px] text-slate-500 dark:text-slate-400 font-mono space-y-1">
                  <p>Demo: admin@club.test / admin123</p>
                  <p>Demo: member@club.test / member123</p>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};