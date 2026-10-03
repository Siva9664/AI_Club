import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { NotFoundPage } from './components/common/NotFoundPage';
import { CinematicLandingScreen } from './components/common/CinematicLandingScreen';

// Route-level lazy loading for performance and code splitting
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })));

const PageFallback: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <div className="relative w-12 h-12">
      <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
    <span className="mt-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
      Loading SIET AI Club...
    </span>
  </div>
);

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
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* USER-REQUESTED ONLY ROUTES: HOME & PROJECTS */}
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />

                {/* Redirect any legacy/other route gracefully to /projects or / */}
                <Route path="/achievements" element={<Navigate to="/" replace />} />
                <Route path="/events" element={<Navigate to="/" replace />} />
                <Route path="/hackathons" element={<Navigate to="/projects" replace />} />
                <Route path="/workshops" element={<Navigate to="/" replace />} />
                <Route path="/collaborations" element={<Navigate to="/" replace />} />
                <Route path="/team" element={<Navigate to="/" replace />} />
                <Route path="/contact" element={<Navigate to="/" replace />} />
                <Route path="/login" element={<Navigate to="/" replace />} />

                {/* 404 FALLBACK */}
                <Route
                  path="*"
                  element={
                    <NotFoundPage
                      title="Page Not Found"
                      message="This page is not available. Please explore our Home page or Projects portfolio."
                      backUrl="/"
                      backLabel="Return to Home"
                    />
                  }
                />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
