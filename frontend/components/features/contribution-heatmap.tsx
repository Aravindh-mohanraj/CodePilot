"use client";

import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export default function ContributionHeatmap() {
  // Generate mock year activity data (365 days)
  const heatmapData = useMemo(() => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const days: HeatmapDay[] = [];
    const today = new Date();
    
    // Start from 365 days ago
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Simulate activity pattern
      const dayOfWeek = date.getDay();
      let count = 0;
      
      const rand1 = seededRandom(i + 1);
      const rand2 = seededRandom(i + 2);

      // Candidates solve more on weekdays, less on weekends
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // 70% chance of solving on weekdays
        if (rand1 < 0.7) {
          count = Math.floor(rand2 * 6); // 0 to 5 contributions
        }
      } else {
        // 20% chance of solving on weekends
        if (rand1 < 0.2) {
          count = Math.floor(rand2 * 3);
        }
      }

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count === 0) level = 0;
      else if (count <= 1) level = 1;
      else if (count <= 2) level = 2;
      else if (count <= 4) level = 3;
      else level = 4;

      const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      days.push({
        date: dateStr,
        count,
        level
      });
    }
    return days;
  }, []);

  const totalContributions = useMemo(() => {
    return heatmapData.reduce((sum, d) => sum + d.count, 0);
  }, [heatmapData]);

  const getCellColor = (level: HeatmapDay['level']) => {
    switch (level) {
      case 1: return 'bg-primary/20 hover:bg-primary/30';
      case 2: return 'bg-primary/40 hover:bg-primary/50';
      case 3: return 'bg-primary/60 hover:bg-primary/70';
      case 4: return 'bg-primary hover:brightness-110';
      case 0:
      default:
        return 'bg-surface-container-highest/60 hover:bg-surface-container-highest';
    }
  };

  return (
    <div className="glass-panel p-lg rounded-2xl space-y-lg border border-white/5 bg-[#1f1f27]/40 backdrop-blur-xl w-full text-left">
      <div className="flex justify-between items-center">
        <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Activity History</h3>
        <div className="flex gap-xs">
          <button className="p-1 hover:bg-surface-container-highest rounded-lg text-on-surface-variant transition-colors cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-surface-container-highest rounded-lg text-on-surface-variant transition-colors cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid container with horizontal scroll capability on smaller viewports */}
      <div className="w-full overflow-x-auto custom-scrollbar pb-sm">
        <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-[620px] pr-md">
          {heatmapData.map((day, idx) => (
            <div
              key={idx}
              title={`${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date}`}
              className={`w-3 h-3 rounded-sm transition-all cursor-pointer ${getCellColor(day.level)}`}
            />
          ))}
        </div>
      </div>

      {/* Footer stats summary */}
      <div className="flex justify-between items-center text-on-surface-variant text-[10px] font-label-md pt-xs border-t border-white/5">
        <p className="font-bold tracking-wider uppercase opacity-75">{totalContributions} contributions in the last year</p>
        
        <div className="flex items-center gap-xs">
          <span className="opacity-70">Less</span>
          <div className="flex gap-[2px]">
            <div className="w-2.5 h-2.5 rounded-sm bg-surface-container-highest/60" />
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/20" />
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/40" />
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/60" />
            <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
          </div>
          <span className="opacity-70">More</span>
        </div>
      </div>
    </div>
  );
}
