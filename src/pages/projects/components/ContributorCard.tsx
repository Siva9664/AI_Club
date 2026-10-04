import React from 'react';
import { User, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/shared/ui/BrandIcons';
import type { Person } from '@/types';

export const ContributorCard: React.FC<{ contributor: Person }> = ({ contributor }) => {
  const photoUrl = typeof contributor.photo === 'string' ? contributor.photo : contributor.photo?.url;

  return (
    <div className="glass-card flex items-center gap-4 p-4 rounded-3xl border border-white/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl shadow-xs hover:shadow-md transition-all">
      <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-white/90 dark:border-white/10 flex items-center justify-center shadow-2xs">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={contributor.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <User className="w-6 h-6 text-muted-foreground" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm sm:text-base font-bold text-foreground truncate">
          {contributor.name}
        </h4>
        <p className="text-xs text-muted-foreground truncate">{contributor.role}</p>

        <div className="flex items-center gap-3 mt-2">
          {contributor.github && (
            <a
              href={contributor.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${contributor.name}'s GitHub`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {contributor.linkedin && (
            <a
              href={contributor.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${contributor.name}'s LinkedIn`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {contributor.profileLink && (
            <a
              href={contributor.profileLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`${contributor.name}'s Profile`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
