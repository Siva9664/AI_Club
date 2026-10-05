import React from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  photo: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide uppercase bg-slate-900/60 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-4 backdrop-blur-xl">
            <Quote className="w-3.5 h-3.5 text-cyan-400" />
            <span>Perspectives</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            What Our Visitors <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Distinguished guests share their experiences collaborating with our students and faculty
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="glass-card rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-8 md:p-12 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-slate-200/20 dark:text-white/10">
                <Quote className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <blockquote className="text-center">
                  <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-800 dark:text-slate-100 leading-relaxed mb-8">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  <footer className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-4">
                      <img
                        src={current.photo}
                        alt={current.author}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white/80 dark:ring-white/10 shadow-lg"
                      />
                      <div className="text-left">
                        <cite className="not-italic font-bold text-slate-900 dark:text-white">
                          {current.author}
                        </cite>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{current.role}</p>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className={cn(
                'p-3 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-white/90 dark:border-white/10 shadow-sm backdrop-blur-md transition-all',
                'focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all',
                    idx === currentIndex
                      ? 'bg-blue-500 w-8'
                      : 'bg-slate-300/50 dark:bg-slate-600/50 hover:bg-slate-400/50 dark:hover:bg-slate-500/50'
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-current={idx === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className={cn(
                'p-3 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-white/90 dark:border-white/10 shadow-sm backdrop-blur-md transition-all',
                'focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};