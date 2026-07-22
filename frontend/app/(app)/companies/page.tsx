"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Search, 
  Building2, 
  SlidersHorizontal, 
  ArrowUpDown,
  Inbox, 
  ShieldAlert, 
  Loader2, 
  RefreshCw,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import GlassCard from '@/components/cards/glass-card';
import StatCard from '@/components/cards/stat-card';
import CompanyCard from '@/components/features/company-card';
import CompanyModal from '@/components/features/company-modal';
import { MOCK_COMPANIES } from '@/lib/constants';
import { Company } from '@/types';
import { useSearchFilter } from '@/hooks/use-search-filter';

function CompaniesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('q') || '';

  // Active filter states
  const [activeTier, setActiveTier] = useState<'All' | 'FAANG' | 'Product' | 'Startup' | 'Enterprise'>('All');
  const [sortBy, setSortBy] = useState<'Most Questions' | 'Popular' | 'Recently Updated'>('Popular');

  // Modal Detail states
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  // Filter & Sort Companies using the REUSED generic hook
  const filteredCompanies = useSearchFilter<Company>({
    items: MOCK_COMPANIES,
    searchFields: ['name', 'categoryTag', 'topics'],
    searchQuery: searchQuery,
    filterFn: (company) => {
      if (activeTier !== 'All' && company.categoryTag !== activeTier) return false;
      return true;
    },
    sortFn: (a, b) => {
      if (sortBy === 'Most Questions') {
        return b.questionCount - a.questionCount;
      }
      if (sortBy === 'Recently Updated') {
        return b.name.localeCompare(a.name);
      }
      // Popular (Sort by question count or custom metrics)
      return b.questionCount - a.questionCount;
    }
  });

  const handleCardClick = (company: Company) => {
    setSelectedCompany(company);
    setModalOpen(true);
  };

  if (demoState === 'loading' || internalLoading) {
    return (
      <div className="space-y-xl w-full">
        {/* Header Skeleton */}
        <div className="mb-2xl animate-pulse text-left">
          <div className="h-10 w-64 bg-surface-container-highest rounded-lg"></div>
          <div className="h-5 w-full max-w-2xl bg-surface-container-highest rounded-lg mt-sm"></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-surface-container-highest/40 border border-white/5 rounded-xl"></div>
          ))}
        </div>

        {/* Filters Skeletons */}
        <div className="h-16 bg-surface-container-highest/40 border border-white/5 rounded-2xl animate-pulse"></div>

        {/* Grid cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-44 bg-surface-container-highest/30 border border-white/5 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (demoState === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center w-full">
        <GlassCard className="p-2xl max-w-md border-error/20 flex flex-col items-center justify-center space-y-md">
          <div className="w-16 h-16 bg-error/10 border border-error/20 rounded-full flex items-center justify-center text-error">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Failed to load companies index</h3>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            There was a network failure connecting to the tech companies directory schema.
          </p>
          <button 
            onClick={() => triggerStateChange('normal')}
            className="bg-primary text-on-primary-container font-bold px-lg py-md rounded-xl active:scale-95 transition-all flex items-center gap-xs"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Index
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-xl w-full text-left">
      {/* Demo States controller */}
      <div className="flex justify-end">
        <div className="flex gap-xs bg-surface-container/60 backdrop-blur-md rounded-lg p-1 border border-white/5 text-[10px] font-bold">
          <span className="text-on-surface-variant px-sm py-1 font-medium">Demo States:</span>
          <button onClick={() => triggerStateChange('normal')} className="px-sm py-1 bg-primary/20 text-primary border border-primary/20 rounded">Normal</button>
          <button onClick={() => triggerStateChange('loading')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Loading</button>
          <button onClick={() => triggerStateChange('empty')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Empty</button>
          <button onClick={() => triggerStateChange('error')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Error</button>
        </div>
      </div>

      {/* Header text */}
      <header className="mb-lg">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-black tracking-tight mb-xs">
          Master the <span className="text-primary">Top Companies</span>
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed text-sm">
          Explore thousands of real interview questions asked by global tech leaders. Filtered by frequency and difficulty to accelerate your preparation.
        </p>
      </header>

      {/* Statistics Cards Summary */}
      {demoState !== 'empty' && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
          <StatCard 
            title="Total Companies Tracked" 
            value="12 Leaders" 
            subtext="FAANG + Giants" 
            icon={<Building2 className="w-5 h-5 text-primary opacity-60" />}
          />
          <StatCard 
            title="Active Interview Rounds" 
            value="55 Tracks" 
            subtext="Collected in detail" 
            icon={<LayoutGrid className="w-5 h-5 text-secondary opacity-60" />}
          />
          <StatCard 
            title="Interview Questions" 
            value="6,500+ Qs" 
            subtext="Directly searchable" 
            icon={<TrendingUp className="w-5 h-5 text-tertiary opacity-60" />}
          />
        </section>
      )}

      {/* Search results banner if search parameter exists */}
      {searchQuery && (
        <div className="flex items-center gap-xs text-xs text-on-surface-variant bg-surface-container px-md py-sm rounded-lg border border-white/5 w-fit">
          <Search className="w-4 h-4" />
          <span>Searching companies for: </span>
          <span className="text-primary font-bold">"{searchQuery}"</span>
          <button 
            onClick={() => router.push('/companies')}
            className="text-error font-bold ml-md hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* Filters & Sorting Panel */}
      <div className="flex flex-col md:flex-row gap-md items-stretch md:items-center bg-surface-container-low p-md rounded-2xl border border-outline-variant/10">
        
        {/* Quick Tier Filters */}
        <div className="flex flex-wrap gap-xs items-center">
          <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mr-xs">Tier:</span>
          {(['All', 'FAANG', 'Product', 'Startup', 'Enterprise'] as const).map((tier) => {
            const isActive = activeTier === tier;
            return (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-md py-1.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container border-primary shadow-md'
                    : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-on-surface'
                }`}
              >
                {tier}
              </button>
            );
          })}
        </div>

        {/* Sort Select list */}
        <div className="relative md:ml-auto min-w-[160px]">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="appearance-none bg-surface-container border border-outline-variant/30 rounded-xl py-2 pl-lg pr-10 text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full font-label-md text-label-md text-xs cursor-pointer text-on-surface font-semibold"
          >
            <option value="Popular">Sort: Popularity</option>
            <option value="Most Questions">Most Questions</option>
            <option value="Recently Updated">Recently Updated</option>
          </select>
          <SlidersHorizontal className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-on-surface-variant" />
        </div>

      </div>

      {/* Companies Grid */}
      <section className="pb-3xl">
        {demoState === 'empty' || filteredCompanies.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-3xl text-center min-h-[35vh]">
            <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center text-on-surface-variant mb-md">
              <Inbox className="w-8 h-8" />
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface">No Companies Match</h4>
            <p className="text-body-sm text-on-surface-variant mt-xs max-w-sm">
              We couldn't find any companies matching your active search value or tier filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
            {filteredCompanies.map((company) => (
              <CompanyCard 
                key={company.name}
                company={company}
                onClick={() => handleCardClick(company)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Detail overlay Modal */}
      <CompanyModal 
        company={selectedCompany}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

    </div>
  );
}

export default function CompaniesPage() {
  return (
    <Suspense fallback={
      <div className="p-md md:p-xl flex flex-col items-center justify-center min-h-[50vh] text-center w-full">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-body-sm text-on-surface-variant animate-pulse mt-sm">Assembling companies directory...</p>
      </div>
    }>
      <div className="p-md md:p-xl max-w-container-max mx-auto w-full">
        <CompaniesPageContent />
      </div>
    </Suspense>
  );
}
