"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Inbox, 
  ShieldAlert, 
  Loader2, 
  RefreshCw,
  Search
} from 'lucide-react';
import GlassCard from '@/components/cards/glass-card';
import QuestionCard from '@/components/features/question-card';
import FilterPanel from '@/components/features/filter-panel';
import ExportToolbar from '@/components/features/export-toolbar';
import { MOCK_QUESTIONS } from '@/lib/constants';

function ExplorePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('q') || '';

  // Demo States Review
  const [demoState, setDemoState] = useState<'normal' | 'loading' | 'empty' | 'error'>('normal');
  const [internalLoading, setInternalLoading] = useState(false);

  // Filter States
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');

  // Interactive States
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Trigger loading effect on state toggles
  const triggerStateChange = (state: 'normal' | 'loading' | 'empty' | 'error') => {
    setInternalLoading(true);
    setTimeout(() => {
      setDemoState(state);
      setInternalLoading(false);
    }, 500);
  };

  // Filter & Sort Questions
  const filteredQuestions = MOCK_QUESTIONS.filter((q) => {
    // 1. Search Query Filter
    if (searchQuery) {
      const qLower = searchQuery.toLowerCase();
      const matchesTitle = q.title.toLowerCase().includes(qLower);
      const matchesTopic = q.category.toLowerCase().includes(qLower);
      const matchesCompany = q.companies.some(c => c.toLowerCase().includes(qLower));
      if (!matchesTitle && !matchesTopic && !matchesCompany) return false;
    }

    // 2. Topic Pill Filter
    if (selectedTopic !== 'All Topics') {
      // Check if topic is sub-category or category
      if (selectedTopic === 'Arrays' && q.category !== 'Arrays') return false;
      if (selectedTopic === 'Strings' && q.category !== 'String Manipulation') return false;
      if (selectedTopic === 'Dynamic Programming' && q.category !== 'Dynamic Programming') return false;
      if (selectedTopic === 'Graphs' && q.category !== 'Graphs' && q.category !== 'Graph Theory') return false;
      if (selectedTopic === 'System Design' && q.category !== 'System Design') return false;
      if (selectedTopic === 'Heaps' && q.category !== 'Heaps') return false;
    }

    // 3. Company Tag Filter
    if (selectedCompanies.length > 0) {
      const hasMatchingCompany = q.companies.some(c => selectedCompanies.includes(c));
      if (!hasMatchingCompany) return false;
    }

    // 4. Difficulty Selector
    if (difficultyFilter !== 'All' && q.difficulty !== difficultyFilter) return false;

    return true;
  });

  // Sorting
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === 'Newest') {
      return b.id.localeCompare(a.id);
    }
    if (sortBy === 'Frequency') {
      return b.companies.length - a.companies.length;
    }
    if (sortBy === 'Difficulty') {
      const diffWeight = { Easy: 1, Medium: 2, Hard: 3 };
      return diffWeight[a.difficulty] - diffWeight[b.difficulty];
    }
    // Default Popular sorting
    return b.acceptance.localeCompare(a.acceptance);
  });

  // Bookmark Toggle
  const handleBookmarkToggle = (id: string) => {
    setBookmarks((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Selections
  const handleSelectToggle = (id: string) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(sortedQuestions.map((q) => q.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleCompanyToggle = (company: string) => {
    setSelectedCompanies((prev) => 
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  // JSON Download logic
  const handleExportJSON = () => {
    const questionsToExport = MOCK_QUESTIONS.filter((q) => selectedIds.includes(q.id));
    if (questionsToExport.length === 0) return;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questionsToExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prepforge_challenges_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Render Skeletons
  if (demoState === 'loading' || internalLoading) {
    return (
      <div className="space-y-xl w-full">
        {/* Header Skeleton */}
        <div className="mb-2xl animate-pulse text-left">
          <div className="h-10 w-64 bg-surface-container-highest rounded-lg"></div>
          <div className="h-5 w-full max-w-2xl bg-surface-container-highest rounded-lg mt-sm"></div>
        </div>

        {/* Filters Skeletons */}
        <div className="space-y-md animate-pulse">
          <div className="flex gap-sm flex-wrap">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-9 w-24 bg-surface-container-highest rounded-full"></div>
            ))}
          </div>
          <div className="h-16 bg-surface-container-highest/40 border border-white/5 rounded-2xl"></div>
        </div>

        {/* List Skeletons */}
        <div className="grid grid-cols-1 gap-md">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-surface-container-highest/30 border border-white/5 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // Render Error state
  if (demoState === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center w-full">
        <GlassCard className="p-2xl max-w-md border-error/20 flex flex-col items-center justify-center space-y-md">
          <div className="w-16 h-16 bg-error/10 border border-error/20 rounded-full flex items-center justify-center text-error">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Failed to retrieve challenges</h3>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            There was an error connecting to the static registry index. Try reloading the challenges cache.
          </p>
          <button 
            onClick={() => triggerStateChange('normal')}
            className="bg-primary text-on-primary-container font-bold px-lg py-md rounded-xl active:scale-95 transition-all flex items-center gap-xs"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Cache
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-xl w-full">
      {/* Demo State Dropdown */}
      <div className="flex justify-end">
        <div className="flex gap-xs bg-surface-container/60 backdrop-blur-md rounded-lg p-1 border border-white/5 text-[10px] font-bold">
          <span className="text-on-surface-variant px-sm py-1 font-medium">Demo States:</span>
          <button onClick={() => triggerStateChange('normal')} className="px-sm py-1 bg-primary/20 text-primary border border-primary/20 rounded">Normal</button>
          <button onClick={() => triggerStateChange('loading')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Loading</button>
          <button onClick={() => triggerStateChange('empty')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Empty</button>
          <button onClick={() => triggerStateChange('error')} className="px-sm py-1 text-on-surface-variant hover:text-on-surface">Error</button>
        </div>
      </div>

      {/* Header Info */}
      <div className="mb-2xl text-left">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold tracking-tight mb-xs text-on-surface">
          Explore Challenges
        </h2>
        <p className="text-on-surface-variant text-body-md max-w-2xl text-sm leading-relaxed">
          Master 1,200+ technical interview questions curated from top tech companies with AI-powered feedback and real-time execution.
        </p>
      </div>

      {/* Search Result Information */}
      {searchQuery && (
        <div className="flex items-center gap-xs text-xs text-on-surface-variant bg-surface-container px-md py-sm rounded-lg border border-white/5 w-fit">
          <Search className="w-4 h-4" />
          <span>Search results for: </span>
          <span className="text-primary font-bold">&ldquo;{searchQuery}&rdquo;</span>
          <button 
            onClick={() => router.push('/explore')}
            className="text-error font-bold ml-md hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* Filters Area */}
      <section className="space-y-md">
        <FilterPanel 
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
          selectedCompanies={selectedCompanies}
          onCompanyToggle={handleCompanyToggle}
          difficultyFilter={difficultyFilter}
          onDifficultyChange={setDifficultyFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </section>

      {/* Bulk Action Toolbar */}
      {sortedQuestions.length > 0 && (
        <ExportToolbar 
          selectedCount={selectedIds.filter(id => sortedQuestions.some(q => q.id === id)).length}
          totalCount={sortedQuestions.length}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onExportJSON={handleExportJSON}
        />
      )}

      {/* Questions list container */}
      <section className="grid grid-cols-1 gap-md">
        {sortedQuestions.length > 0 ? (
          sortedQuestions.map((question) => (
            <QuestionCard 
              key={question.id}
              question={question}
              isSelected={selectedIds.includes(question.id)}
              onSelectToggle={() => handleSelectToggle(question.id)}
              isBookmarked={bookmarks.includes(question.id)}
              onBookmarkToggle={() => handleBookmarkToggle(question.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-2xl text-center min-h-[30vh]">
            <div className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center text-on-surface-variant mb-sm">
              <Inbox className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-on-surface">No Questions Found</h4>
            <p className="text-xs text-on-surface-variant mt-1 max-w-sm">
              We couldn&apos;t find any challenges matching your active filters. Try adjusting search values.
            </p>
          </div>
        )}
      </section>

      {/* Pagination component */}
      {sortedQuestions.length > 0 && (
        <div className="mt-3xl flex flex-col md:flex-row items-center justify-between gap-md text-xs text-on-surface-variant">
          <p className="font-body-sm">Showing 1-{sortedQuestions.length} of {sortedQuestions.length} questions</p>
          <div className="flex gap-xs">
            <button className="h-10 px-sm flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-highest cursor-pointer font-bold">
              Prev
            </button>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-on-primary-container font-bold shadow-md cursor-pointer">
              1
            </button>
            <button className="h-10 px-sm flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-highest cursor-pointer font-bold">
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="p-md md:p-xl flex flex-col items-center justify-center min-h-[50vh] text-center w-full">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-body-sm text-on-surface-variant animate-pulse mt-sm">Assembling explore grid...</p>
      </div>
    }>
      <div className="p-md md:p-xl max-w-container-max mx-auto w-full">
        <ExplorePageContent />
      </div>
    </Suspense>
  );
}
