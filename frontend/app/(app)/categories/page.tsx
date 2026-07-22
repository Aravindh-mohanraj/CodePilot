"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Inbox, 
  ShieldAlert, 
  Plus, 
  Flame, 
  RefreshCw
} from 'lucide-react';
import GlassCard from '@/components/cards/glass-card';
import CategoryCard from '@/components/features/category-card';
import { MOCK_CATEGORIES } from '@/lib/constants';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  
  // Demo States
  const [demoState, setDemoState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');
  const [internalLoading, setInternalLoading] = useState(false);

  const triggerStateChange = (state: 'normal' | 'loading' | 'empty' | 'error') => {
    setInternalLoading(true);
    setTimeout(() => {
      setDemoState(state);
      setInternalLoading(false);
    }, 500);
  };

  // Filter Categories
  const filteredCategories = MOCK_CATEGORIES.filter((category) => {
    // 1. Search Query Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = category.name.toLowerCase().includes(query);
      const matchesDesc = category.description.toLowerCase().includes(query);
      if (!matchesName && !matchesDesc) return false;
    }

    // 2. Difficulty Level Filter
    if (levelFilter !== 'All') {
      if (category.difficultyTag !== levelFilter) return false;
    }

    return true;
  });

  // Calculate Overall Progress
  const totalQuestions = MOCK_CATEGORIES.reduce((acc, cat) => acc + cat.totalQuestions, 0);
  const solvedQuestions = MOCK_CATEGORIES.reduce((acc, cat) => acc + cat.questionsSolved, 0);
  const overallProgress = Math.round((solvedQuestions / totalQuestions) * 100) || 64;

  if (demoState === 'loading' || internalLoading) {
    return (
      <div className="p-md md:p-xl space-y-xl w-full">
        {/* Header Skeleton */}
        <div className="flex justify-between items-end border-b border-white/5 pb-xl animate-pulse text-left">
          <div className="space-y-sm">
            <div className="h-10 w-64 bg-surface-container-highest rounded-lg"></div>
            <div className="h-5 w-96 bg-surface-container-highest rounded-lg"></div>
          </div>
          <div className="hidden md:block space-y-sm text-right">
            <div className="h-4 w-28 bg-surface-container-highest rounded"></div>
            <div className="h-5 w-36 bg-surface-container-highest rounded"></div>
          </div>
        </div>

        {/* Filters bar Skeleton */}
        <div className="flex flex-wrap gap-md animate-pulse">
          <div className="h-10 flex-1 min-w-[240px] bg-surface-container-highest rounded-xl"></div>
          <div className="h-10 w-24 bg-surface-container-highest rounded-xl"></div>
          <div className="h-10 w-24 bg-surface-container-highest rounded-xl"></div>
        </div>

        {/* Grid cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-surface-container-highest/30 border border-white/5 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (demoState === 'error') {
    return (
      <div className="p-md md:p-xl flex flex-col items-center justify-center min-h-[60vh] text-center w-full">
        <GlassCard className="p-2xl max-w-md border-error/20 flex flex-col items-center justify-center space-y-md">
          <div className="w-16 h-16 bg-error/10 border border-error/20 rounded-full flex items-center justify-center text-error">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Failed to load study categories</h3>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            There was a timeout while loading the course curriculum indices. Please verify authentication token.
          </p>
          <button 
            onClick={() => triggerStateChange('normal')}
            className="bg-primary text-on-primary-container font-bold px-lg py-md rounded-xl active:scale-95 transition-all flex items-center gap-xs"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Grid
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="p-md md:p-xl space-y-xl w-full text-left">
      
      {/* Demo States controller */}
      <div className="flex justify-end mb-sm">
        <div className="flex gap-xs bg-surface-container/60 backdrop-blur-md rounded-lg p-1 border border-white/5 text-[10px] font-bold">
          <span className="text-on-surface-variant px-sm py-1 font-medium">Demo States:</span>
          <button onClick={() => triggerStateChange('normal')} className="px-sm py-1 bg-primary/20 text-primary border border-primary/20 rounded">Normal</button>
          <button onClick={() => triggerStateChange('loading')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Loading</button>
          <button onClick={() => triggerStateChange('empty')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Empty</button>
          <button onClick={() => triggerStateChange('error')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Error</button>
        </div>
      </div>

      {/* Header with overall progress bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md pb-lg border-b border-outline-variant/10">
        <div>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-black tracking-tight mb-xs">
            Study Categories
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl text-sm leading-relaxed">
            Master every core computer science concept with our AI-curated practice paths and interview-grade question banks.
          </p>
        </div>
        
        {/* Overall Progress Widget */}
        {demoState !== 'empty' && (
          <div className="flex items-center gap-md shrink-0 w-full md:w-auto">
            <div className="text-left md:text-right">
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[10px]">Overall Progress</p>
              <p className="font-title-lg text-title-lg text-primary font-bold">{overallProgress}% Completed</p>
            </div>
            <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden shrink-0">
              <div 
                className="h-full bg-primary shadow-[0_0_10px_rgba(192,193,255,0.4)] transition-all duration-700"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Search & Filter Panel */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-md bg-surface-container-low p-md rounded-2xl border border-outline-variant/10">
        {/* Search topics */}
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search topics..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1b1b23]/50 border border-outline-variant/30 rounded-xl pl-12 pr-md py-2.5 font-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface text-sm font-medium"
          />
        </div>

        {/* Level Filters */}
        <div className="flex gap-xs flex-wrap items-center">
          <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mr-xs">Level:</span>
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => {
            const isActive = levelFilter === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-md py-1.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container border-primary shadow-md'
                    : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-on-surface'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid */}
      <section className="pb-3xl">
        {demoState === 'empty' || filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-3xl text-center min-h-[35vh]">
            <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center text-on-surface-variant mb-md">
              <Inbox className="w-8 h-8" />
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface">No Categories Found</h4>
            <p className="text-body-sm text-on-surface-variant mt-xs max-w-sm">
              We couldn&apos;t find any study categories matching your search query or level filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setLevelFilter('All'); }}
              className="bg-primary/25 border border-primary/20 text-primary font-bold px-lg py-md rounded-xl active:scale-95 transition-all mt-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {filteredCategories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
              />
            ))}

            {/* Custom CTA Bento Request Item */}
            <div className="rounded-2xl p-xl flex flex-col justify-center items-center text-center gap-lg border-2 border-dashed border-outline-variant/30 bg-surface-container-low/10 hover:border-primary/50 transition-all duration-300 group cursor-pointer min-h-[240px]">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:scale-110 group-hover:bg-primary/10 transition-transform duration-300">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Request New Category</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-sm max-w-xs leading-relaxed">
                  Can&apos;t find a specific topic? Our AI can generate custom study paths for any niche technology stack.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Sticky Bottom Notification/Status banner */}
      {demoState !== 'empty' && (
        <div className="sticky bottom-4 left-0 right-0 z-40 max-w-container-max mx-auto w-full pt-md bg-transparent">
          <div className="bg-surface-container-highest/80 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-md flex flex-wrap justify-between items-center gap-md shadow-2xl">
            <div className="flex items-center gap-xl flex-wrap">
              <div className="flex items-center gap-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping shrink-0" />
                <span className="font-label-md text-label-md text-on-surface text-sm font-semibold">
                  1,204 Active Preppers
                </span>
              </div>
              <div className="flex items-center gap-xs">
                <Flame className="w-5 h-5 text-tertiary fill-current shrink-0 animate-bounce" />
                <span className="font-label-md text-label-md text-on-surface text-sm font-semibold">
                  5 Day Streak
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-lg">
              <button className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors font-bold text-sm cursor-pointer">
                View All Badges
              </button>
              <Link href="/explore">
                <button className="bg-primary text-on-primary-container px-lg py-sm rounded-xl font-label-md text-label-md hover:brightness-110 active:scale-95 transition-transform duration-200 font-bold text-sm">
                  Resume Last Session
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
