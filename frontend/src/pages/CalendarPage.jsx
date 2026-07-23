import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CalendarPage() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'single'
  const [loading, setLoading] = useState(true);
  const [fetchingGFG, setFetchingGFG] = useState(false);
  const [company, setCompany] = useState('Google');
  const [difficulty, setDifficulty] = useState('Medium');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/daily/calendar');
      const data = await res.json();
      if (res.ok && data.calendar) {
        setCalendarEvents(data.calendar);
      }
    } catch (err) {
      console.warn('Calendar fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchGFG = async () => {
    setFetchingGFG(true);
    setMsg('');
    try {
      const res = await fetch(`/api/daily/fetch-gfg?company=${encodeURIComponent(company)}&difficulty=${encodeURIComponent(difficulty)}&target_date=${encodeURIComponent(selectedDate)}`, {
        method: 'POST'
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(`✨ ${data.message || 'Scraped & AI Generated 10 test cases!'}`);
        await fetchCalendarData();
      } else {
        setMsg(`⚠️ ${data.detail || 'Failed to fetch GFG questions'}`);
      }
    } catch (err) {
      setMsg('⚠️ Network error fetching GFG questions.');
    } finally {
      setFetchingGFG(false);
    }
  };

  // Group events by date
  const eventsByDate = calendarEvents.reduce((acc, ev) => {
    const d = ev.created_date || 'Unknown';
    if (!acc[d]) acc[d] = [];
    acc[d].push(ev);
    return acc;
  }, {});

  const datesList = Object.keys(eventsByDate).sort().reverse();

  // Filtered questions
  const displayedQuestions = viewMode === 'single'
    ? calendarEvents.filter((e) => e.created_date === selectedDate)
    : calendarEvents;

  // Quick Date Navigator Helpers
  const changeDateBy = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().slice(0, 10));
    setViewMode('single');
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 text-[#e4e1ed]">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#13131b] via-[#1a1926] to-[#13131b] border border-[#34343d] shadow-2xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6001d1]/20 border border-[#6001d1]/40 text-[#c0c1ff] text-xs font-semibold mb-2">
            <span className="material-symbols-outlined text-sm text-amber-400">calendar_today</span>
            <span>Real-Time Day-to-Day Interview Calendar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Daily Interview Questions & Calendar
          </h1>
          <p className="text-xs sm:text-sm text-[#908fa0] max-w-2xl">
            Track daily interview questions asked by top tech companies. Powered by Playwright real-time GFG scraper with 10 edge-case test cases per problem.
          </p>
        </div>

        {/* View mode toggle controls */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="flex bg-[#1b1b23] border border-[#34343d] rounded-xl p-1">
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'all' ? 'bg-[#6001d1] text-white' : 'text-[#908fa0] hover:text-white'
              }`}
            >
              All Dates ({calendarEvents.length})
            </button>
            <button
              onClick={() => setViewMode('single')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'single' ? 'bg-[#6001d1] text-white' : 'text-[#908fa0] hover:text-white'
              }`}
            >
              Selected Date Only
            </button>
          </div>

          <button
            onClick={() => { setSelectedDate(new Date().toISOString().slice(0, 10)); setViewMode('single'); }}
            className="px-4 py-2 rounded-xl bg-[#1b1b23] border border-[#34343d] text-xs font-semibold text-[#c0c1ff] hover:text-white transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">today</span>
            <span>Today</span>
          </button>
        </div>
      </div>

      {/* Interactive 14-Day Calendar Date Bar */}
      <div className="p-4 rounded-2xl bg-[#13131b] border border-[#34343d] space-y-3">
        <div className="flex items-center justify-between text-xs text-[#908fa0]">
          <span className="font-bold text-white flex items-center gap-1.5">
            <span className="material-symbols-outlined text-amber-400 text-sm">date_range</span>
            <span>Recent 14-Day Activity Heatmap</span>
          </span>
          <span>Click any date below to inspect daily GFG questions</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {datesList.slice(0, 14).map((d) => {
            const count = eventsByDate[d]?.length || 0;
            const isSelected = selectedDate === d && viewMode === 'single';

            return (
              <button
                key={d}
                onClick={() => { setSelectedDate(d); setViewMode('single'); }}
                className={`flex-1 min-w-[90px] p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-[#6001d1] border-[#8083ff] text-white shadow-lg shadow-purple-900/40'
                    : 'bg-[#1b1b23] border-[#34343d] hover:border-[#6001d1]/50 text-[#908fa0] hover:text-white'
                }`}
              >
                <span className="text-[10px] font-mono opacity-80">{d.slice(5)}</span>
                <span className="text-xs font-bold text-white mt-0.5">{count} Questions</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time GFG Scraper Controls Panel */}
      <div className="p-6 rounded-3xl bg-[#13131b] border border-[#34343d] space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#34343d]/60 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <span className="material-symbols-outlined text-amber-400 text-base">travel_explore</span>
            <span>GeeksforGeeks Real-Time Playwright Scraper</span>
          </div>
          <span className="text-[11px] font-mono text-[#908fa0]">Playwright + BeautifulSoup + Gemini AI</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-[#908fa0] mb-1">Company</label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c0c1ff]"
            >
              <option value="Google">Google</option>
              <option value="Amazon">Amazon</option>
              <option value="Meta">Meta</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Apple">Apple</option>
              <option value="Uber">Uber</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#908fa0] mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c0c1ff]"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#908fa0] mb-1">Target Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c0c1ff]"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleFetchGFG}
              disabled={fetchingGFG}
              className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-[#6001d1] to-[#8083ff] text-white font-bold text-xs shadow-lg shadow-purple-900/40 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {fetchingGFG ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
              )}
              <span>{fetchingGFG ? 'Scraping GFG...' : 'Scrape GFG & Add Question'}</span>
            </button>
          </div>
        </div>

        {msg && (
          <div className="p-3 rounded-xl bg-[#1f1f27] border border-[#6001d1]/40 text-xs text-[#c0c1ff] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-amber-400">info</span>
            <span>{msg}</span>
          </div>
        )}
      </div>

      {/* Date Navigation & Calendar Question List */}
      <div className="space-y-4">
        
        {/* Date Controls Bar */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#13131b] border border-[#34343d]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => changeDateBy(-1)}
              className="p-1.5 rounded-lg bg-[#1b1b23] border border-[#34343d] text-[#908fa0] hover:text-white transition-colors"
              title="Previous Day"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-mono">
                {viewMode === 'all' ? 'All Stored Calendar Dates' : selectedDate}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#1f1f27] text-[10px] text-[#c0c1ff] border border-[#34343d] font-mono font-bold">
                {displayedQuestions.length} Questions
              </span>
            </div>

            <button
              onClick={() => changeDateBy(1)}
              className="p-1.5 rounded-lg bg-[#1b1b23] border border-[#34343d] text-[#908fa0] hover:text-white transition-colors"
              title="Next Day"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Questions Grid */}
        {loading ? (
          <div className="p-12 text-center text-xs text-[#908fa0] space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#6001d1] border-t-transparent animate-spin mx-auto"></div>
            <p>Loading Calendar Questions...</p>
          </div>
        ) : displayedQuestions.length === 0 ? (
          <div className="p-12 text-center text-[#908fa0] bg-[#13131b] border border-[#34343d] rounded-3xl space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#464554]">calendar_today</span>
            <p className="font-semibold text-sm text-white">No questions stored for {selectedDate}</p>
            <p className="text-xs">Use the Playwright GFG scraper above to fetch and generate real-time questions for this date!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedQuestions.map((q) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-[#13131b] border border-[#34343d] hover:border-[#6001d1]/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f1f27] text-[#c0c1ff] border border-[#34343d]">
                      📅 {q.created_date}
                    </span>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      q.difficulty === 'Easy' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                      q.difficulty === 'Medium' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                      'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-[#c0c1ff] transition-colors">
                    {q.title}
                  </h3>

                  <p className="text-xs text-[#908fa0] line-clamp-2 leading-relaxed">
                    {q.statement}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#34343d]/60 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    {q.companies && q.companies.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#1f1f27] text-[10px] text-[#ffb783] border border-[#34343d] font-semibold">
                        {c}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                      ✓ 10 Test Cases
                    </span>
                  </div>

                  <Link
                    to={`/solver/${q.id}`}
                    className="px-3 py-1.5 rounded-xl bg-[#6001d1]/20 hover:bg-[#6001d1]/40 border border-[#6001d1]/50 text-[#c0c1ff] text-xs font-bold transition-all flex items-center gap-1 shrink-0"
                  >
                    <span>Solve in AI IDE</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
