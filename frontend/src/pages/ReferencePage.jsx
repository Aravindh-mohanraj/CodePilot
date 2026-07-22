import React, { useState, useEffect } from 'react';

const TOPICS = [
  { name: 'Machine Learning', icon: 'psychology', color: '#c0c1ff', bg: '#6001d1' },
  { name: 'Operating Systems', icon: 'memory', color: '#ffb783', bg: '#d97721' },
  { name: 'Database Management', icon: 'database', color: '#86efac', bg: '#16a34a' },
  { name: 'Computer Networks', icon: 'hub', color: '#67e8f9', bg: '#0891b2' },
  { name: 'System Design', icon: 'architecture', color: '#f0abfc', bg: '#a21caf' },
  { name: 'Object Oriented Programming', icon: 'code_blocks', color: '#fca5a5', bg: '#dc2626' },
  { name: 'Data Structures', icon: 'account_tree', color: '#d2bbff', bg: '#7c3aed' },
  { name: 'Algorithms', icon: 'calculate', color: '#fed7aa', bg: '#ea580c' },
];

const DIFFICULTY_COLORS = {
  Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  Hard: 'text-rose-400 bg-rose-400/10 border-rose-400/30',
};

export default function ReferencePage() {
  const [activeTopic, setActiveTopic] = useState(TOPICS[0].name);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchQuestions = async (topic, diff = '', q = '') => {
    setLoading(true);
    setExpandedId(null);
    try {
      const params = new URLSearchParams({ topic, limit: 100 });
      if (diff) params.set('difficulty', diff);
      if (q) params.set('search', q);
      const res = await fetch(`/reference/questions?${params}`);
      const data = await res.json();
      setQuestions(data.questions || []);
      setTotal(data.total || 0);
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(activeTopic, difficulty, search);
  }, [activeTopic, difficulty]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchQuestions(activeTopic, difficulty, search);
  };

  const activeMeta = TOPICS.find(t => t.name === activeTopic) || TOPICS[0];

  return (
    <div className="min-h-screen bg-[#0d0d15] text-[#e4e1ed] p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ background: `linear-gradient(135deg, ${activeMeta.bg}, ${activeMeta.color}44)` }}>
            <span className="material-symbols-outlined text-xl">{activeMeta.icon}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Reference Library</h1>
            <p className="text-xs text-[#908fa0]">Non-coding interview Q&amp;A — ML, OS, DBMS, Networks, System Design &amp; more</p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">

        {/* Sidebar Topics */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-[#13131b] border border-[#34343d]/60 rounded-2xl p-3 space-y-1">
            {TOPICS.map(topic => (
              <button
                key={topic.name}
                onClick={() => { setActiveTopic(topic.name); setSearch(''); setDifficulty(''); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                  ${activeTopic === topic.name
                    ? 'text-white bg-[#6001d1]/20 border border-[#6001d1]/40'
                    : 'text-[#908fa0] hover:text-[#e4e1ed] hover:bg-[#1f1f27]'}`}
              >
                <span className="material-symbols-outlined text-base" style={{ color: activeTopic === topic.name ? topic.color : undefined }}>
                  {topic.icon}
                </span>
                <span className="leading-tight">{topic.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#908fa0] text-base">search</span>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#13131b] border border-[#34343d]/60 rounded-xl text-[#e4e1ed] placeholder-[#908fa0] focus:outline-none focus:border-[#6001d1]/60 transition-all"
                />
              </div>
              <button type="submit"
                className="px-4 py-2 bg-[#6001d1] hover:bg-[#7002f1] text-white text-sm font-medium rounded-xl transition-all">
                Search
              </button>
            </form>

            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="px-4 py-2.5 text-sm bg-[#13131b] border border-[#34343d]/60 rounded-xl text-[#e4e1ed] focus:outline-none focus:border-[#6001d1]/60 transition-all"
            >
              <option value="">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Topic heading */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base" style={{ color: activeMeta.color }}>{activeMeta.icon}</span>
              <h2 className="text-lg font-semibold text-white">{activeTopic}</h2>
              <span className="text-xs text-[#908fa0] ml-1">{total} questions</span>
            </div>
          </div>

          {/* Questions */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-8 h-8 border-2 border-[#6001d1] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[#908fa0]">Loading questions...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <span className="material-symbols-outlined text-5xl text-[#34343d]">menu_book</span>
              <div>
                <p className="text-base font-semibold text-[#e4e1ed]">No questions yet</p>
                <p className="text-sm text-[#908fa0] mt-1">Reference questions for this topic will appear here once generated.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-[#13131b] border border-[#34343d]/60 rounded-2xl overflow-hidden hover:border-[#6001d1]/40 transition-all"
                >
                  {/* Question Header (always visible) */}
                  <button
                    className="w-full flex items-start justify-between gap-4 p-4 sm:p-5 text-left"
                    onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="text-xs text-[#908fa0] font-mono mt-0.5 w-6 shrink-0">{idx + 1}.</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#e4e1ed] leading-snug mb-2">{q.title}</p>
                        <div className="flex flex-wrap gap-2">
                          {q.difficulty && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${DIFFICULTY_COLORS[q.difficulty] || DIFFICULTY_COLORS.Medium}`}>
                              {q.difficulty}
                            </span>
                          )}
                          {q.subtopic && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#6001d1]/10 text-[#c0c1ff] border border-[#6001d1]/20">
                              {q.subtopic}
                            </span>
                          )}
                          {(q.tags || []).slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-[#1f1f27] text-[#908fa0] border border-[#34343d]/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className={`material-symbols-outlined text-[#908fa0] text-base shrink-0 mt-1 transition-transform ${expandedId === q.id ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>

                  {/* Answer (expanded) */}
                  {expandedId === q.id && (
                    <div className="border-t border-[#34343d]/60 px-4 sm:px-5 py-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-sm text-[#c0c1ff]">lightbulb</span>
                        <span className="text-xs font-semibold text-[#c0c1ff] uppercase tracking-wider">Answer</span>
                      </div>
                      <div className="text-sm text-[#c7c4d7] leading-relaxed whitespace-pre-line">
                        {q.answer}
                      </div>
                      {q.source && q.source !== 'General' && (
                        <div className="mt-3 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-[#908fa0]">domain</span>
                          <span className="text-xs text-[#908fa0]">Commonly asked at: <strong className="text-[#e4e1ed]">{q.source}</strong></span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
