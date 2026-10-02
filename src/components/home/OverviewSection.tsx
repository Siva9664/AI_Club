import React from 'react';
import { Target, Compass, Award, CheckCircle } from 'lucide-react';
import type { Overview } from '../../types';

export const OverviewSection: React.FC<{ overview: Overview }> = ({ overview }) => {
  return (
    <section className="py-16 md:py-24 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: About Description & Lab Intro (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
              <span>About The Ecosystem</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              AI Club Overview
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>{overview.about}</p>
            </div>

            {/* Scope Bullets */}
            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-mono uppercase tracking-wider text-foreground font-bold flex items-center gap-2">
                <Compass className="w-4 h-4 text-primary" />
                <span>Primary Research Scope</span>
              </h3>
              <ul className="space-y-2.5">
                {overview.scope.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Aim & Goals Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* AIM CARD */}
            <div className="p-6 sm:p-8 rounded-3xl border border-primary/30 bg-primary/5 relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-primary/15 text-primary">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Our Central Aim</h3>
              </div>
              <p className="text-base text-foreground/90 leading-relaxed font-medium">
                {overview.aim}
              </p>
            </div>

            {/* GOALS CARD */}
            <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-accent/15 text-accent">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Institutional Goals</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {overview.goals.map((goal, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-muted/40 border border-border/50 flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-snug">
                      {goal}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
