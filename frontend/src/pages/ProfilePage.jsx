import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [updatingAvatar, setUpdatingAvatar] = useState(false);
  const [progress, setProgress] = useState({
    solved_count: 0,
    easy_solved: 0,
    medium_solved: 0,
    hard_solved: 0,
    solved_ids: []
  });
  const [downloadHistory, setDownloadHistory] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    const stored = localStorage.getItem('prepforge_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        fetchUserProgress(parsed.email);
        fetchDownloadHistory(parsed.email);
      } catch (e) {
        console.warn("Failed to parse user session", e);
      }
    }
  };

  const fetchUserProgress = async (userEmail) => {
    if (!userEmail) return;
    try {
      const res = await fetch(`/user/progress?email=${encodeURIComponent(userEmail)}`);
      if (res.ok) {
        const data = await res.json();
        setProgress(data);
      }
    } catch (err) {
      console.warn("Failed to fetch user progress:", err);
    }
  };

  const fetchDownloadHistory = async (userEmail) => {
    if (!userEmail) return;
    try {
      const res = await fetch(`/user/downloads?email=${encodeURIComponent(userEmail)}`);
      if (res.ok) {
        const data = await res.json();
        setDownloadHistory(data.downloads || []);
      }
    } catch (err) {
      console.warn("Failed to fetch download history:", err);
    }
  };

  const userName = user?.name || "Guest Developer";
  const userEmail = user?.email || "guest@prepforge.ai";
  
  // Calculate initials from name
  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0].toUpperCase())
    .join('') || 'U';

  const handleUpdateAvatar = async () => {
    const currentAvatar = user?.avatar || '';
    const newAvatar = window.prompt("Enter Google Profile Picture Image URL (or any profile image link):", currentAvatar);
    
    if (newAvatar === null) return;
    const cleanedAvatar = newAvatar.trim();

    setUpdatingAvatar(true);
    try {
      const res = await fetch('/auth/update-avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          avatar: cleanedAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=6001d1&color=fff&bold=true&size=128`
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to update avatar');

      localStorage.setItem('prepforge_user', JSON.stringify(data.user));
      setUser(data.user);
      
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      alert(err.message || 'Failed to update profile picture');
    } finally {
      setUpdatingAvatar(false);
    }
  };

  const easyPct = Math.round((progress.easy_solved / 30) * 100);
  const medPct = Math.round((progress.medium_solved / 40) * 100);
  const hardPct = Math.round((progress.hard_solved / 20) * 100);

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#191925] via-[#13131b] to-[#1f1f27] border border-[#34343d] flex flex-col sm:flex-row items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-[#6001d1]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Avatar */}
        <div className="relative group cursor-pointer" onClick={handleUpdateAvatar} title="Click to update Google Profile Picture">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#6001d1] via-[#8083ff] to-[#c0c1ff] p-1 shadow-xl relative overflow-hidden">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={userName} 
                className="w-full h-full rounded-[22px] object-cover group-hover:opacity-75 transition-opacity"
              />
            ) : (
              <div className="w-full h-full bg-[#13131b] rounded-[22px] flex items-center justify-center text-3xl font-extrabold text-[#c0c1ff] font-mono group-hover:opacity-75 transition-opacity">
                {initials}
              </div>
            )}
            
            {/* Edit overlay on hover */}
            <div className="absolute inset-0 bg-black/50 rounded-[22px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white text-xl">edit</span>
            </div>
          </div>
          
          <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#13131b] flex items-center justify-center text-[10px] text-white font-bold" title="Google Verified Account">
            ✓
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">{userName}</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#6001d1]/20 text-[#c0c1ff] border border-[#6001d1]/40 font-mono font-semibold">
              {user?.is_verified ? 'GOOGLE VERIFIED DEVELOPER' : 'PREPFORGE MEMBER'}
            </span>
          </div>

          <p className="text-xs text-[#908fa0] font-mono">{userEmail}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#c7c4d7] pt-2">
            <button
              onClick={handleUpdateAvatar}
              disabled={updatingAvatar}
              className="px-3 py-1 bg-[#1f1f27] hover:bg-[#34343d] border border-[#464554]/50 rounded-lg text-xs font-semibold text-[#c0c1ff] transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">photo_camera</span>
              <span>{updatingAvatar ? 'Updating...' : 'Change Profile Picture'}</span>
            </button>

            <span className="flex items-center gap-1 font-mono text-[#c0c1ff]">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              {progress.solved_count} Solved in Database
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to="/solver/1"
          className="px-5 py-2.5 bg-gradient-to-r from-[#6001d1] to-[#8083ff] text-white text-xs font-semibold rounded-xl shadow-lg shadow-purple-900/30 hover:opacity-95 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">play_arrow</span>
          <span>Resume Practice</span>
        </Link>
      </div>

      {/* Real-time Solved Preparation Progress Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Easy */}
        <div className="p-6 rounded-3xl bg-[#13131b] border border-[#34343d] space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-white">Easy Problems</span>
            <span className="font-mono text-emerald-400 font-bold">{progress.easy_solved} / 30</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#1b1b23] overflow-hidden">
            <div style={{ width: `${easyPct}%` }} className="h-full bg-emerald-400 rounded-full transition-all duration-500"></div>
          </div>
          <p className="text-[11px] text-[#908fa0]">{easyPct}% Mastery achieved</p>
        </div>

        {/* Medium */}
        <div className="p-6 rounded-3xl bg-[#13131b] border border-[#34343d] space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-white">Medium Problems</span>
            <span className="font-mono text-amber-400 font-bold">{progress.medium_solved} / 40</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#1b1b23] overflow-hidden">
            <div style={{ width: `${medPct}%` }} className="h-full bg-amber-400 rounded-full transition-all duration-500"></div>
          </div>
          <p className="text-[11px] text-[#908fa0]">{medPct}% Mastery achieved</p>
        </div>

        {/* Hard */}
        <div className="p-6 rounded-3xl bg-[#13131b] border border-[#34343d] space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-white">Hard Problems</span>
            <span className="font-mono text-rose-400 font-bold">{progress.hard_solved} / 20</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#1b1b23] overflow-hidden">
            <div style={{ width: `${hardPct}%` }} className="h-full bg-rose-400 rounded-full transition-all duration-500"></div>
          </div>
          <p className="text-[11px] text-[#908fa0]">{hardPct}% Mastery achieved</p>
        </div>

      </div>

      {/* Download History Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#13131b] border border-[#34343d] space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#6001d1]/20 border border-[#6001d1]/40 flex items-center justify-center text-[#c0c1ff]">
              <span className="material-symbols-outlined text-xl">download_for_offline</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Export & Download History</h2>
              <p className="text-xs text-[#908fa0]">History of JSON question packages exported to your system</p>
            </div>
          </div>

          <Link
            to="/questions"
            className="px-4 py-2 bg-[#1f1f27] hover:bg-[#34343d] border border-[#464554]/40 text-xs font-semibold text-[#c0c1ff] rounded-xl transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Export New Package</span>
          </Link>
        </div>

        {downloadHistory.length === 0 ? (
          <div className="p-8 text-center text-[#908fa0] bg-[#1b1b23] border border-[#34343d]/60 rounded-2xl space-y-2">
            <span className="material-symbols-outlined text-3xl text-[#464554]">history</span>
            <p className="text-xs font-medium text-white">No download history recorded yet</p>
            <p className="text-[11px]">Select questions from Explore Questions page and click 'Export Selected JSON' to record history.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#34343d]/60 bg-[#1b1b23] border border-[#34343d]/60 rounded-2xl overflow-hidden">
            {downloadHistory.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-[#252530]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#c0c1ff] text-xl">description</span>
                  <div>
                    <p className="text-xs font-bold text-white font-mono">{item.file_name}</p>
                    <div className="flex items-center gap-3 text-[10px] text-[#908fa0] font-mono mt-0.5">
                      <span>{item.questions_count} Questions Included</span>
                      <span>•</span>
                      <span>{item.created_at ? new Date(item.created_at).toLocaleString() : 'Recent'}</span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold flex items-center gap-1">
                  <span>✓</span> Recorded
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
