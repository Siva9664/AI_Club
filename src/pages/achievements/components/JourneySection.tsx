import React from 'react';
import { motion } from 'framer-motion';

/** The six-stage journey, copied verbatim from achievement.html. */
const STAGES = [
  {
    tag: 'STAGE 01',
    name: 'LEARN',
    desc: 'Master mathematical foundations, PyTorch, LLMs, and agentic workflows.',
    icon: (
      <>
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
  },
  {
    tag: 'STAGE 02',
    name: 'BUILD',
    desc: 'Architect open-source neural frameworks, vision models, and web tools.',
    icon: (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
  },
  {
    tag: 'STAGE 03',
    name: 'COMPETE',
    desc: 'Form elite squads for international hackathons & Kaggle leaderboards.',
    icon: (
      <>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </>
    ),
  },
  {
    tag: 'STAGE 04',
    name: 'COLLABORATE',
    desc: 'Partner with CERN, DeepLearning.AI, academic labs, and tech firms.',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    tag: 'STAGE 05',
    name: 'ACHIEVE',
    desc: 'Win grand championships, publish in IEEE, and earn industry credentials.',
    icon: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    ),
  },
  {
    tag: 'STAGE 06',
    name: 'LEAD',
    desc: 'Mentor rising juniors, drive keynote summits, and direct club strategy.',
    icon: (
      <>
        <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z" />
        <path d="M19 11v1a7 7 0 0 1-14 0v-1" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </>
    ),
  },
];

export const JourneySection: React.FC = () => (
  <section id="ach-journey" className="py-16 md:py-24" aria-labelledby="ach-journey-heading">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/25 mb-4">
          The Student Journey
        </span>
        <h2
          id="ach-journey-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white"
        >
          From Classroom to Command Center
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Every member walks the same six stages inside the AI Lab.
        </p>
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {STAGES.map((stage, idx) => (
          <motion.li
            key={stage.tag}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center text-center rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-400/25 flex items-center justify-center mb-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-cyan-600 dark:text-cyan-300"
                aria-hidden="true"
              >
                {stage.icon}
              </svg>
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400">
              {stage.tag}
            </span>
            <h3 className="mt-1 text-lg font-black text-slate-900 dark:text-white">{stage.name}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{stage.desc}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);