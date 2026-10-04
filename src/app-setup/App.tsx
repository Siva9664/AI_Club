import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { Navbar } from '@/shared/layout/Navbar';
import { Footer } from '@/shared/layout/Footer';
import { ScrollToTop } from '@/shared/ui/ScrollToTop';
import { CinematicLandingScreen } from '@/shared/ui/CinematicLandingScreen';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  const [isLandingOpen, setIsLandingOpen] = useState(() => {
    // Show on initial session load; user can dismiss or replay anytime
    return sessionStorage.getItem('siet_ai_landing_seen') !== 'true';
  });

  const handleEnterSite = () => {
    setIsLandingOpen(false);
    sessionStorage.setItem('siet_ai_landing_seen', 'true');
  };

  useEffect(() => {
    const handleReplay = () => setIsLandingOpen(true);
    window.addEventListener('open-landing-portal', handleReplay);
    return () => window.removeEventListener('open-landing-portal', handleReplay);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />

        {/* FULLSCREEN CINEMATIC LANDING PORTAL (PEXELS 36388363 NEON CIRCUIT BOARD WITH AI CHIP) */}
        <CinematicLandingScreen isOpen={isLandingOpen} onEnter={handleEnterSite} />

        <div className="relative flex flex-col min-h-screen bg-slate-50/70 dark:bg-background text-foreground transition-colors duration-200 overflow-x-hidden">
          {/* AMBIENT LIQUID SILVER / PLATINUM / CHROME BACKGROUND GLOWS */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            {/* Top-right liquid chrome orb */}
            <div className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-slate-300/35 to-zinc-400/25 blur-[130px] dark:from-slate-700/20 dark:to-zinc-800/15 animate-liquid-1" />
            {/* Top-left platinum specular orb */}
            <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-zinc-200/35 via-slate-200/30 to-zinc-300/25 blur-[140px] dark:from-slate-600/15 dark:via-zinc-700/12 dark:to-slate-800/15 animate-liquid-2" />
            {/* Center-right cool mercury glow */}
            <div className="absolute top-2/3 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-slate-200/30 via-zinc-200/25 to-slate-300/25 blur-[130px] dark:from-zinc-900/20 dark:to-slate-800/15 animate-liquid-3" />
            {/* Bottom-left refined metallic sheen */}
            <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-zinc-300/25 to-slate-200/25 blur-[120px] dark:from-slate-900/25 dark:to-zinc-800/15 animate-liquid-1" />
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 ai-grid-pattern opacity-40 dark:opacity-20 pointer-events-none" />
          </div>

          <Navbar />

          <main className="flex-1">
            <AppRoutes />
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
