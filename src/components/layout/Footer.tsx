import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Mail, MapPin, Phone, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from '../common/BrandIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-sm transition-colors text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent p-0.5 shadow-glow-sm flex items-center justify-center">
                <div className="w-full h-full bg-background dark:bg-card rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-foreground">
                  SIET AI CLUB • AI LAB
                </span>
                <span className="text-xs text-muted-foreground">
                  Sri Shakthi Institute of Engineering & Technology
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Fostering student research, open-source engineering, and real-world deployment of artificial intelligence systems in Computer Vision, NLP, and Edge Robotics.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/siet-ai-club"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/projects" className="hover:text-primary transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-primary transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link to="/hackathons" className="hover:text-primary transition-colors">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="hover:text-primary transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-primary transition-colors">
                  Events & Talks
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Labs */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Community
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/collaborations" className="hover:text-primary transition-colors">
                  Industry Collabs
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-primary transition-colors">
                  Core Team & Mentors
                </Link>
              </li>
              <li>
                <Link to="/contests" className="hover:text-primary transition-colors">
                  Kaggle Contests
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Campus Lab
            </h3>
            <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Block III, 2nd Floor, AI Lab, SIET Campus, Coimbatore, TN 641062</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:aiclub@siet.ac.in" className="hover:text-primary transition-colors">
                  aiclub@siet.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 422 2369900</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SIET AI Club & AI Lab. Sri Shakthi Institute of Engineering and Technology.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by SIET AI Club developers
          </p>
        </div>
      </div>
    </footer>
  );
};
