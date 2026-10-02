// src/app/router.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageShell } from '../shared/layout/PageShell';
import { LoadingState } from '../shared/ui/LoadingState';

// Lazy‑load feature route modules
const HomeRoutes = lazy(() => import('../features/home'));
const AchievementsRoutes = lazy(() => import('../features/achievements'));
const ProjectsRoutes = lazy(() => import('../features/projects'));
const OurGuestsRoutes = lazy(() => import('../features/our-guests'));
const AdminRoutes = lazy(() => import('../features/admin'));
const Login = lazy(() => import('../shared/pages/Login'));
const NotFound = lazy(() => import('../shared/pages/NotFound'));

export const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingState />}>
      <Routes>
        <Route path="/" element={<PageShell><HomeRoutes /></PageShell>} />
        <Route path="/achievements" element={<PageShell><AchievementsRoutes /></PageShell>} />
        <Route path="/projects/*" element={<PageShell><ProjectsRoutes /></PageShell>} />
        <Route path="/our-guests" element={<PageShell><OurGuestsRoutes /></PageShell>} />
        <Route path="/admin/*" element={<PageShell><AdminRoutes /></PageShell>} />
        <Route path="/login" element={<PageShell><Login /></PageShell>} />
        <Route path="*" element={<PageShell><NotFound /></PageShell>} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
