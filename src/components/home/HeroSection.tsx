import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Terminal, Cpu, Network, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Hero } from '../../types';

export const HeroSection: React.FC<{ hero: Hero }> = ({ hero }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-border/50">
      {/* Decorative background radial gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 ai-grid-pattern opacity-30 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: Text & CTAs (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-primary/10 text-primary border border-primary/25 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>{hero.smallLabel}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
              Building the Next Generation of{' '}
              <span className="ai-gradient-text">AI Engineers</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {hero.supportingText}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to={hero.primaryCta.url}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-primary text-primary-foreground hover:opacity-95 active:scale-95 shadow-glow hover:shadow-lg transition-all"
              >
                <span>{hero.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to={hero.secondaryCta.url}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-card border border-border text-foreground hover:bg-muted transition-all"
              >
                <span>{hero.secondaryCta.label}</span>
              </Link>
            </div>

            {/* Live Stats Strip */}
            {hero.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/60">
                {hero.stats.map((stat, idx) => (
                  <div key={idx} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT: AI Neural Network Computational Visualization (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card */}
              <div className="relative rounded-3xl border border-border/80 bg-card/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Visual Neural Diagram Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-muted-foreground">
                      ai_lab_core.py
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Live Cluster
                  </span>
                </div>

                {/* Computational Graphic SVG & Neural Nodes */}
                <div className="relative py-8 flex flex-col items-center justify-center">
                  <svg
                    className="w-full h-52 text-primary"
                    viewBox="0 0 400 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Interconnecting Synaptic Lines */}
                    <path d="M 60 50 Q 150 20 200 100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
                    <path d="M 60 100 Q 130 90 200 100" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                    <path d="M 60 150 Q 140 160 200 100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />

                    <path d="M 200 100 Q 270 40 340 60" stroke="currentColor" strokeWidth="2" opacity="0.7" />
                    <path d="M 200 100 Q 280 140 340 140" stroke="currentColor" strokeWidth="2" opacity="0.7" />

                    {/* Left Layer: Input Nodes */}
                    <circle cx="60" cy="50" r="14" className="fill-card stroke-primary" strokeWidth="2" />
                    <circle cx="60" cy="100" r="14" className="fill-primary text-primary-foreground stroke-primary" strokeWidth="2" />
                    <circle cx="60" cy="150" r="14" className="fill-card stroke-primary" strokeWidth="2" />

                    {/* Center Layer: Deep Hidden Layer */}
                    <circle cx="200" cy="100" r="22" className="fill-accent/20 stroke-accent" strokeWidth="3" />
                    <circle cx="200" cy="100" r="10" className="fill-accent animate-pulse" />

                    {/* Right Layer: Output Embeddings */}
                    <circle cx="340" cy="60" r="16" className="fill-card stroke-primary" strokeWidth="2" />
                    <circle cx="340" cy="140" r="16" className="fill-card stroke-accent" strokeWidth="2" />
                  </svg>

                  {/* Dynamic interactive overlay badges */}
                  <div className="absolute top-2 left-2 p-2.5 rounded-xl bg-background/90 dark:bg-card/90 border border-border shadow-md backdrop-blur-md flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <div className="text-[11px] font-mono leading-tight">
                      <span className="text-foreground font-semibold">RTX 4090 Nodes</span>
                      <p className="text-muted-foreground">FP16 Matrix Compute</p>
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2 p-2.5 rounded-xl bg-background/90 dark:bg-card/90 border border-border shadow-md backdrop-blur-md flex items-center gap-2">
                    <Network className="w-4 h-4 text-accent" />
                    <div className="text-[11px] font-mono leading-tight">
                      <span className="text-foreground font-semibold">Transformer RAG</span>
                      <p className="text-emerald-500">Latency: 140ms</p>
                    </div>
                  </div>
                </div>

                {/* Terminal status line */}
                <div className="mt-2 p-3 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span>siet-ai-cluster: active</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
