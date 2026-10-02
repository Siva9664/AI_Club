import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { NotFoundPage } from './components/common/NotFoundPage';

// Route-level lazy loading for performance and code splitting
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })));
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage').then((m) => ({ default: m.PlaceholderPage })));

const PageFallback: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <div className="relative w-12 h-12">
      <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
    <span className="mt-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
      Loading AI Platform...
    </span>
  </div>
);

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
          <Navbar />

          <main className="flex-1">
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* PRIMARY ROUTES */}
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />

                {/* SECONDARY / ARCHITECTURAL PLACEHOLDER ROUTES */}
                <Route
                  path="/achievements"
                  element={
                    <PlaceholderPage
                      title="Club Achievements & Honors"
                      category="Recognition"
                      description="Comprehensive archive of SIET AI Club hackathon victories, patent filings, research papers, and national championships."
                    />
                  }
                />
                <Route
                  path="/hackathons"
                  element={
                    <PlaceholderPage
                      title="AI Hackathons & Buildathons"
                      category="Competitions"
                      description="Official schedules, problem statements, and registration guidelines for upcoming national and internal AI hackathons."
                    />
                  }
                />
                <Route
                  path="/workshops"
                  element={
                    <PlaceholderPage
                      title="Hands-On Masterclasses"
                      category="Workshops"
                      description="Curated technical bootcamps covering PyTorch, Generative AI, TensorRT acceleration, and Agentic RAG systems."
                    />
                  }
                />
                <Route
                  path="/events"
                  element={
                    <PlaceholderPage
                      title="Club Events & Seminars"
                      category="Schedule"
                      description="Upcoming tech talks, research paper reading circles, and faculty guest lectures at SIET AI Lab."
                    />
                  }
                />
                <Route
                  path="/collaborations"
                  element={
                    <PlaceholderPage
                      title="Industry Collaborations & MoUs"
                      category="Partnerships"
                      description="Enterprise joint-research partnerships, industrial capstone projects, and AI startup incubations."
                    />
                  }
                />
                <Route
                  path="/visitors"
                  element={
                    <PlaceholderPage
                      title="Distinguished Lab Visitors"
                      category="Visitors"
                      description="Record of academic scholars, industry leaders, and institutional delegations hosted at SIET AI Lab."
                    />
                  }
                />
                <Route
                  path="/team"
                  element={
                    <PlaceholderPage
                      title="Core Team & Faculty Mentors"
                      category="Leadership"
                      description="Meet the student leads, technical heads, and distinguished faculty advisors driving the SIET AI Club."
                    />
                  }
                />
                <Route
                  path="/contests"
                  element={
                    <PlaceholderPage
                      title="Kaggle & Algorithmic Contests"
                      category="Contests"
                      description="Monthly competitive ML leaderboards and model benchmark challenges for student developers."
                    />
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PlaceholderPage
                      title="Contact SIET AI Club"
                      category="Inquiries"
                      description="Get in touch with the AI Lab coordinator, project leads, or arrange an on-campus laboratory visit."
                    />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PlaceholderPage
                      title="Student & Faculty Portal"
                      category="Authentication"
                      description="Access restricted GPU compute allocations, cluster job submission queues, and project repositories."
                    />
                  }
                />

                {/* FALLBACK 404 NOT FOUND */}
                <Route
                  path="*"
                  element={
                    <NotFoundPage
                      title="Page Not Found"
                      message="The page you are looking for does not exist or has been moved."
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
