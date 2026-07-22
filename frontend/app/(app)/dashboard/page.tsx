"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { 
  Flame, 
  Sparkles, 
  FileDown, 
  Target, 
  CheckCircle2, 
  Timer, 
  Users, 
  Play, 
  MoreVertical,
  Terminal,
  ShieldAlert,
  Inbox,
  RefreshCw,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';
import GlassCard from '@/components/cards/glass-card';
import StatCard from '@/components/cards/stat-card';
import CategoryBarChart from '@/components/charts/category-bar-chart';
import DifficultyDonut from '@/components/charts/difficulty-donut';
import ActivityTimeline from '@/components/features/activity-timeline';
import { MOCK_ACTIVITIES } from '@/lib/constants';

export default function DashboardPage() {
  const { user } = useAuth();
  const [demoState, setDemoState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');
  const [internalLoading, setInternalLoading] = useState(false);

  // Trigger temporary loading effect on demo state changes
  const triggerStateChange = (state: 'normal' | 'loading' | 'empty' | 'error') => {
    setInternalLoading(true);
    setTimeout(() => {
      setDemoState(state);
      setInternalLoading(false);
    }, 600);
  };

  if (demoState === 'loading' || internalLoading) {
    return (
      <div className="p-md md:p-xl space-y-xl w-full">
        {/* Welcome Header Skeleton */}
        <div className="flex justify-between items-end mb-xl animate-pulse">
          <div className="space-y-sm">
            <div className="h-10 w-64 bg-surface-container-highest rounded-lg"></div>
            <div className="h-5 w-48 bg-surface-container-highest rounded-lg"></div>
          </div>
          <div className="h-10 w-10 bg-surface-container-highest rounded-full"></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-md mb-xl">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-surface-container-highest/40 border border-white/5 rounded-xl animate-pulse"></div>
          ))}
        </div>

        {/* Dashboard Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          <div className="lg:col-span-8 space-y-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="h-80 bg-surface-container-highest/40 border border-white/5 rounded-2xl animate-pulse"></div>
              <div className="h-80 bg-surface-container-highest/40 border border-white/5 rounded-2xl animate-pulse"></div>
            </div>
            <div className="h-44 bg-surface-container-highest/40 border border-white/5 rounded-2xl animate-pulse"></div>
          </div>
          <div className="lg:col-span-4 space-y-xl">
            <div className="h-80 bg-surface-container-highest/40 border border-white/5 rounded-2xl animate-pulse"></div>
            <div className="h-[360px] bg-surface-container-highest/40 border border-white/5 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (demoState === 'error') {
    return (
      <div className="p-md md:p-xl flex flex-col items-center justify-center min-h-[70vh] text-center w-full">
        <GlassCard className="p-2xl max-w-md border-error/20 flex flex-col items-center justify-center space-y-md">
          <div className="w-16 h-16 bg-error/10 border border-error/20 rounded-full flex items-center justify-center text-error">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Failed to load statistics</h3>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            There was an error communicating with the interview model registry. Please check your network credentials.
          </p>
          <button 
            onClick={() => triggerStateChange('normal')}
            className="bg-primary text-on-primary-container font-bold px-lg py-md rounded-xl active:scale-95 transition-all flex items-center gap-xs"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </button>
        </GlassCard>
      </div>
    );
  }

  if (demoState === 'empty') {
    return (
      <div className="p-md md:p-xl flex flex-col items-center justify-center min-h-[70vh] text-center w-full">
        {/* State Toggle Buttons for Demo review */}
        <div className="absolute top-24 right-8 flex gap-xs bg-surface-container/80 backdrop-blur-md rounded-lg p-1 border border-white/5 z-30">
          <button onClick={() => triggerStateChange('normal')} className="px-sm py-1 text-[10px] font-bold text-on-surface-variant hover:text-on-surface">Normal</button>
          <button onClick={() => triggerStateChange('empty')} className="px-sm py-1 text-[10px] font-bold bg-primary text-on-primary-container rounded">Empty</button>
        </div>

        <GlassCard className="p-2xl max-w-md flex flex-col items-center justify-center space-y-md">
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">No Practice Data Found</h3>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            Welcome to PrepForge AI! You haven't solved any coding problems yet. Access the explore panel to kickstart your training.
          </p>
          <Link href="/explore">
            <button className="bg-primary text-on-primary font-bold px-xl py-lg rounded-xl flex items-center gap-sm active:scale-95 transition-all">
              Explore Challenges
              <Play className="w-4 h-4 fill-current" />
            </button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="p-md md:p-xl space-y-xl w-full">
      
      {/* Demo Review controller dropdown at top right */}
      <div className="flex justify-end mb-sm">
        <div className="flex gap-xs bg-surface-container/60 backdrop-blur-md rounded-lg p-1 border border-white/5 text-[10px] font-bold">
          <span className="text-on-surface-variant px-sm py-1 font-medium">Demo States:</span>
          <button onClick={() => triggerStateChange('normal')} className="px-sm py-1 bg-primary/20 text-primary border border-primary/20 rounded">Normal</button>
          <button onClick={() => triggerStateChange('loading')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Loading</button>
          <button onClick={() => triggerStateChange('empty')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Empty</button>
          <button onClick={() => triggerStateChange('error')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Error</button>
        </div>
      </div>

      {/* Header greeting */}
      <header className="flex justify-between items-end mb-xl">
        <div>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold tracking-tight text-on-surface">
            Welcome back, {user ? user.name.split(' ')[0] : 'Developer'}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Your interview prep is <span className="text-primary font-bold">72%</span> complete this week.
          </p>
        </div>
      </header>

      {/* Statistics Cards Grid */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-md mb-xl">
        <StatCard 
          title="Questions Solved" 
          value={142} 
          subtext="+12 this wk" 
          subtextColorClass="text-tertiary"
          icon={<CheckCircle2 className="w-5 h-5 text-primary opacity-60" />}
        />
        <StatCard 
          title="Accuracy" 
          value="84%" 
          subtext="-2%" 
          subtextColorClass="text-error"
          icon={<Target className="w-5 h-5 text-secondary opacity-60" />}
        />
        <StatCard 
          title="Current Streak" 
          value="12 Days" 
          subtext="Keep it up" 
          subtextColorClass="text-tertiary"
          icon={<Flame className="w-5 h-5 text-tertiary fill-current" />}
        />
        <StatCard 
          title="Downloads" 
          value={24} 
          subtext="Resources" 
          subtextColorClass="text-on-surface-variant"
          icon={<FileDown className="w-5 h-5 text-primary opacity-60" />}
        />
        <StatCard 
          title="AI Views" 
          value={89} 
          subtext="Evaluations" 
          subtextColorClass="text-secondary"
          icon={<Sparkles className="w-5 h-5 text-secondary fill-current" />}
        />
      </section>

      {/* Dashboard Core Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl mb-xl">
        
        {/* Left Column (Charts and Continue practice) */}
        <div className="lg:col-span-8 flex flex-col gap-xl">
          
          {/* Charts Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            
            {/* Category Chart Card */}
            <GlassCard className="h-80" hoverGlow={true}>
              <div className="flex justify-between items-center mb-lg relative z-10">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Problems Solved by Category</h3>
                <button className="text-on-surface-variant hover:text-on-surface transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <CategoryBarChart />
            </GlassCard>

            {/* Difficulty Chart Card */}
            <GlassCard className="h-80" hoverGlow={true}>
              <div className="flex justify-between items-center mb-lg">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Difficulty Distribution</h3>
                <button className="text-on-surface-variant hover:text-on-surface transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <DifficultyDonut />
            </GlassCard>
            
          </div>

          {/* Continue Solving Card */}
          <section className="space-y-md">
            <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Continue Solving</h3>
            
            <div 
              className="glass-card p-xl rounded-2xl flex flex-col md:flex-row gap-lg items-center group cursor-pointer hover:border-primary/40 transition-all border border-white/5 shadow-2xl relative overflow-hidden" 
              style={{
                background: 'rgba(31, 31, 39, 0.4)',
                backdropFilter: 'blur(12px)',
                animation: 'pulse-glow 2s ease-in-out infinite'
              }}
            >
              {/* Graphic aspect frame */}
              <div className="w-full md:w-1/3 aspect-video bg-surface-container-highest/80 rounded-xl overflow-hidden relative flex items-center justify-center border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                <Terminal className="w-12 h-12 text-primary opacity-40 group-hover:scale-110 transition-transform" />
              </div>

              {/* Problem detail text */}
              <div className="flex-1 space-y-md text-left">
                <div className="flex items-center gap-sm">
                  <span className="px-sm py-1 bg-secondary/15 text-secondary text-[10px] font-bold rounded uppercase tracking-wide">
                    Medium
                  </span>
                  <span className="text-on-surface-variant font-label-md text-label-md text-xs">
                    Data Structures • Hash Maps
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                  Longest Consecutive Sequence
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-sm">
                  Find the length of the longest consecutive elements sequence in an unsorted array of integers. Expected time complexity O(n).
                </p>
                <div className="flex items-center gap-xl pt-xs text-xs text-on-surface-variant">
                  <div className="flex items-center gap-xs">
                    <Timer className="w-4 h-4" />
                    <span>Last attempt: 2h ago</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <Users className="w-4 h-4" />
                    <span>Solved by 1.2k users</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link href="/questions/longest-consecutive-sequence">
                <button className="w-full md:w-auto px-xl py-md bg-primary text-on-primary-container font-bold rounded-lg flex items-center justify-center gap-xs hover:brightness-110 active:scale-95 transition-transform shrink-0">
                  Resume
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </Link>
            </div>
          </section>

        </div>

        {/* Right Column (Recommendations & Timeline) */}
        <div className="lg:col-span-4 flex flex-col gap-xl">
          
          {/* Recommended Questions Card */}
          <GlassCard className="p-xl rounded-2xl flex flex-col" hoverGlow={true}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Recommended for You</h3>
              <Link href="/explore" className="text-xs text-primary font-bold hover:underline">
                View All
              </Link>
            </div>
            
            <div className="flex flex-col gap-md">
              {/* Recommendation item 1 */}
              <div className="p-md bg-[#1b1b23]/50 rounded-xl border border-outline-variant/10 hover:border-outline-variant/40 transition-colors flex justify-between items-center group">
                <div className="text-left">
                  <h5 className="font-body-md text-body-md font-bold mb-1 text-on-surface">Serialize Binary Tree</h5>
                  <div className="flex items-center gap-sm">
                    <span className="text-error font-bold text-[10px] uppercase tracking-wider">Hard</span>
                    <span className="text-on-surface-variant text-[10px]">Trees • Recursion</span>
                  </div>
                </div>
                <Link href="/questions/serialize-binary-tree">
                  <button className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary-container transition-all">
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </Link>
              </div>

              {/* Recommendation item 2 */}
              <div className="p-md bg-[#1b1b23]/50 rounded-xl border border-outline-variant/10 hover:border-outline-variant/40 transition-colors flex justify-between items-center group">
                <div className="text-left">
                  <h5 className="font-body-md text-body-md font-bold mb-1 text-on-surface">3Sum Closest</h5>
                  <div className="flex items-center gap-sm">
                    <span className="text-secondary font-bold text-[10px] uppercase tracking-wider">Medium</span>
                    <span className="text-on-surface-variant text-[10px]">Arrays • Pointers</span>
                  </div>
                </div>
                <Link href="/questions/3sum-closest">
                  <button className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary-container transition-all">
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </Link>
              </div>

              {/* Recommendation item 3 */}
              <div className="p-md bg-[#1b1b23]/50 rounded-xl border border-outline-variant/10 hover:border-outline-variant/40 transition-colors flex justify-between items-center group">
                <div className="text-left">
                  <h5 className="font-body-md text-body-md font-bold mb-1 text-on-surface">Balanced Brackets</h5>
                  <div className="flex items-center gap-sm">
                    <span className="text-primary font-bold text-[10px] uppercase tracking-wider">Easy</span>
                    <span className="text-on-surface-variant text-[10px]">Stacks</span>
                  </div>
                </div>
                <Link href="/questions/balanced-brackets">
                  <button className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary-container transition-all">
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </Link>
              </div>
            </div>
          </GlassCard>

          {/* Activity Timeline Card */}
          <GlassCard className="p-xl rounded-2xl flex flex-col flex-grow" hoverGlow={true}>
            <h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-lg text-left">Recent Activity</h3>
            <ActivityTimeline activities={MOCK_ACTIVITIES} />
          </GlassCard>
          
        </div>

      </div>

    </div>
  );
}
