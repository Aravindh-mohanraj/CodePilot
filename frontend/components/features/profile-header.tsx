"use client";

import React from 'react';
import { User } from '@/types';
import { ShieldCheck, Link2 } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start w-full">
      {/* Left Details Panel */}
      <div className="lg:col-span-8 flex flex-col md:flex-row gap-xl items-center md:items-end w-full">
        {/* Avatar block */}
        <div className="relative shrink-0 group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl transition-transform group-hover:scale-[1.02] duration-300">
            <img 
              className="w-full h-full object-cover" 
              src={user.avatarUrl} 
              alt={user.name}
              onError={(e) => {
                e.currentTarget.src = "/images/alex-rivera.jpg";
              }}
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary-container p-1 rounded-lg flex items-center justify-center shadow-lg border border-primary/30">
            <ShieldCheck className="w-5 h-5 text-on-primary-container fill-current" />
          </div>
        </div>

        {/* User Info details */}
        <div className="flex-1 space-y-md text-center md:text-left">
          <div className="space-y-1">
            <h2 className="font-display-lg text-display-lg font-bold tracking-tight text-on-surface">
              {user.name}
            </h2>
            <p className="font-body-md text-body-md text-primary font-semibold">
              {user.title} @ {user.company}
            </p>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl text-sm leading-relaxed">
            {user.bio}
          </p>
          
          {/* Social connections */}
          <div className="flex flex-wrap justify-center md:justify-start gap-md text-xs">
            {user.website && (
              <a 
                className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-medium" 
                href={`https://${user.website}`}
                target="_blank"
                rel="noreferrer"
              >
                <Link2 className="w-4 h-4" />
                <span>{user.website}</span>
              </a>
            )}
            {user.linkedin && (
              <a 
                className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-medium" 
                href={`https://linkedin.com/in/${user.linkedin}`}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            )}
            {user.github && (
              <a 
                className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-medium" 
                href={`https://github.com/${user.github}`}
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right Rank progress Panel */}
      <div className="lg:col-span-4 glass-panel rounded-2xl p-lg flex flex-col justify-between h-full border-t border-primary/20 text-left bg-[#1f1f27]/40 backdrop-blur-xl border border-white/5 w-full">
        <div className="space-y-sm w-full">
          <div className="flex justify-between items-center text-xs">
            <span className="font-label-md text-on-surface-variant uppercase tracking-wider font-bold">PREPARATION RANK</span>
            <span className="font-label-md text-primary bg-primary/10 px-sm py-1 rounded-full font-bold">
              {user.rankPercentile}
            </span>
          </div>
          <div className="text-display-lg-mobile md:text-3xl font-black text-on-surface leading-tight mt-1">
            {user.rank}
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mt-md">
            <div 
              className="bg-primary h-full transition-all duration-700 shadow-[0_0_10px_rgba(192,193,255,0.4)]" 
              style={{ width: `${(user.xp / user.xpMax) * 100}%` }}
            />
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-right text-xs mt-1">
            {user.xp.toLocaleString()} / {user.xpMax.toLocaleString()} XP
          </p>
        </div>
      </div>
    </div>
  );
}
