import React from 'react';
import { Activity } from '@/types';

interface ActivityTimelineProps {
  activities: Activity[];
}

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
  // Helper to safely render bold spans or standard text from activity string
  const formatActivityText = (text: string, type: string) => {
    if (type === 'solved') {
      const match = text.match(/(Solved) ("[^"]+") (in \d+ mins\.)/);
      if (match) {
        return (
          <>
            <span className="font-bold text-primary">{match[1]}</span>{' '}
            <span className="text-on-surface font-semibold">{match[2]}</span>{' '}
            <span className="text-on-surface-variant">{match[3]}</span>
          </>
        );
      }
    }
    if (type === 'badge') {
      const match = text.match(/(Earned Badge:) ("[^"]+")/);
      if (match) {
        return (
          <>
            <span className="font-bold text-secondary">{match[1]}</span>{' '}
            <span className="text-on-surface font-bold">{match[2]}</span>
          </>
        );
      }
    }
    if (type === 'download') {
      const match = text.match(/(Downloaded) ("[^"]+")/);
      if (match) {
        return (
          <>
            <span className="font-bold text-tertiary">{match[1]}</span>{' '}
            <span className="text-on-surface font-semibold">{match[2]}</span>
          </>
        );
      }
    }
    return text;
  };

  return (
    <div className="relative space-y-lg before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant/20">
      {activities.map((activity) => (
        <div key={activity.id} className="relative pl-8 group">
          {/* Timeline Dot Indicator */}
          <div 
            className={`absolute left-0 top-1 w-4 h-4 rounded-full border-4 border-[#13131b] z-10 transition-all duration-300 group-hover:scale-125 ${activity.color}`} 
          />
          {/* Timestamp */}
          <span className="block text-[10px] text-on-surface-variant uppercase font-bold mb-1 tracking-wider">
            {activity.date}
          </span>
          {/* Main Text */}
          <p className="font-body-sm text-body-sm text-on-surface leading-snug">
            {formatActivityText(activity.text, activity.type)}
          </p>
          {/* Subtext Detail */}
          {activity.subtext && (
            <p className="text-[10px] text-on-surface-variant mt-1 font-medium">
              {activity.subtext}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
