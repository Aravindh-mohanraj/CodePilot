import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0d15] text-[#e4e1ed] relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6001d1]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#c0c1ff]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1f1f27] border border-[#6001d1]/40 text-xs font-medium text-[#c0c1ff] mb-8 shadow-lg shadow-purple-950/40">
          <span className="material-symbols-outlined text-sm text-[#ffb783]">auto_awesome</span>
          <span>Next-Gen AI Interview Preparation Platform</span>
          <span className="bg-[#6001d1] text-white text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase">v2.0</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Master the Code. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#c0c1ff] via-[#d2bbff] to-[#ffb783] bg-clip-text text-transparent">
            Conquer the Interview.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#908fa0] max-w-2xl leading-relaxed mb-10">
          PrepForge AI aggregates real company questions, generates AI solutions in Python & Java, runs custom test cases, and lets you export curated question collections instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            to="/questions"
            className="px-8 py-3.5 bg-gradient-to-r from-[#6001d1] to-[#8083ff] hover:from-[#7002f1] hover:to-[#9093ff] text-white font-semibold rounded-2xl shadow-xl shadow-purple-900/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
          >
            <span>Explore Questions</span>
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
          </Link>
          <Link
            to="/solver/1"
            className="px-8 py-3.5 bg-[#1f1f27] hover:bg-[#34343d] border border-[#464554]/50 text-[#e4e1ed] font-semibold rounded-2xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
          >
            <span>Open AI Solver</span>
            <span className="material-symbols-outlined text-sm">code</span>
          </Link>
          <Link
            to="/dashboard"
            onClick={() => {
              if (!localStorage.getItem('prepforge_user')) {
                const guestUser = {
                  id: 9999,
                  name: 'Guest Developer',
                  email: 'Guest Mode (No Email Required)',
                  avatar: 'https://ui-avatars.com/api/?name=Guest+Developer&background=6001d1&color=fff&bold=true&size=128',
                  is_guest: true,
                  is_verified: 'true'
                };
                localStorage.setItem('prepforge_user', JSON.stringify(guestUser));
                localStorage.setItem('prepforge_token', 'guest_access_token');
                window.dispatchEvent(new Event('storage'));
              }
            }}
            className="px-6 py-3.5 bg-[#6001d1]/20 hover:bg-[#6001d1]/30 border border-[#6001d1]/50 text-[#c0c1ff] font-semibold rounded-2xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-sm">account_circle</span>
            <span>Try as Guest</span>
          </Link>
        </div>

        {/* Feature Cards Showcase Container */}
        <div className="w-full max-w-5xl rounded-3xl bg-[#13131b]/90 border border-[#34343d] p-4 sm:p-8 shadow-2xl backdrop-blur-2xl relative">
          <div className="flex items-center justify-between border-b border-[#34343d]/80 pb-4 mb-6 text-xs text-[#908fa0]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="ml-2 font-mono text-[11px]">prepforge-ai-terminal</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="text-emerald-400">● Live Backend</span>
              <span>FastAPI 0.110</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Card 1 */}
            <div className="p-5 rounded-2xl bg-[#1b1b23] border border-[#464554]/30 hover:border-[#6001d1]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#6001d1]/20 border border-[#6001d1]/40 flex items-center justify-center text-[#c0c1ff] mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">filter_alt</span>
              </div>
              <h3 className="font-bold text-white text-base mb-2">Company & Category Filtering</h3>
              <p className="text-xs text-[#908fa0] leading-relaxed">
                Filter questions by company (Google, Amazon, Meta, Uber) and difficulty (Easy, Medium, Hard).
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-2xl bg-[#1b1b23] border border-[#464554]/30 hover:border-[#6001d1]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#d97721]/20 border border-[#d97721]/40 flex items-center justify-center text-[#ffb783] mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h3 className="font-bold text-white text-base mb-2">Gemini AI Solution Generator</h3>
              <p className="text-xs text-[#908fa0] leading-relaxed">
                Generate clean Python & Java solutions, step-by-step logic, and custom unit tests with one click.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-2xl bg-[#1b1b23] border border-[#464554]/30 hover:border-[#6001d1]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#8083ff]/20 border border-[#8083ff]/40 flex items-center justify-center text-[#d2bbff] mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">download</span>
              </div>
              <h3 className="font-bold text-white text-base mb-2">Custom JSON Export</h3>
              <p className="text-xs text-[#908fa0] leading-relaxed">
                Select your target questions and export structured JSON bundles directly to your local workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker / Stats */}
      <section className="py-12 border-y border-[#34343d]/60 bg-[#13131b]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-extrabold text-[#c0c1ff] font-mono">1,500+</div>
              <div className="text-xs text-[#908fa0] mt-1">Curated Tech Questions</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#d2bbff] font-mono">150+</div>
              <div className="text-xs text-[#908fa0] mt-1">Top Tech Companies</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#ffb783] font-mono">99.4%</div>
              <div className="text-xs text-[#908fa0] mt-1">AI Solution Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">Instant</div>
              <div className="text-xs text-[#908fa0] mt-1">JSON Export Capability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Companies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Prepare for Target Companies</h2>
          <p className="text-xs sm:text-sm text-[#908fa0]">Real interview questions sourced from top tier engineering teams</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Netflix'].map((company) => (
            <Link
              key={company}
              to={`/questions?company=${company}`}
              className="p-4 rounded-2xl bg-[#1b1b23] border border-[#34343d] hover:border-[#6001d1] flex flex-col items-center justify-center transition-all group hover:-translate-y-1"
            >
              <span className="material-symbols-outlined text-2xl text-[#c0c1ff] mb-2 group-hover:scale-110 transition-transform">domain</span>
              <span className="font-semibold text-sm text-white">{company}</span>
              <span className="text-[11px] text-[#908fa0] mt-1">Explore Questions</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#34343d]/60 text-center text-xs text-[#908fa0]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">PrepForge AI</span>
            <span>© 2026. Built with React & FastAPI</span>
          </div>
          <div className="flex gap-6">
            <Link to="/questions" className="hover:text-white transition-colors">Questions</Link>
            <Link to="/companies" className="hover:text-white transition-colors">Companies</Link>
            <Link to="/categories" className="hover:text-white transition-colors">Categories</Link>
            <Link to="/solver/1" className="hover:text-white transition-colors">AI Solver</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
