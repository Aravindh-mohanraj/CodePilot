"use client";

import React from 'react';
import Link from 'next/link';
import { Question } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Bookmark, ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  isSelected: boolean;
  onSelectToggle: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

export default function QuestionCard({
  question,
  isSelected,
  onSelectToggle,
  isBookmarked,
  onBookmarkToggle
}: QuestionCardProps) {
  const getDifficultyStyles = (difficulty: Question['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'Medium':
        return 'bg-tertiary-container/20 text-tertiary border border-tertiary/20';
      case 'Hard':
        return 'bg-error-container/20 text-error border border-error/20';
    }
  };

  const isHardOrRecommended = question.difficulty === 'Hard' || question.isRecommended;

  return (
    <div 
      className={`glass-panel rounded-xl p-lg flex flex-col md:flex-row items-center gap-lg hover:bg-surface-container-high transition-all duration-300 relative group border-t border-b border-l-4 border-white/5 ${
        question.isRecommended 
          ? 'border-l-primary animate-pulse-glow bg-[#1f1f27]/30' 
          : 'border-l-transparent bg-[#13131b]/40'
      }`}
    >
      {/* Checkbox Selector */}
      <div className="flex items-center shrink-0 self-start md:self-center">
        <Checkbox 
          id={`select-${question.id}`} 
          checked={isSelected}
          onCheckedChange={onSelectToggle}
          className="border-outline-variant/60 data-[state=checked]:bg-primary data-[state=checked]:text-on-primary-container h-5 w-5 rounded cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          aria-label={`Select question ${question.title}`}
        />
      </div>

      {/* Question Details */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-md mb-xs flex-wrap">
          {question.isRecommended ? (
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded tracking-widest uppercase">
              RECOMMENDED
            </span>
          ) : (
            <span className="text-label-md font-bold text-tertiary">
              #{question.id}
            </span>
          )}
          <Link href={`/questions/${question.id}`} className="focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:outline-none">
            <h3 className="font-title-lg text-title-lg font-bold text-on-surface group-hover:text-primary transition-colors truncate">
              {question.title}
            </h3>
          </Link>
        </div>

        <div className="flex flex-wrap gap-md items-center text-xs mt-1.5">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getDifficultyStyles(question.difficulty)}`}>
            {question.difficulty}
          </span>
          {question.companies.length > 0 && (
            <div className="flex gap-xs items-center">
              <span className="text-on-surface-variant/60">Top Companies:</span>
              <div className="flex flex-wrap gap-xs">
                {question.companies.map((c) => (
                  <span 
                    key={c}
                    className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium text-[10px]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Acceptance, Est. Time, Solve and Bookmark Buttons */}
      <div className="flex items-center justify-between md:justify-end gap-md md:gap-xl text-on-surface-variant shrink-0 w-full md:w-auto border-t border-white/5 pt-md md:pt-0 md:border-none">
        <div className="text-center">
          <p className="text-[10px] font-label-md opacity-60 uppercase tracking-wider">Acceptance</p>
          <p className="font-bold text-on-surface text-sm mt-0.5">{question.acceptance}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-label-md opacity-60 uppercase tracking-wider">Est. Time</p>
          <p className="font-bold text-on-surface text-sm mt-0.5">{question.estimatedTime}</p>
        </div>
        
        <div className="flex items-center gap-sm">
          {/* Bookmark Trigger */}
          <button 
            onClick={onBookmarkToggle}
            className={`p-2 rounded-xl border transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
              isBookmarked 
                ? 'bg-primary/20 border-primary text-primary' 
                : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
            }`}
            aria-label={isBookmarked ? `Remove bookmark for ${question.title}` : `Bookmark ${question.title}`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Action trigger */}
          <Link href={`/questions/${question.id}`} tabIndex={-1}>
            <button 
              className={`px-xl py-3 rounded-xl font-bold font-label-md text-label-md flex items-center gap-xs group/btn active:scale-95 transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                isHardOrRecommended
                  ? 'bg-primary text-on-primary-container hover:brightness-110 shadow-primary/10'
                  : 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-on-primary-container shadow-primary/5'
              }`}
            >
              Solve
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}
