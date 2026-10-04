import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from '@/shared/ui/BrandIcons';
import type { ContactInfo } from '@/types';

const getSocialIcon = (platform: string) => {
  const norm = platform.toLowerCase();
  if (norm.includes('github')) return <GithubIcon className="w-4 h-4" />;
  if (norm.includes('linkedin')) return <LinkedinIcon className="w-4 h-4" />;
  if (norm.includes('twitter') || norm.includes('x')) return <TwitterIcon className="w-4 h-4" />;
  if (norm.includes('youtube')) return <YoutubeIcon className="w-4 h-4" />;
  return <Mail className="w-4 h-4" />;
};

export const ContactPreviewSection: React.FC<{ contact: ContactInfo }> = ({ contact }) => {
  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 p-8 md:p-12 shadow-xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT (7 cols): Title & Information */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20">
                  Connect With Us
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                  Visit the AI Club & AI Lab at SIET
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
                  Have questions about student projects, faculty sponsorships, or lab visits? Reach out to our student coordination board.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/10 backdrop-blur-md shadow-2xs">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">Email</span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/10 backdrop-blur-md shadow-2xs">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">Phone</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {contact.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/10 backdrop-blur-md shadow-2xs">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                <div className="text-sm text-slate-800 dark:text-slate-200">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-0.5">Location</span>
                  <span className="font-bold block">{contact.labLocation}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{contact.address}</span>
                </div>
              </div>
            </div>

            {/* RIGHT (5 cols): Socials & Action Button */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-center justify-center p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-white/10 backdrop-blur-md text-center shadow-xs">
              <span className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                Follow Club Updates & Repositories
              </span>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                {contact.socialLinks?.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.platform}
                    className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-white/10 hover:border-blue-400/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-slate-600 dark:text-slate-300 shadow-xs hover:scale-105"
                  >
                    {getSocialIcon(social.icon || social.platform)}
                  </a>
                ))}
              </div>

              <a
                href={`mailto:${contact.email}?subject=SIET%20AI%20Club%20Inquiry`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-500/20 active:scale-95 border border-blue-400/30"
              >
                <span>Send Lab Email Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
