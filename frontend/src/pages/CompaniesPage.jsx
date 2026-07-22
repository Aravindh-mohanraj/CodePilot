import React from 'react';
import { Link } from 'react-router-dom';

export default function CompaniesPage() {
  const companies = [
    { name: 'Google', count: 340, easy: 90, medium: 180, hard: 70, tag: 'FAANG', color: 'from-[#4285F4]/20 to-blue-900/10' },
    { name: 'Amazon', count: 420, easy: 110, medium: 230, hard: 80, tag: 'FAANG', color: 'from-[#FF9900]/20 to-amber-900/10' },
    { name: 'Meta', count: 290, easy: 70, medium: 160, hard: 60, tag: 'FAANG', color: 'from-[#0668E1]/20 to-indigo-900/10' },
    { name: 'Microsoft', count: 310, easy: 100, medium: 160, hard: 50, tag: 'Big Tech', color: 'from-[#00A4EF]/20 to-cyan-900/10' },
    { name: 'Apple', count: 180, easy: 50, medium: 95, hard: 35, tag: 'FAANG', color: 'from-gray-500/20 to-gray-900/10' },
    { name: 'Netflix', count: 120, easy: 20, medium: 65, hard: 35, tag: 'FAANG', color: 'from-[#E50914]/20 to-rose-900/10' },
    { name: 'Uber', count: 210, easy: 45, medium: 120, hard: 45, tag: 'Unicorn', color: 'from-emerald-600/20 to-teal-900/10' },
    { name: 'Stripe', count: 150, easy: 30, medium: 85, hard: 35, tag: 'FinTech', color: 'from-[#635BFF]/20 to-purple-900/10' },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          Top Tech Companies
        </h1>
        <p className="text-xs sm:text-sm text-[#908fa0] mt-1">
          Browse question sets tagged by real tech interview questions asked at top engineering teams.
        </p>
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {companies.map((company) => (
          <div
            key={company.name}
            className={`p-6 rounded-3xl bg-gradient-to-br ${company.color} bg-[#13131b] border border-[#34343d] hover:border-[#6001d1]/50 transition-all flex flex-col justify-between group shadow-xl`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-3xl text-[#c0c1ff] group-hover:scale-110 transition-transform">
                  domain
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#1f1f27] text-[#c0c1ff] border border-[#34343d]">
                  {company.tag}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">{company.name}</h2>
              <p className="text-xs font-mono text-[#908fa0] mb-4">{company.count} Sourced Questions</p>

              {/* Difficulty Breakdown Bar */}
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-[10px] font-mono text-[#908fa0]">
                  <span className="text-emerald-400">Easy ({company.easy})</span>
                  <span className="text-amber-400">Med ({company.medium})</span>
                  <span className="text-rose-400">Hard ({company.hard})</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1b1b23] flex overflow-hidden">
                  <div style={{ width: `${(company.easy / company.count) * 100}%` }} className="bg-emerald-400 h-full"></div>
                  <div style={{ width: `${(company.medium / company.count) * 100}%` }} className="bg-amber-400 h-full"></div>
                  <div style={{ width: `${(company.hard / company.count) * 100}%` }} className="bg-rose-400 h-full"></div>
                </div>
              </div>
            </div>

            <Link
              to={`/questions?company=${company.name}`}
              className="w-full py-2.5 bg-[#1f1f27] hover:bg-[#6001d1] text-[#e4e1ed] hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow"
            >
              <span>Practice Questions</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
