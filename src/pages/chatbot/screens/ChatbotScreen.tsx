import React from 'react';
import { PageShell } from '@/shared/ui/PageShell';

export const Chatbot: React.FC = () => (
  <PageShell title="AI Lab Assistant" description="Ask about hackathons, achievements, projects, research, and club activities">
    <div className="space-y-8">
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          This page will feature the chat interface with message history, typing indicator, suggested questions, rotating rings animation, and mock/real API modes.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
          <span className="px-3 py-1 rounded-full border">Message History</span>
          <span className="px-3 py-1 rounded-full border">Typing Indicator</span>
          <span className="px-3 py-1 rounded-full border">Suggested Questions</span>
          <span className="px-3 py-1 rounded-full border">Rotating Rings</span>
          <span className="px-3 py-1 rounded-full border">Mock/Real Mode</span>
          <span className="px-3 py-1 rounded-full border">Error/Retry</span>
        </div>
      </div>
    </div>
  </PageShell>
);