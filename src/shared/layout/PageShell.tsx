// src/shared/layout/PageShell.tsx
import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
    <Footer />
  </div>
);
