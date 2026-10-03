import React from 'react';
import { Target, Compass, Award, CheckCircle } from 'lucide-react';
import type { Overview } from '../../types';

export const OverviewSection: React.FC<{ overview: Overview }> = ({ overview }) => {
  return (
    <section className="py-16 md:py-24 border-b border-white/80 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: About Description & Lab Intro (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide uppercase bg-slate-200/60 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-white/10 shadow-xs backdrop-blur-md">
              <span>About The Ecosystem</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              AI Club Overview
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>{overview.about}</p>
            </div>

            {/* Scope Bullets */}
            <div className="pt-4 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold flex items-center gap-2">
                <Compass className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span>Primary Research Scope</span>
              </h3>
              <ul className="space-y-2.5">
                {overview.scope.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-300 mt-1.5 shrink-0 shadow-sm" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Aim & Goals Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* AIM CARD */}
            <div className="p-6 sm:p-8 rounded-3xl border border-white/90 dark:border-white/10 bg-gradient-to-br from-slate-100/90 via-white/80 to-slate-200/60 dark:from-slate-800/60 dark:via-slate-900/80 dark:to-slate-950/80 relative overflow-hidden backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Central Aim</h3>
              </div>
              <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {overview.aim}
              </p>
            </div>

            {/* GOALS CARD */}
            <div className="p-6 sm:p-8 rounded-3xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 shadow-md">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Institutional Goals</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {overview.goals.map((goal, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white dark:border-white/10 flex items-start gap-2.5 shadow-xs"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-snug">
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
