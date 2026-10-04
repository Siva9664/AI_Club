import React from 'react';
import { PageShell } from '@/shared/ui/PageShell';

export const Visitors: React.FC = () => (
  <PageShell title="Visitors & Distinguished Guests" description="International delegations, industry experts, academics, and alumni who visited our AI Lab">
    <div className="space-y-8">
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          This page will showcase visitor cards, category tabs (Delegations, Keynotes, Lab Sessions, Roundtables), bento gallery with lightbox, testimonials, and contact form.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
          <span className="px-3 py-1 rounded-full border">Hero Section</span>
          <span className="px-3 py-1 rounded-full border">Stats Cards</span>
          <span className="px-3 py-1 rounded-full border">Filter Sidebar</span>
          <span className="px-3 py-1 rounded-full border">Visitor Grid</span>
          <span className="px-3 py-1 rounded-full border">Bento Gallery</span>
          <span className="px-3 py-1 rounded-full border">Lightbox</span>
          <span className="px-3 py-1 rounded-full border">Testimonials</span>
          <span className="px-3 py-1 rounded-full border">Contact Form</span>
        </div>
      </div>
    </div>
  </PageShell>
);