"use client";

import React, { useState } from 'react';
import { Company } from '@/types';
import { 
  X, 
  Play, 
  Building2, 
  Lock, 
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface CompanyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanyModal({ company, isOpen, onClose }: CompanyModalProps) {
  const [activeTab, setActiveTab] = useState<'questions' | 'overview' | 'tips'>('questions');

  if (!isOpen || !company) return null;

  const totalQuestions = company.difficultyBreakdown.easy + 
                         company.difficultyBreakdown.medium + 
                         company.difficultyBreakdown.hard;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md md:p-3xl">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Dialog Content */}
      <div className="glass-card w-full max-w-4xl h-full max-h-[85vh] rounded-3xl overflow-hidden relative flex flex-col shadow-2xl border border-white/10 bg-[#13131b]/95 z-10 text-left">
        
        {/* Modal Header */}
        <div className="p-xl border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high/40">
          <div className="flex items-center gap-lg">
            {/* Brand Circle Badge */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${company.brandColor}`}>
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                {company.name} Interview Guide
              </h2>
              <p className="text-on-surface-variant font-body-sm text-body-sm text-sm">
                <span className="text-primary font-bold">{company.questionCount}+</span> questions collected from real interviews
              </p>
            </div>
          </div>
          <button 
            className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-outline-variant/40 text-on-surface-variant hover:text-on-surface transition-all cursor-pointer"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-outline-variant/10 px-xl bg-surface-container-low/20 text-sm font-semibold">
          <button 
            onClick={() => setActiveTab('questions')}
            className={`py-md px-md border-b-2 transition-all cursor-pointer ${
              activeTab === 'questions' 
                ? 'border-primary text-primary font-bold' 
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Top Questions
          </button>
          <button 
            onClick={() => setActiveTab('overview')}
            className={`py-md px-md border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview' 
                ? 'border-primary text-primary font-bold' 
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Interview Rounds &amp; Format
          </button>
          <button 
            onClick={() => setActiveTab('tips')}
            className={`py-md px-md border-b-2 transition-all cursor-pointer ${
              activeTab === 'tips' 
                ? 'border-primary text-primary font-bold' 
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Preparation Tips &amp; Feedback
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-xl custom-scrollbar space-y-xl bg-[#13131b]/20">
          
          {activeTab === 'questions' && (
            <div className="space-y-md">
              <div className="flex justify-between items-center mb-sm">
                <h4 className="font-bold text-on-surface text-sm uppercase tracking-wider text-on-surface-variant/75">
                  Frequently Asked Problems
                </h4>
                <div className="flex gap-sm">
                  {company.topics.map((t) => (
                    <span key={t} className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* List of Questions */}
              <div className="space-y-sm">
                {company.taggedQuestions.map((q, idx) => {
                  const isEasy = q.difficulty === 'Easy';
                  const isHard = q.difficulty === 'Hard';
                  
                  return (
                    <div 
                      key={q.title}
                      className="p-md bg-surface-container-low border border-outline-variant/10 rounded-xl flex justify-between items-center hover:bg-surface-container-high transition-all group"
                    >
                      <div className="flex gap-md items-center text-left">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-body-md text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                            {q.title}
                          </p>
                          <div className="flex gap-sm mt-xs text-[10px] items-center">
                            <span className={`px-1.5 py-0.5 rounded uppercase font-bold ${
                              isEasy 
                                ? 'text-green-400 border border-green-500/20 bg-green-500/5' 
                                : isHard 
                                  ? 'text-error border border-error/20 bg-error/5' 
                                  : 'text-tertiary border border-tertiary/20 bg-tertiary/5'
                            }`}>
                              {q.difficulty}
                            </span>
                            <span className="text-on-surface-variant/60 font-mono">
                              Frequency: {q.frequencyPercent}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {q.isLocked ? (
                        <div className="p-2 text-on-surface-variant/30">
                          <Lock className="w-5 h-5" />
                        </div>
                      ) : (
                        <Link href={`/explore?q=${encodeURIComponent(company.name)}`}>
                          <button className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary hover:text-on-primary-container transition-all cursor-pointer">
                            <Play className="w-4 h-4 fill-current" />
                          </button>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl text-left">
              {/* Left Column: Description & Rounds */}
              <div className="space-y-lg">
                <div>
                  <h4 className="font-bold text-on-surface text-sm uppercase tracking-wider text-on-surface-variant/75 mb-xs">
                    Overview
                  </h4>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed text-sm">
                    {company.overview}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-on-surface text-sm uppercase tracking-wider text-on-surface-variant/75 mb-md">
                    Interview Rounds
                  </h4>
                  <ol className="relative space-y-md border-l border-outline-variant/30 pl-4 ml-2">
                    {company.rounds.map((round, idx) => (
                      <li key={round} className="relative">
                        <div className="absolute -left-7 top-1 w-5 h-5 rounded-full bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center text-[10px] font-bold text-primary">
                          {idx + 1}
                        </div>
                        <span className="text-sm text-on-surface font-semibold block">{round}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Right Column: Difficulty Breakdown */}
              <div className="space-y-lg">
                <div>
                  <h4 className="font-bold text-on-surface text-sm uppercase tracking-wider text-on-surface-variant/75 mb-md">
                    Question Index Breakdown
                  </h4>
                  <div className="space-y-md">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-green-400">Easy ({company.difficultyBreakdown.easy})</span>
                        <span className="text-on-surface-variant">
                          {Math.round(company.difficultyBreakdown.easy / totalQuestions * 100)}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${company.difficultyBreakdown.easy / totalQuestions * 100}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-tertiary">Medium ({company.difficultyBreakdown.medium})</span>
                        <span className="text-on-surface-variant">
                          {Math.round(company.difficultyBreakdown.medium / totalQuestions * 100)}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary" style={{ width: `${company.difficultyBreakdown.medium / totalQuestions * 100}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-error">Hard ({company.difficultyBreakdown.hard})</span>
                        <span className="text-on-surface-variant">
                          {Math.round(company.difficultyBreakdown.hard / totalQuestions * 100)}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-error" style={{ width: `${company.difficultyBreakdown.hard / totalQuestions * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-xl text-left">
              <div>
                <h4 className="font-bold text-on-surface text-sm uppercase tracking-wider text-on-surface-variant/75 mb-xs">
                  Preparation Tips
                </h4>
                <p className="text-body-sm text-on-surface-variant leading-relaxed text-sm bg-primary/5 p-md border border-primary/10 rounded-xl">
                  {company.prepTips}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-on-surface text-sm uppercase tracking-wider text-on-surface-variant/75 mb-md">
                  Recent Interview Candidate Experience
                </h4>
                <div className="space-y-md">
                  {company.experiences.map((exp, idx) => (
                    <div 
                      key={idx} 
                      className="p-md bg-surface-container-high/40 border border-outline-variant/15 rounded-xl italic text-sm text-on-surface-variant leading-relaxed relative pl-8"
                    >
                      <Sparkles className="w-4 h-4 text-primary absolute left-3 top-4 shrink-0" />
                      &ldquo;{exp}&rdquo;
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-xl bg-surface-container-high/60 flex justify-end gap-md border-t border-outline-variant/10">
          <button 
            onClick={onClose}
            className="text-on-surface-variant font-label-md text-label-md hover:text-on-surface font-semibold text-sm mr-auto"
          >
            Cancel
          </button>
          
          <Link href={company.startPracticeUrl}>
            <button className="bg-primary text-on-primary-container px-xl py-md rounded-xl font-label-md text-label-md shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all font-bold text-sm">
              Start Practice Session
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
