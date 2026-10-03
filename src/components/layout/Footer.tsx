import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Heart, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from '../common/BrandIcons';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-2xl transition-colors text-slate-800 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex flex-col group inline-block focus:outline-none">
              <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                SIET AI CLUB
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold">
                  AI LAB
                </span>
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Sri Shakthi Institute of Engineering & Technology
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Fostering student research, open-source engineering, and real-world deployment of artificial intelligence systems in Computer Vision, NLP, and Edge Robotics.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/siet-ai-club"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 backdrop-blur-md shadow-xs transition-all hover:scale-105"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 backdrop-blur-md shadow-xs transition-all hover:scale-105"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="p-2.5 rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 backdrop-blur-md shadow-xs transition-all hover:scale-105"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="p-2.5 rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 backdrop-blur-md shadow-xs transition-all hover:scale-105"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-900 dark:text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-blue-500 opacity-60" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-blue-500 opacity-60" />
                  <span>Projects Portfolio</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick AI Focus Topics */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-900 dark:text-white">
              Focus Areas
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-white/5">
                Computer Vision & Edge AI
              </li>
              <li className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-white/5">
                Agentic LLMs & RAG Systems
              </li>
              <li className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-white/5">
                Autonomous Systems & IoT
              </li>
            </ul>
          </div>

          {/* Campus AI Lab Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-900 dark:text-white">
              Campus AI Lab
            </h3>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-white/5">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>Block III, 2nd Floor, AI Lab, SIET Campus, Coimbatore, TN 641062</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-white/5">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <a href="mailto:aiclub@siet.ac.in" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  aiclub@siet.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-white/5">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>+91 422 2369900</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {CURRENT_YEAR} SIET AI Club & AI Lab. Sri Shakthi Institute of Engineering and Technology.</p>
          <p className="flex items-center gap-1.5">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by SIET AI Club developers
          </p>
        </div>
      </div>
    </footer>
  );
};
