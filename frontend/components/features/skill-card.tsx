"use client";

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import GlassCard from '../cards/glass-card';

interface SkillCardProps {
  title: string;
  solvedCount: number;
  totalCount: number;
  progress: number;
  trend: 'up' | 'down' | 'stable';
}

export default function SkillCard({
  title,
  solvedCount,
  totalCount,
  progress,
  trend
}: SkillCardProps) {
  const renderTrendIcon = () => {
    switch (trend) {
      case 'up':
        return (
          <div className="flex items-center gap-xs text-green-400 text-[10px] font-bold uppercase bg-green-500/10 px-sm py-[2px] rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Improving</span>
          </div>
        );
      case 'down':
        return (
          <div className="flex items-center gap-xs text-error text-[10px] font-bold uppercase bg-error/10 px-sm py-[2px] rounded-full">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Slowing</span>
          </div>
        );
      case 'stable':
      default:
        return (
          <div className="flex items-center gap-xs text-primary text-[10px] font-bold uppercase bg-primary/10 px-sm py-[2px] rounded-full">
            <Minus className="w-3.5 h-3.5" />
            <span>Stable</span>
          </div>
        );
    }
  };

  return (
    <GlassCard className="p-lg rounded-2xl flex flex-col justify-between border border-white/5 bg-[#1f1f27]/40 backdrop-blur-xl h-full text-left" hoverGlow={true}>
      <div>
        <div className="flex justify-between items-start mb-md w-full">
          <h4 className="font-headline-sm text-lg font-bold text-on-surface">
            {title}
          </h4>
          {renderTrendIcon()}
        </div>

        <div className="flex justify-between items-baseline mb-xs text-xs font-semibold">
          <span className="text-on-surface-variant">
            {solvedCount} / {totalCount} Solved
          </span>
          <span className="text-primary font-bold">
            {progress}%
          </span>
        </div>
      </div>

      <div className="w-full mt-auto">
        <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] text-on-surface-variant/60 font-medium mt-sm">
          {totalCount - solvedCount} problems remaining
        </p>
      </div>
    </GlassCard>
  );
}
