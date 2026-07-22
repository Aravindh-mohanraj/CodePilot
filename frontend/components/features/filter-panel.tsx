"use client";

import React from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  selectedCompanies: string[];
  onCompanyToggle: (company: string) => void;
  difficultyFilter: string;
  onDifficultyChange: (difficulty: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const TOPICS = [
  'All Topics',
  'Arrays',
  'Strings',
  'Dynamic Programming',
  'Graphs',
  'System Design',
  'Heaps'
];

const COMPANIES = [
  'Google',
  'Meta',
  'Amazon',
  'Netflix'
];

export default function FilterPanel({
  selectedTopic,
  onTopicChange,
  selectedCompanies,
  onCompanyToggle,
  difficultyFilter,
  onDifficultyChange,
  sortBy,
  onSortChange
}: FilterPanelProps) {
  return (
    <div className="space-y-xl w-full">
      {/* Topic pills list */}
      <div className="flex flex-wrap gap-sm">
        {TOPICS.map((topic) => {
          const isActive = selectedTopic === topic;
          return (
            <button
              key={topic}
              onClick={() => onTopicChange(topic)}
              className={`px-lg py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 duration-200 cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary-container font-bold shadow-md ai-glow'
                  : 'bg-[#1b1b23]/50 glass-panel border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              {topic}
            </button>
          );
        })}
      </div>

      {/* Sub Filter strip (Double grids on mobile, single bar on desktop) */}
      <div className="flex flex-col lg:flex-row gap-lg items-stretch lg:items-center justify-between bg-surface-container-low p-md rounded-2xl border border-outline-variant/10">
        
        {/* Company Quick Badges */}
        <div className="flex flex-wrap gap-md items-center">
          <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest text-xs font-semibold mr-sm">
            Companies:
          </span>
          <div className="flex flex-wrap gap-xs">
            {COMPANIES.map((company) => {
              const isActive = selectedCompanies.includes(company);
              return (
                <button
                  key={company}
                  onClick={() => onCompanyToggle(company)}
                  className={`flex items-center gap-xs px-md py-1.5 rounded-lg text-label-md font-medium border transition-all active:scale-95 duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container border-primary shadow-md'
                      : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-on-surface'
                  }`}
                >
                  <span className="text-xs">{company}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdowns filters */}
        <div className="flex gap-md flex-row items-center w-full lg:w-auto">
          {/* Difficulty Dropdown */}
          <div className="relative flex-1 lg:flex-initial">
            <select
              value={difficultyFilter}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="appearance-none bg-surface-container border border-outline-variant/30 rounded-xl py-2 pl-lg pr-10 text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full font-label-md text-label-md text-xs cursor-pointer text-on-surface font-semibold"
            >
              <option value="All">Difficulty: All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-on-surface-variant" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-1 lg:flex-initial">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-surface-container border border-outline-variant/30 rounded-xl py-2 pl-lg pr-10 text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full font-label-md text-label-md text-xs cursor-pointer text-on-surface font-semibold"
            >
              <option value="Popular">Sort: Popular</option>
              <option value="Newest">Newest</option>
              <option value="Frequency">Frequency</option>
              <option value="Difficulty">Difficulty</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-on-surface-variant" />
          </div>
        </div>

      </div>
    </div>
  );
}
