import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-b border-border/50">
      {/* Visual background gradient with glass card */}
      <div className="absolute inset-0 ai-grid-pattern opacity-20 pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-primary/15 via-accent/15 to-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/30 bg-card/90 p-8 sm:p-12 md:p-16 text-center shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-primary/10 text-primary border border-primary/25 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join The Student AI Movement</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            Ready to Build With <span className="ai-gradient-text">Artificial Intelligence</span>?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you want to train state-of-the-art vision models, participate in national hackathons, or build transformative campus applications, SIET AI Club provides the compute, mentorship, and community.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm sm:text-base bg-primary text-primary-foreground hover:opacity-95 active:scale-95 shadow-glow hover:shadow-lg transition-all"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm sm:text-base bg-muted text-foreground border border-border hover:bg-muted/80 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Contact AI Club</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
