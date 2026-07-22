"use client";

import React from 'react';
import { Lock } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  isLocked?: boolean;
}

export default function AchievementBadge({
  title,
  icon,
  colorClass,
  isLocked = false
}: AchievementBadgeProps) {
  return (
    <div 
      className={`flex flex-col items-center group cursor-pointer transition-all duration-300 ${
        isLocked ? 'opacity-40 grayscale' : 'hover:scale-105'
      }`}
    >
      <div 
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-xs shadow-lg relative overflow-hidden transition-transform duration-300 ${
          isLocked 
            ? 'bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant/40' 
            : `${colorClass} shadow-primary/5 hover:scale-110`
        }`}
      >
        {isLocked ? (
          <Lock className="w-5 h-5" />
        ) : (
          icon
        )}
      </div>
      <span className="text-[10px] text-center font-label-md text-on-surface-variant font-medium max-w-[80px] leading-tight">
        {title}
      </span>
    </div>
  );
}
