// src/app-setup/routes.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageShell } from '../shared/layout/PageShell';
import { LoadingState } from '../shared/ui/LoadingState';

// Lazy‑load page modules
const Home = lazy(() => import('../pages/home'));
const Achievements = lazy(() => import('../pages/achievements'));
const Projects = lazy(() => import('../pages/projects'));
const OurGuests = lazy(() => import('../pages/our-guests'));
const Admin = lazy(() => import('../pages/admin'));
const Login = lazy(() => import('../shared/pages/Login'));
const NotFound = lazy(() => import('../shared/pages/NotFound'));

export const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingState />}>
      <Routes>
        <Route path="/" element={<PageShell><Home /></PageShell>} />
        <Route path="/achievements" element={<PageShell><Achievements /></PageShell>} />
        <Route path="/projects/*" element={<PageShell><Projects /></PageShell>} />
        <Route path="/our-guests" element={<PageShell><OurGuests /></PageShell>} />
        <Route path="/admin/*" element={<PageShell><Admin /></PageShell>} />
        <Route path="/login" element={<PageShell><Login /></PageShell>} />
        <Route path="*" element={<PageShell><NotFound /></PageShell>} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
