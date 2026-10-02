import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from '../common/BrandIcons';
import type { ContactInfo } from '../../types';

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
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/80 bg-card p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT (7 cols): Title & Information */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                  Connect With Us
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                  Visit the AI Club & AI Lab at SIET
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-2">
                  Have questions about student projects, faculty sponsorships, or lab visits? Reach out to our student coordination board.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-border/40">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono text-muted-foreground block">Email</span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-border/40">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono text-muted-foreground block">Phone</span>
                    <span className="text-sm font-semibold text-foreground">
                      {contact.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-border/40">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="text-sm text-foreground">
                  <span className="text-xs font-mono text-muted-foreground block mb-0.5">Location</span>
                  <span className="font-semibold block">{contact.labLocation}</span>
                  <span className="text-xs text-muted-foreground">{contact.address}</span>
                </div>
              </div>
            </div>

            {/* RIGHT (5 cols): Socials & Action Button */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-center justify-center p-6 sm:p-8 rounded-2xl bg-muted/40 border border-border/50 text-center">
              <span className="text-sm font-bold text-foreground mb-4">
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
                    className="p-3 rounded-xl bg-card border border-border/70 hover:border-primary/50 hover:text-primary transition-all text-muted-foreground shadow-sm"
                  >
                    {getSocialIcon(social.icon || social.platform)}
                  </a>
                ))}
              </div>

              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-primary text-primary-foreground hover:opacity-95 transition-all shadow-sm"
              >
                <span>Full Contact & Inquiry Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
