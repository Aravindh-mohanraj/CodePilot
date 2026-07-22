import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function ExploreQuestionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [company, setCompany] = useState(searchParams.get('company') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || '');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const [questions, setQuestions] = useState([]);
  const [solvedIds, setSolvedIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // Sync state with URL params & fetch user solved status
  useEffect(() => {
    fetchQuestions();
    fetchUserSolvedStatus();
  }, [company, category, difficulty]);

  const fetchUserSolvedStatus = async () => {
    const stored = localStorage.getItem('prepforge_user');
    if (!stored) return;
    try {
      const user = JSON.parse(stored);
      if (user?.email) {
        const res = await fetch(`/user/progress?email=${encodeURIComponent(user.email)}`);
        if (res.ok) {
          const data = await res.json();
          setSolvedIds(data.solved_ids || []);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch user solved status", err);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      let queryParams = new URLSearchParams();
      if (company) queryParams.append('company', company);
      if (category) queryParams.append('category', category);
      if (difficulty) queryParams.append('difficulty', difficulty);

      const res = await fetch(`/questions?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.warn('Backend unavailable, using rich fallback data', err);
      // Fallback demo questions matching database structure
      setQuestions([
        { id: 1, title: 'Two Sum', category: 'Arrays & Hashing', difficulty: 'Easy', companies: ['Google', 'Amazon', 'Meta'], type: 'Coding' },
        { id: 2, title: 'Add Two Numbers', category: 'Linked List', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], type: 'Coding' },
        { id: 3, title: 'Longest Substring Without Repeating Characters', category: 'Sliding Window', difficulty: 'Medium', companies: ['Google', 'Meta', 'Netflix'], type: 'Coding' },
        { id: 4, title: 'Median of Two Sorted Arrays', category: 'Binary Search', difficulty: 'Hard', companies: ['Google', 'Apple'], type: 'Coding' },
        { id: 5, title: 'Longest Palindromic Substring', category: 'Dynamic Programming', difficulty: 'Medium', companies: ['Amazon', 'Uber'], type: 'Coding' },
        { id: 6, title: 'Zigzag Conversion', category: 'String Manipulation', difficulty: 'Medium', companies: ['PayPal'], type: 'Coding' },
        { id: 7, title: 'Reverse Integer', category: 'Math & Geometry', difficulty: 'Easy', companies: ['Apple'], type: 'Coding' },
        { id: 8, title: 'String to Integer (atoi)', category: 'String Manipulation', difficulty: 'Medium', companies: ['Microsoft'], type: 'Coding' },
        { id: 9, title: 'Container With Most Water', category: 'Two Pointers', difficulty: 'Medium', companies: ['Meta', 'Amazon'], type: 'Coding' },
        { id: 10, title: 'LRU Cache Design', category: 'System Design', difficulty: 'Hard', companies: ['Google', 'Amazon', 'Meta'], type: 'System Design' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle selection
  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectAll = () => {
    if (selectedIds.length === filteredQuestions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredQuestions.map((q) => q.id));
    }
  };

  // Download JSON from Backend API
  const handleDownload = async () => {
    if (selectedIds.length === 0) return;
    setDownloading(true);

    try {
      const stored = localStorage.getItem('prepforge_user');
      const userObj = stored ? JSON.parse(stored) : null;
      const userEmail = userObj?.email || '';

      const response = await fetch(`/download?email=${encodeURIComponent(userEmail)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedIds),
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `prepforge_questions_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.warn('Backend download fallback', err);
      // Fallback JSON download
      const selectedData = filteredQuestions.filter((q) => selectedIds.includes(q.id));
      const blob = new Blob([JSON.stringify(selectedData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'prepforge_questions.json';
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  // Filter local search term if typed
  const filteredQuestions = questions.filter((q) => {
    if (!searchTerm) return true;
    return (
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.companies && q.companies.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Explore Interview Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#908fa0] mt-1">
            Filter real technical interview challenges by company, difficulty, or topic. Select questions to export JSON.
          </p>
        </div>

        {/* Export Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={selectedIds.length === 0 || downloading}
            className={`
              px-5 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 shadow-lg
              ${selectedIds.length > 0 
                ? 'bg-gradient-to-r from-[#6001d1] to-[#8083ff] text-white hover:opacity-95 shadow-purple-900/40 cursor-pointer' 
                : 'bg-[#1b1b23] text-[#908fa0] border border-[#34343d] cursor-not-allowed opacity-60'
              }
            `}
          >
            <span className="material-symbols-outlined text-sm">
              {downloading ? 'sync' : 'download'}
            </span>
            <span>
              {downloading ? 'Generating JSON...' : `Export Selected JSON (${selectedIds.length})`}
            </span>
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-[#13131b] border border-[#34343d] space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* Search Term Input */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#908fa0] text-sm">search</span>
            <input
              type="text"
              placeholder="Search by title or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl pl-9 pr-3 py-2 text-xs text-[#e4e1ed] placeholder-[#908fa0] focus:outline-none focus:border-[#c0c1ff]"
            />
          </div>

          {/* Company Dropdown */}
          <div className="relative">
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl px-3 py-2 text-xs text-[#e4e1ed] focus:outline-none focus:border-[#c0c1ff] appearance-none"
            >
              <option value="">All Companies</option>
              <option value="Google">Google</option>
              <option value="Amazon">Amazon</option>
              <option value="Meta">Meta</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Apple">Apple</option>
              <option value="Uber">Uber</option>
              <option value="Netflix">Netflix</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#908fa0] text-sm pointer-events-none">expand_more</span>
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl px-3 py-2 text-xs text-[#e4e1ed] focus:outline-none focus:border-[#c0c1ff] appearance-none"
            >
              <option value="">All Categories</option>
              <option value="Arrays & Hashing">Arrays & Hashing</option>
              <option value="Dynamic Programming">Dynamic Programming</option>
              <option value="Binary Search">Binary Search</option>
              <option value="Linked List">Linked List</option>
              <option value="System Design">System Design</option>
              <option value="String Manipulation">String Manipulation</option>
              <option value="Two Pointers">Two Pointers</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#908fa0] text-sm pointer-events-none">expand_more</span>
          </div>

          {/* Difficulty Tabs */}
          <div className="flex bg-[#1b1b23] border border-[#34343d] rounded-xl p-1">
            {['', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`
                  flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold transition-all text-center
                  ${difficulty === diff ? 'bg-[#6001d1] text-white shadow' : 'text-[#908fa0] hover:text-white'}
                `}
              >
                {diff || 'All'}
              </button>
            ))}
          </div>

        </div>

        {/* Active Filters Badges */}
        {(company || category || difficulty || searchTerm) && (
          <div className="flex items-center gap-2 pt-2 border-t border-[#34343d]/60 text-xs">
            <span className="text-[#908fa0]">Active Filters:</span>
            {company && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#1f1f27] border border-[#464554] text-[#c0c1ff] flex items-center gap-1">
                Company: {company}
                <button onClick={() => setCompany('')} className="hover:text-white">×</button>
              </span>
            )}
            {category && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#1f1f27] border border-[#464554] text-[#ffb783] flex items-center gap-1">
                Category: {category}
                <button onClick={() => setCategory('')} className="hover:text-white">×</button>
              </span>
            )}
            {difficulty && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#1f1f27] border border-[#464554] text-[#d2bbff] flex items-center gap-1">
                Difficulty: {difficulty}
                <button onClick={() => setDifficulty('')} className="hover:text-white">×</button>
              </span>
            )}
            <button
              onClick={() => { setCompany(''); setCategory(''); setDifficulty(''); setSearchTerm(''); }}
              className="text-[#c0c1ff] underline hover:text-white ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Questions Table */}
      <div className="bg-[#13131b] border border-[#34343d] rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#34343d] flex items-center justify-between bg-[#191925]/60 text-xs text-[#908fa0]">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedIds.length > 0 && selectedIds.length === filteredQuestions.length}
              onChange={selectAll}
              className="rounded bg-[#1b1b23] border-[#464554] text-[#6001d1] focus:ring-0 cursor-pointer"
            />
            <span className="font-semibold text-white">
              Showing {filteredQuestions.length} Questions
            </span>
          </div>

          <span className="text-[11px] font-mono">
            {selectedIds.length} items selected for export
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-[#908fa0] space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#6001d1] border-t-transparent animate-spin mx-auto"></div>
            <p>Fetching questions from FastAPI backend...</p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="p-12 text-center text-[#908fa0]">
            <span className="material-symbols-outlined text-4xl mb-2 text-[#464554]">search_off</span>
            <p className="font-medium text-sm text-white">No questions found matching your criteria</p>
            <p className="text-xs mt-1">Try clearing some filters or searching for another term.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#34343d]/60">
            {filteredQuestions.map((q) => {
              const isSelected = selectedIds.includes(q.id);
              const isSolved = solvedIds.includes(q.id);
              const companiesList = Array.isArray(q.companies) ? q.companies : (q.companies ? [q.companies] : []);

              return (
                <div
                  key={q.id}
                  className={`
                    p-4 sm:px-6 flex items-center justify-between gap-4 transition-all hover:bg-[#1b1b23]/80
                    ${isSelected ? 'bg-[#6001d1]/10 border-l-4 border-l-[#6001d1]' : ''}
                  `}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(q.id)}
                      className="rounded bg-[#1b1b23] border-[#464554] text-[#6001d1] focus:ring-0 cursor-pointer"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/solver/${q.id}`}
                          className="font-semibold text-sm text-white hover:text-[#c0c1ff] transition-colors"
                        >
                          {q.title}
                        </Link>
                        {isSolved && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono flex items-center gap-1 font-semibold">
                            <span>✓</span> Solved
                          </span>
                        )}
                        {q.type && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f1f27] text-[#908fa0] border border-[#34343d]">
                            {q.type}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="text-xs text-[#908fa0]">{q.category}</span>
                        {companiesList.length > 0 && (
                          <>
                            <span className="text-xs text-[#464554]">|</span>
                            <div className="flex items-center gap-1">
                              {companiesList.map((comp, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-[#1b1b23] border border-[#464554]/40 text-[#c0c1ff]">
                                  {comp}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                      q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                      q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                      'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}>
                      {q.difficulty}
                    </span>

                    <Link
                      to={`/solver/${q.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-[#1f1f27] hover:bg-[#6001d1] text-white text-xs font-medium transition-all flex items-center gap-1.5 shadow"
                    >
                      <span>Solve</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
