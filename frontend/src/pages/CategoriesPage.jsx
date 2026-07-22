import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CategoriesPage() {
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('prepforge_user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user?.email) {
          fetch(`/api/user/progress?email=${encodeURIComponent(user.email)}`)
            .then(res => res.json())
            .then(data => setSolvedCount(data.solved_count || 0))
            .catch(() => {});
        }
      } catch (e) {}
    }
  }, []);

  const categories = [
    { name: 'Arrays & Hashing', icon: 'view_module', count: 30, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { name: 'Two Pointers', icon: 'swap_horiz', count: 15, color: 'text-teal-400', bg: 'bg-teal-500/10' },
    { name: 'Sliding Window', icon: 'splitscreen', count: 10, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { name: 'Binary Search', icon: 'search', count: 15, color: 'text-[#c0c1ff]', bg: 'bg-[#6001d1]/10' },
    { name: 'Trees & Graphs', icon: 'account_tree', count: 20, color: 'text-[#d2bbff]', bg: 'bg-purple-500/10' },
    { name: 'Dynamic Programming', icon: 'auto_awesome', count: 25, color: 'text-[#ffb783]', bg: 'bg-[#d97721]/10' },
    { name: 'System Design', icon: 'hub', count: 15, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { name: 'String Manipulation', icon: 'text_fields', count: 20, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          Topic & Pattern Categories
        </h1>
        <p className="text-xs sm:text-sm text-[#908fa0] mt-1">
          Master core computer science topics and algorithmic patterns required for technical interviews.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const progress = solvedCount > 0 ? Math.min(100, Math.round((solvedCount / 5) * 100)) : 0;
          return (
            <div
              key={cat.name}
              className="p-6 rounded-3xl bg-[#13131b] border border-[#34343d] hover:border-[#6001d1]/50 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${cat.bg} flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#908fa0]">{cat.count} Problems</span>
                </div>

                <h2 className="text-lg font-bold text-white mb-2">{cat.name}</h2>

                {/* Progress Bar */}
                <div className="space-y-1.5 mb-6">
                  <div className="flex justify-between text-[11px] text-[#908fa0]">
                    <span>Real Mastery</span>
                    <span className="font-mono text-white font-semibold">{progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1b1b23] overflow-hidden">
                    <div style={{ width: `${progress}%` }} className="h-full rounded-full bg-gradient-to-r from-[#6001d1] to-[#8083ff] transition-all duration-500"></div>
                  </div>
                </div>
              </div>

              <Link
                to={`/questions?category=${encodeURIComponent(cat.name)}`}
                className="w-full py-2.5 bg-[#1f1f27] hover:bg-[#6001d1] text-[#e4e1ed] hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow"
              >
                <span>Practice Pattern</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          );
        })}
      </div>

    </div>
  );
}
