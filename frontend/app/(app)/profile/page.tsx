"use client";

import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  Inbox, 
  ShieldAlert, 
  RefreshCw, 
  Award, 
  Zap, 
  Gauge, 
  Terminal, 
  AlertTriangle 
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import GlassCard from '@/components/cards/glass-card';
import StatCard from '@/components/cards/stat-card';
import ProfileHeader from '@/components/features/profile-header';
import ContributionHeatmap from '@/components/features/contribution-heatmap';
import SkillCard from '@/components/features/skill-card';
import AchievementBadge from '@/components/features/achievement-badge';
import ActivityTimeline from '@/components/features/activity-timeline';
import { 
  MOCK_USER, 
  MOCK_SUBMISSIONS, 
  MOCK_ACTIVITIES 
} from '@/lib/constants';

export default function ProfilePage() {
  const { user } = useAuth();
  
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

  const getStatusIcon = (status: string) => {
    if (status === 'Accepted') {
      return <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />;
    }
    return <AlertTriangle className="w-4 h-4 text-error shrink-0" />;
  };

  const getStatusColorClass = (status: string) => {
    if (status === 'Accepted') return 'text-green-400';
    return 'text-error';
  };

  if (demoState === 'loading' || internalLoading) {
    return (
      <div className="p-md md:p-xl space-y-xl w-full">
        {/* Header Skeleton */}
        <div className="h-44 bg-surface-container-highest/40 border border-white/5 rounded-3xl animate-pulse"></div>

        {/* Stats Row Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg mb-xl animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-surface-container-highest/40 border border-white/5 rounded-2xl"></div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          <div className="lg:col-span-2 space-y-xl">
            <div className="h-64 bg-surface-container-highest/40 border border-white/5 rounded-2xl animate-pulse"></div>
            <div className="h-72 bg-surface-container-highest/40 border border-white/5 rounded-2xl animate-pulse"></div>
          </div>
          <div className="lg:col-span-1 space-y-xl">
            <div className="h-64 bg-surface-container-highest/40 border border-white/5 rounded-2xl animate-pulse"></div>
            <div className="h-72 bg-surface-container-highest/40 border border-white/5 rounded-2xl animate-pulse"></div>
          </div>
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
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Failed to load user profile</h3>
          <p className="text-body-sm text-on-surface-variant leading-relaxed text-sm">
            There was a timeout synchronization error. Please check your credentials key.
          </p>
          <button 
            onClick={() => triggerStateChange('normal')}
            className="bg-primary text-on-primary-container font-bold px-lg py-md rounded-xl active:scale-95 transition-all flex items-center gap-xs"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Profile
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="p-md md:p-xl space-y-2xl w-full text-left">
      
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

      {demoState === 'empty' ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center w-full">
          <GlassCard className="p-2xl max-w-md flex flex-col items-center justify-center space-y-md">
            <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center text-on-surface-variant mb-sm">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">No Profile Data</h3>
            <p className="text-body-sm text-on-surface-variant leading-relaxed text-sm">
              You are currently logged out or do not have a registered developer profile.
            </p>
          </GlassCard>
        </div>
      ) : (
        <>
          {/* Section 1: Profile Header Card */}
          <ProfileHeader user={user || MOCK_USER} />

          {/* Section 2: Overall Statistics Row */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            <StatCard 
              title="Problems Solved" 
              value={342} 
              subtext="+12 this wk" 
              subtextColorClass="text-tertiary"
              icon={<CheckCircle2 className="w-5 h-5 text-primary opacity-60" />}
            />
            <StatCard 
              title="Accuracy Rate" 
              value="84.2%" 
              subtext="Avg: 18 min" 
              subtextColorClass="text-on-surface-variant"
              icon={<Target className="w-5 h-5 text-secondary opacity-60" />}
            />
            <StatCard 
              title="Current Streak" 
              value="24 Days" 
              subtext="PB: 45 Days" 
              subtextColorClass="text-tertiary"
              icon={<Flame className="w-5 h-5 text-tertiary fill-current" />}
            />
            <StatCard 
              title="AI Simulations" 
              value={156} 
              subtext="1.2k total" 
              subtextColorClass="text-secondary"
              icon={<Sparkles className="w-5 h-5 text-secondary fill-current" />}
            />
          </section>

          {/* Section 3: Middle Heatmap & Achievements Block */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            {/* Heatmap graph */}
            <div className="lg:col-span-2">
              <ContributionHeatmap />
            </div>
            
            {/* Achievements collection */}
            <div className="lg:col-span-1">
              <GlassCard className="p-lg rounded-2xl space-y-lg border border-white/5 bg-[#1f1f27]/40 backdrop-blur-xl h-full justify-between" hoverGlow={true}>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold text-left">Achievements</h3>
                
                <div className="grid grid-cols-3 gap-md pt-sm">
                  <AchievementBadge 
                    title="7-Day Streak" 
                    icon={<Flame className="w-6 h-6 text-on-primary-container" />}
                    colorClass="bg-primary/20 border border-primary/20"
                  />
                  <AchievementBadge 
                    title="Greedy Master" 
                    icon={<Zap className="w-6 h-6 text-secondary" />}
                    colorClass="bg-secondary/20 border border-secondary/20"
                  />
                  <AchievementBadge 
                    title="Recursion King" 
                    icon={<Award className="w-6 h-6 text-tertiary" />}
                    colorClass="bg-tertiary-container/30 border border-tertiary/20"
                    isLocked={true}
                  />
                  <AchievementBadge 
                    title="Fast Solver" 
                    icon={<Gauge className="w-6 h-6 text-primary" />}
                    colorClass="bg-primary-container/20 border border-primary/20"
                  />
                  <AchievementBadge 
                    title="Clean Coder" 
                    icon={<Terminal className="w-6 h-6 text-secondary" />}
                    colorClass="bg-secondary-container/20 border border-secondary/20"
                  />
                  <AchievementBadge 
                    title="Show All" 
                    icon={<Sparkles className="w-6 h-6 text-primary" />}
                    colorClass="bg-surface-container-highest border border-outline-variant/30"
                  />
                </div>
              </GlassCard>
            </div>
          </section>

          {/* Section 4: Skills Progress & Weekly Goal Block */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            {/* Skills Progress Cards List */}
            <div className="lg:col-span-2 space-y-md">
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Skills Progress</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-lg">
                <SkillCard title="Arrays" solvedCount={40} totalCount={50} progress={80} trend="up" />
                <SkillCard title="Trees" solvedCount={28} totalCount={45} progress={62} trend="stable" />
                <SkillCard title="Graphs" solvedCount={8} totalCount={52} progress={15} trend="up" />
                <SkillCard title="Dynamic Programming" solvedCount={18} totalCount={45} progress={40} trend="down" />
                <SkillCard title="System Design" solvedCount={12} totalCount={20} progress={60} trend="up" />
                <SkillCard title="SQL" solvedCount={25} totalCount={30} progress={83} trend="stable" />
              </div>
            </div>

            {/* Weekly Goal Progress Widget */}
            <div className="lg:col-span-1 space-y-md flex flex-col justify-end">
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Weekly Goal</h3>
              
              <GlassCard className="p-lg rounded-2xl border border-white/5 bg-[#1f1f27]/40 backdrop-blur-xl h-full flex flex-col justify-between" hoverGlow={true}>
                <div className="space-y-sm text-left">
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded tracking-wider uppercase">
                    ACTIVE CHALLENGE
                  </span>
                  <h4 className="font-headline-sm text-lg font-bold text-on-surface mt-1">
                    Solve 10 problems this week
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-xs">
                    Grinding L5 algorithms loop. Complete 3 more dynamic programming or graph design problems to secure week streak.
                  </p>
                </div>

                <div className="space-y-sm mt-lg w-full">
                  <div className="flex justify-between items-center text-xs font-bold text-on-surface">
                    <span>Goal Progress</span>
                    <span className="text-primary">7 / 10 Completed</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-700 shadow-[0_0_10px_rgba(192,193,255,0.4)]"
                      style={{ width: '70%' }}
                    />
                  </div>
                  <p className="text-[10px] text-on-surface-variant/70 font-semibold text-right">
                    3 problems remaining this week
                  </p>
                </div>
              </GlassCard>
            </div>
          </section>

          {/* Section 5: Recent Submissions & Activities Timeline row */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            {/* Submissions table card */}
            <div className="lg:col-span-2">
              <GlassCard className="p-0 rounded-2xl overflow-hidden border border-white/5 bg-[#1f1f27]/40 backdrop-blur-xl h-full text-left" hoverGlow={false}>
                <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/50">
                  <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Recent Submissions</h3>
                  <a className="text-primary font-label-md text-label-md text-xs hover:underline font-bold" href="#">
                    View All History
                  </a>
                </div>
                
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-surface-container/60 text-on-surface-variant font-label-md text-[10px] uppercase tracking-wider font-bold border-b border-outline-variant/20">
                        <th className="px-lg py-md">Problem</th>
                        <th className="px-lg py-md">Difficulty</th>
                        <th className="px-lg py-md">Status</th>
                        <th className="px-lg py-md">Runtime</th>
                        <th className="px-lg py-md">Language</th>
                        <th className="px-lg py-md">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {MOCK_SUBMISSIONS.map((sub) => (
                        <tr key={sub.id} className="hover:bg-surface-container-highest/30 transition-colors font-medium">
                          <td className="px-lg py-md text-on-surface font-semibold max-w-[200px] truncate">
                            {sub.problem}
                          </td>
                          <td className="px-lg py-md">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                              sub.difficulty === 'Easy' 
                                ? 'bg-green-500/10 text-green-400' 
                                : sub.difficulty === 'Hard' 
                                  ? 'bg-error-container/20 text-error' 
                                  : 'bg-tertiary-container/20 text-tertiary'
                            }`}>
                              {sub.difficulty}
                            </span>
                          </td>
                          <td className="px-lg py-md">
                            <div className="flex items-center gap-xs">
                              {getStatusIcon(sub.status)}
                              <span className={`font-bold ${getStatusColorClass(sub.status)}`}>
                                {sub.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-lg py-md font-mono text-[10px] text-on-surface-variant opacity-80">
                            {sub.runtime}
                          </td>
                          <td className="px-lg py-md text-on-surface-variant font-semibold">
                            {sub.language}
                          </td>
                          <td className="px-lg py-md text-on-surface-variant/80">
                            {sub.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>

            {/* Activities Timeline card */}
            <div className="lg:col-span-1">
              <GlassCard className="p-lg rounded-2xl flex flex-col border border-white/5 bg-[#1f1f27]/40 backdrop-blur-xl h-full justify-between" hoverGlow={true}>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold text-left mb-lg">Recent Activity</h3>
                <ActivityTimeline activities={MOCK_ACTIVITIES} />
              </GlassCard>
            </div>
          </section>
        </>
      )}

    </div>
  );
}
