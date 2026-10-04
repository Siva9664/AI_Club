import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NotFoundPage } from '@/shared/ui/NotFoundPage';

// Route-level lazy loading for performance and code splitting
const HomeScreen = lazy(() =>
  import('@/pages/home/screens/HomeScreen').then((m) => ({ default: m.Home }))
);
const ProjectsScreen = lazy(() =>
  import('@/pages/projects/screens/ProjectsScreen').then((m) => ({ default: m.Projects }))
);
const ProjectDetailScreen = lazy(() =>
  import('@/pages/projects/screens/ProjectDetailScreen').then((m) => ({ default: m.ProjectDetail }))
);
const AchievementsScreen = lazy(() =>
  import('@/pages/achievements/screens/AchievementsScreen').then((m) => ({ default: m.Achievements }))
);
const VisitorsScreen = lazy(() =>
  import('@/pages/visitors/screens/VisitorsScreen').then((m) => ({ default: m.Visitors }))
);
const ChatbotScreen = lazy(() =>
  import('@/pages/chatbot/screens/ChatbotScreen').then((m) => ({ default: m.Chatbot }))
);
const LoginScreen = lazy(() =>
  import('@/pages/login/screens/LoginScreen').then((m) => ({ default: m.Login }))
);

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

export const AppRoutes: React.FC = () => (
  <Suspense fallback={<PageFallback />}>
    <Routes>
      {/* MAIN ROUTES */}
      <Route path="/" element={<HomeScreen />} />
      <Route path="/projects" element={<ProjectsScreen />} />
      <Route path="/projects/:slug" element={<ProjectDetailScreen />} />
      <Route path="/achievements" element={<AchievementsScreen />} />
      <Route path="/visitors" element={<VisitorsScreen />} />
      <Route path="/chatbot" element={<ChatbotScreen />} />
      <Route path="/login" element={<LoginScreen />} />

      {/* LEGACY REDIRECTS */}
      <Route path="/guests" element={<Navigate to="/visitors" replace />} />
      <Route path="/our-guests" element={<Navigate to="/visitors" replace />} />
      <Route path="/project" element={<Navigate to="/projects" replace />} />
      <Route path="/events" element={<Navigate to="/achievements" replace />} />
      <Route path="/hackathons" element={<Navigate to="/achievements" replace />} />
      <Route path="/workshops" element={<Navigate to="/achievements" replace />} />
      <Route path="/collaborations" element={<Navigate to="/achievements" replace />} />
      <Route path="/team" element={<Navigate to="/projects" replace />} />
      <Route path="/contact" element={<Navigate to="/" replace />} />

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
);

export default AppRoutes;