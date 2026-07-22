import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({
    solved_count: 0,
    easy_solved: 0,
    medium_solved: 0,
    hard_solved: 0,
    solved_ids: []
  });
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [dailyQuestion, setDailyQuestion] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('prepforge_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        fetchUserProgress(parsed.email);
      } catch (e) {
        console.warn("Failed to parse user session", e);
      }
    }
    fetchQuestions();
    fetchDailyQuestion();
  }, []);

  const fetchUserProgress = async (userEmail) => {
    if (!userEmail) return;
    try {
      const res = await fetch(`/api/user/progress?email=${encodeURIComponent(userEmail)}`);
      if (res.ok) {
        const data = await res.json();
        setProgress(data);
      }
    } catch (err) {
      console.warn("Failed to fetch user progress", err);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/questions');
      if (res.ok) {
        const data = await res.json();
        setRecentQuestions(data.slice(0, 4));
      }
    } catch (err) {
      console.warn("Failed to fetch questions", err);
    }
  };

  const fetchDailyQuestion = async () => {
    try {
      const res = await fetch('/api/questions/daily');
      if (res.ok) {
        const data = await res.json();
        setDailyQuestion(data.question);
      }
    } catch (err) {
      console.warn("Failed to fetch daily question", err);
    }
  };

  const userName = user?.name || "Developer";

  const stats = [
    { label: 'Questions Solved', value: `${progress.solved_count}`, total: '/ 90', icon: 'check_circle', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Easy Solved', value: `${progress.easy_solved}`, total: '/ 30', icon: 'task_alt', color: 'text-[#c0c1ff]', bg: 'bg-[#6001d1]/10 border-[#6001d1]/30' },
    { label: 'Medium Solved', value: `${progress.medium_solved}`, total: '/ 40', icon: 'insights', color: 'text-[#ffb783]', bg: 'bg-[#d97721]/10 border-[#d97721]/30' },
    { label: 'Hard Solved', value: `${progress.hard_solved}`, total: '/ 20', icon: 'military_tech', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#191925] via-[#13131b] to-[#1f1f27] border border-[#34343d] p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-[#6001d1]/10 to-transparent pointer-events-none"></div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            Welcome back, {userName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#908fa0] mt-1">
            Track your interview prep stats, launch coding practice, and solve daily auto-generated problems.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={dailyQuestion ? `/solver/${dailyQuestion.id}` : '/solver/1'}
            className="px-4 py-2.5 bg-gradient-to-r from-[#6001d1] to-[#8083ff] text-white text-xs font-semibold rounded-xl shadow-lg shadow-purple-900/30 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">wb_sunny</span>
            <span>Solve Daily Problem</span>
          </Link>
          <Link
            to="/questions"
            className="px-4 py-2.5 bg-[#1f1f27] hover:bg-[#34343d] border border-[#464554]/40 text-xs font-semibold text-[#e4e1ed] rounded-xl transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Export Set</span>
          </Link>
        </div>
      </div>

      {/* Daily Problem of the Day Highlight Banner */}
      {dailyQuestion && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1b1b23] via-[#161622] to-[#1f1f2a] border border-[#6001d1]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-full bg-[#6001d1]/10 blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#6001d1] to-[#8083ff] text-white flex items-center justify-center font-bold shadow-lg shadow-purple-900/40">
              <span className="material-symbols-outlined text-2xl">wb_sunny</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ⚡ Today's Morning Challenge
                </span>
                <span className="text-xs text-[#908fa0] font-mono">{dailyQuestion.created_date || 'Live'}</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">{dailyQuestion.title}</h2>
              <p className="text-xs text-[#908fa0] mt-0.5 line-clamp-1">{dailyQuestion.statement}</p>
            </div>
          </div>

          <Link
            to={`/solver/${dailyQuestion.id}`}
            className="px-5 py-2.5 bg-gradient-to-r from-[#6001d1] to-[#8083ff] hover:opacity-95 text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <span>Solve Daily Question</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border ${stat.bg} backdrop-blur-md flex flex-col justify-between`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#908fa0] font-medium">{stat.label}</span>
              <span className={`material-symbols-outlined text-xl ${stat.color}`}>{stat.icon}</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono flex items-baseline gap-1.5">
                <span>{stat.value}</span>
                {stat.total && <span className="text-xs text-[#908fa0] font-normal">{stat.total}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Featured Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Practice Timeline */}
        <div className="lg:col-span-2 bg-[#13131b] border border-[#34343d] rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-lg text-white">Featured Practice Questions</h2>
              <p className="text-xs text-[#908fa0]">Top technical questions available on PrepForge</p>
            </div>
            <Link to="/questions" className="text-xs text-[#c0c1ff] font-medium hover:underline flex items-center gap-1">
              <span>View All</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </Link>
          </div>

          <div className="space-y-3">
            {recentQuestions.map((q) => {
              const isSolved = progress.solved_ids.includes(q.id);
              return (
                <div key={q.id} className="p-4 rounded-2xl bg-[#1b1b23] border border-[#34343d]/60 hover:border-[#6001d1]/40 flex items-center justify-between transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#1f1f27] border border-[#464554]/40 flex items-center justify-center text-[#c0c1ff] font-mono text-xs font-bold">
                      #{q.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link to={`/solver/${q.id}`} className="text-sm font-semibold text-white hover:text-[#c0c1ff] transition-colors">
                          {q.title}
                        </Link>
                        {isSolved && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono flex items-center gap-1 font-semibold">
                            <span>✓</span> Solved
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-[#908fa0] mt-1">
                        <span className="text-[#c0c1ff] font-mono">{q.category}</span>
                        <span>•</span>
                        <span>{q.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/solver/${q.id}`}
                    className="px-3 py-1.5 bg-[#1f1f27] hover:bg-[#34343d] border border-[#464554]/40 text-xs font-medium text-white rounded-xl transition-all"
                  >
                    Solve
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Domains */}
        <div className="bg-[#13131b] border border-[#34343d] rounded-3xl p-6 space-y-6">
          <div>
            <h2 className="font-bold text-lg text-white">Recommended Domains</h2>
            <p className="text-xs text-[#908fa0]">Top domain categories to master</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#1b1b23] border border-[#34343d]/60 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Data Structures</span>
                <span className="font-mono text-[#c0c1ff]">Arrays & Trees</span>
              </div>
              <p className="text-[11px] text-[#908fa0]">Master core SDE interview fundamentals.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1b1b23] border border-[#34343d]/60 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">System Design</span>
                <span className="font-mono text-[#ffb783]">Distributed Systems</span>
              </div>
              <p className="text-[11px] text-[#908fa0]">High-level architecture and database scaling.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
