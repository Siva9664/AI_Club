// src/app/App.tsx

import { Router } from './router';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ScrollToTop } from '../shared/layout/ScrollToTop';

export const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <ScrollToTop />
      <Router />
    </AuthProvider>
  </ThemeProvider>
);
