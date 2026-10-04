import React from 'react';
import { PageShell } from '@/shared/ui/PageShell';

export const Login: React.FC = () => (
  <PageShell title="Member Login" description="Sign in to access the AI Lab member portal">
    <div className="space-y-8">
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          This page will feature the validated login/register forms with loading/error states, AuthProvider integration, user menu with logout, and demo credentials.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
          <span className="px-3 py-1 rounded-full border">Login Form</span>
          <span className="px-3 py-1 rounded-full border">Register Form</span>
          <span className="px-3 py-1 rounded-full border">Validation</span>
          <span className="px-3 py-1 rounded-full border">AuthProvider</span>
          <span className="px-3 py-1 rounded-full border">User Menu</span>
          <span className="px-3 py-1 rounded-full border">Demo Credentials</span>
        </div>
      </div>
    </div>
  </PageShell>
);