import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem('prepforge_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCurrentUser(parsed);
        } catch (err) {
          console.warn('Failed to parse user session', err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, [location.pathname]);

  // Lock site requirement: If user is not logged in and attempts to access non-landing pages, force AuthModal
  const isLandingPage = location.pathname === '/';
  const isProtectedPage = !isLandingPage;

  useEffect(() => {
    if (currentUser && location.pathname === '/') {
      navigate('/dashboard', { replace: true });
    }
    if (!currentUser && isProtectedPage) {
      setIsAuthOpen(true);
    }
  }, [currentUser, location.pathname, isProtectedPage, navigate]);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('prepforge_user');
    localStorage.removeItem('prepforge_token');
    setCurrentUser(null);
    navigate('/');
    setIsAuthOpen(true);
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'grid_view' },
    { label: 'Explore Questions', path: '/questions', icon: 'travel_explore' },
    { label: 'Daily Calendar', path: '/calendar', icon: 'calendar_month' },
    { label: 'Companies', path: '/companies', icon: 'domain' },
    { label: 'Categories', path: '/categories', icon: 'category' },
    { label: 'AI Assistant', path: '/ai-assistant', icon: 'smart_toy' },
    { label: 'Reference', path: '/reference', icon: 'menu_book' },
    { label: 'Profile', path: '/profile', icon: 'person' },
  ];


  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/questions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Helper for dynamic user avatar/initials
  const userInitials = currentUser?.name
    ? currentUser.name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join('')
    : 'U';

  return (
    <div className="min-h-screen bg-[#0d0d15] text-[#e4e1ed] flex flex-col font-sans relative">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0d0d15]/80 backdrop-blur-xl border-b border-[#34343d]/60 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#908fa0] hover:text-white p-1"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#6001d1] via-[#8083ff] to-[#c0c1ff] p-0.5 shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#13131b] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-[#c0c1ff] text-lg font-mono">P</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                PrepForge <span className="text-xs px-1.5 py-0.5 rounded bg-[#6001d1]/30 text-[#c0c1ff] border border-[#6001d1]/50 font-mono">AI</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Global Search Bar */}
        {!isLandingPage && (
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#908fa0] text-sm">search</span>
              <input
                type="text"
                placeholder="Search questions, companies, algorithms (Press Enter)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl pl-9 pr-4 py-2 text-xs text-[#e4e1ed] placeholder-[#908fa0] focus:outline-none focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff] transition-all"
              />
            </div>
          </div>
        )}

        {/* Dynamic User Profile Header */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/profile"
                className="flex items-center gap-2.5 px-3 py-1.5 bg-[#1b1b23] hover:bg-[#252530] border border-[#34343d] rounded-xl transition-all group"
              >
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-gradient-to-r from-[#6001d1] to-[#8083ff] text-white flex items-center justify-center font-bold text-xs font-mono shadow-sm">
                    {userInitials}
                  </div>
                )}
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white group-hover:text-[#c0c1ff] transition-colors">{currentUser.name}</span>
                  <span className="text-[10px] text-[#908fa0] font-mono leading-none truncate max-w-[120px]">{currentUser.email}</span>
                </div>
              </Link>

              <button 
                onClick={handleSignOut}
                className="px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all border border-rose-500/20 flex items-center gap-1"
                title="Sign Out"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => openAuth('login')}
                className="px-4 py-2 text-xs font-semibold text-[#c7c4d7] hover:text-white transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={() => openAuth('signup')}
                className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-[#6001d1] to-[#8083ff] hover:from-[#7002f1] hover:to-[#9093ff] text-white rounded-xl shadow-lg shadow-purple-900/30 transition-all flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Body Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        {!isLandingPage && (
          <aside className={`
            fixed md:static inset-y-0 left-0 z-30 w-60 h-[calc(100vh-61px)] bg-[#13131b] border-r border-[#34343d]/60 flex flex-col justify-between py-4 px-3 transition-transform duration-300 overflow-hidden shrink-0
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="space-y-4">
              <div className="px-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#908fa0] mb-2">Navigation</p>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path.split('/')[1] ? `/${item.path.split('/')[1]}` : item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all
                          ${isActive 
                            ? 'bg-[#6001d1]/20 text-[#c0c1ff] border border-[#6001d1]/40 font-semibold' 
                            : 'text-[#908fa0] hover:text-[#e4e1ed] hover:bg-[#1f1f27]'
                          }
                        `}
                      >
                        <span className={`material-symbols-outlined text-lg ${isActive ? 'text-[#c0c1ff]' : 'text-[#908fa0]'}`}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Dynamic Sidebar Profile Footer */}
            <div className="px-3 pt-4 border-t border-[#34343d]/60 space-y-3">
              {currentUser ? (
                <div className="p-3 bg-[#1b1b23] border border-[#34343d] rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="h-8 w-8 rounded-xl object-cover" />
                    ) : (
                      <div className="h-8 w-8 rounded-xl bg-[#6001d1] text-white flex items-center justify-center font-bold text-xs font-mono">
                        {userInitials}
                      </div>
                    )}
                    <div className="flex flex-col overflow-hidden text-left">
                      <span className="text-xs font-semibold text-white truncate">{currentUser.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Logged In
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="text-[#908fa0] hover:text-rose-400 p-1 transition-colors"
                    title="Sign Out"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs text-[#908fa0]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse"></span>
                    <span>Login Required</span>
                  </span>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Protected Page Lockout / Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col relative">
          {!currentUser && isProtectedPage ? (
            <div className="flex-1 flex items-center justify-center p-6 bg-[#0d0d15]/95 backdrop-blur-md">
              <div className="max-w-md w-full p-8 rounded-3xl bg-[#13131b] border border-[#34343d] text-center space-y-5 shadow-2xl">
                <div className="h-14 w-14 mx-auto rounded-2xl bg-[#6001d1]/20 border border-[#6001d1]/40 flex items-center justify-center text-[#c0c1ff]">
                  <span className="material-symbols-outlined text-3xl">lock</span>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white">Sign In Required</h2>
                  <p className="text-xs text-[#908fa0]">
                    You must be logged in to access technical interview questions, AI solvers, and platform features.
                  </p>
                </div>
                <button
                  onClick={() => openAuth('login')}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#6001d1] to-[#8083ff] text-white font-semibold rounded-xl text-sm shadow-lg shadow-purple-900/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">login</span>
                  <span>Sign In or Create Account</span>
                </button>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
          navigate('/dashboard');
        }}
      />
    </div>
  );
}
