import React from 'react';
import GlassCard from './glass-card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  subtextColorClass?: string;
  icon?: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  subtext,
  subtextColorClass = "text-on-surface-variant",
  icon
}: StatCardProps) {
  return (
    <GlassCard className="p-md rounded-xl" hoverGlow={true}>
      <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block mb-xs">
        {title}
      </span>
      <div className="flex items-baseline justify-between w-full mt-1">
        <div className="flex items-baseline gap-xs">
          <span className="font-headline-md text-headline-md text-on-surface font-bold">
            {value}
          </span>
          <span className={`text-[11px] font-medium leading-none ${subtextColorClass}`}>
            {subtext}
          </span>
        </div>
        {icon && (
          <div className="shrink-0 ml-sm self-center">
            {icon}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
