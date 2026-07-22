import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
];

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'settings' | 'security'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  // Form State
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [preferredLang, setPreferredLang] = useState('python');
  const [themeMode, setThemeMode] = useState('dark');
  const [autoRunCode, setAutoRunCode] = useState(true);

  // Password State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

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
        setEditName(parsed.name || '');
        setEditAvatar(parsed.avatar || '');
        setPreferredLang(parsed.preferred_language || 'python');
        if (parsed.settings) {
          setThemeMode(parsed.settings.theme || 'dark');
          setAutoRunCode(parsed.settings.auto_run !== false);
        }
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
      const res = await fetch(`/api/user/progress?email=${encodeURIComponent(userEmail)}`);
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
      const res = await fetch(`/api/user/downloads?email=${encodeURIComponent(userEmail)}`);
      if (res.ok) {
        const data = await res.json();
        setDownloadHistory(data.downloads || []);
      }
    } catch (err) {
      console.warn("Failed to fetch download history:", err);
    }
  };

  const userName = user?.name || "Guest Developer";
  const userEmail = user?.email || "guest@code-pilot.com";
  
  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0].toUpperCase())
    .join('') || 'U';

  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    setSavingProfile(true);
    setMsg({ text: '', type: '' });

    try {
      const res = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          name: editName,
          avatar: editAvatar,
          preferred_language: preferredLang,
          settings: {
            theme: themeMode,
            auto_run: autoRunCode
          }
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to update profile');

      localStorage.setItem('prepforge_user', JSON.stringify(data.user));
      setUser(data.user);
      setMsg({ text: 'Profile & Settings updated successfully!', type: 'success' });
      setIsEditModalOpen(false);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      setMsg({ text: err.message || 'Failed to update profile', type: 'error' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      setMsg({ text: 'New password must be at least 4 characters long', type: 'error' });
      return;
    }

    setChangingPassword(true);
    setMsg({ text: '', type: '' });

    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          old_password: oldPassword,
          new_password: newPassword
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to update password');

      setMsg({ text: 'Password changed successfully!', type: 'success' });
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setMsg({ text: err.message || 'Failed to change password', type: 'error' });
    } finally {
      setChangingPassword(false);
    }
  };

  const easyPct = Math.round((progress.easy_solved / 30) * 100);
  const medPct = Math.round((progress.medium_solved / 40) * 100);
  const hardPct = Math.round((progress.hard_solved / 20) * 100);

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Profile Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#191925] via-[#13131b] to-[#1f1f27] border border-[#34343d] flex flex-col sm:flex-row items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-[#6001d1]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Avatar */}
        <div className="relative group cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
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
            
            <div className="absolute inset-0 bg-black/50 rounded-[22px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white text-xl">edit</span>
            </div>
          </div>
          
          <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#13131b] flex items-center justify-center text-[10px] text-white font-bold" title="Verified Account">
            ✓
          </span>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">{userName}</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#6001d1]/20 text-[#c0c1ff] border border-[#6001d1]/40 font-mono font-semibold">
              PREPFORGE DEVELOPER
            </span>
          </div>

          <p className="text-xs text-[#908fa0] font-mono">{userEmail}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#c7c4d7] pt-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#1f1f27] hover:bg-[#34343d] border border-[#464554]/50 rounded-xl text-xs font-semibold text-[#c0c1ff] transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              <span>Edit Profile &amp; Settings</span>
            </button>

            <span className="flex items-center gap-1 font-mono text-[#c0c1ff]">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              {progress.solved_count} Problems Solved
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

      {/* Alert Messages */}
      {msg.text && (
        <div className={`p-4 rounded-2xl border text-xs font-medium flex items-center gap-2 ${
          msg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          <span className="material-symbols-outlined text-base">{msg.type === 'success' ? 'check_circle' : 'error'}</span>
          <span>{msg.text}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#34343d] gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'overview' ? 'border-[#6001d1] text-[#c0c1ff]' : 'border-transparent text-[#908fa0] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-base">analytics</span>
          <span>Progress Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'settings' ? 'border-[#6001d1] text-[#c0c1ff]' : 'border-transparent text-[#908fa0] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-base">settings</span>
          <span>Preferences &amp; Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'security' ? 'border-[#6001d1] text-[#c0c1ff]' : 'border-transparent text-[#908fa0] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-base">lock</span>
          <span>Account Security</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Solved Progress Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Export & Download History */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#13131b] border border-[#34343d] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#6001d1]/20 border border-[#6001d1]/40 flex items-center justify-center text-[#c0c1ff]">
                  <span className="material-symbols-outlined text-xl">download_for_offline</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Export &amp; Download History</h2>
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
      )}

      {/* TAB 2: PREFERENCES & SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-3xl bg-[#13131b] border border-[#34343d] space-y-6 shadow-xl">
          <h2 className="text-lg font-bold text-white border-b border-[#34343d] pb-3">Developer Preferences</h2>

          {/* Preferred Programming Language */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#c7c4d7]">Default Code Execution Language</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'python', name: 'Python 3', icon: 'code' },
                { id: 'java', name: 'Java 17', icon: 'coffee' },
                { id: 'cpp', name: 'C++ 20', icon: 'terminal' },
                { id: 'javascript', name: 'JavaScript', icon: 'javascript' }
              ].map(lang => (
                <button
                  type="button"
                  key={lang.id}
                  onClick={() => setPreferredLang(lang.id)}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    preferredLang === lang.id
                      ? 'bg-[#6001d1]/20 border-[#6001d1] text-[#c0c1ff] shadow-lg shadow-purple-950/30'
                      : 'bg-[#1b1b23] border-[#34343d] text-[#908fa0] hover:text-white hover:bg-[#1f1f27]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{lang.icon}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor Theme */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#c7c4d7]">Code Editor Theme</label>
            <select
              value={themeMode}
              onChange={e => setThemeMode(e.target.value)}
              className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl px-4 py-2.5 text-sm text-[#e4e1ed] focus:outline-none focus:border-[#6001d1]"
            >
              <option value="dark">Midnight Dark (Default)</option>
              <option value="synthwave">Synthwave Purple</option>
              <option value="high-contrast">High Contrast</option>
            </select>
          </div>

          {/* Auto Run Code Toggle */}
          <div className="flex items-center justify-between p-4 bg-[#1b1b23] border border-[#34343d] rounded-2xl">
            <div>
              <p className="text-sm font-semibold text-white">Auto-Run Test Cases</p>
              <p className="text-xs text-[#908fa0]">Automatically execute code against test cases after submitting</p>
            </div>
            <input
              type="checkbox"
              checked={autoRunCode}
              onChange={e => setAutoRunCode(e.target.checked)}
              className="w-5 h-5 rounded bg-[#13131b] border-[#464554] text-[#6001d1] focus:ring-0 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={savingProfile}
            className="px-6 py-2.5 bg-gradient-to-r from-[#6001d1] to-[#8083ff] text-white text-xs font-bold rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            <span>{savingProfile ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </form>
      )}

      {/* TAB 3: ACCOUNT SECURITY */}
      {activeTab === 'security' && (
        <form onSubmit={handleChangePassword} className="p-6 sm:p-8 rounded-3xl bg-[#13131b] border border-[#34343d] space-y-6 shadow-xl max-w-xl">
          <h2 className="text-lg font-bold text-white border-b border-[#34343d] pb-3">Update Password &amp; Credentials</h2>

          <div>
            <label className="block text-xs font-semibold text-[#c7c4d7] mb-1">Current Password (optional for Google accounts)</label>
            <input
              type="password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl px-4 py-2.5 text-sm text-[#e4e1ed] focus:outline-none focus:border-[#6001d1]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#c7c4d7] mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl px-4 py-2.5 text-sm text-[#e4e1ed] focus:outline-none focus:border-[#6001d1]"
            />
          </div>

          <button
            type="submit"
            disabled={changingPassword}
            className="px-6 py-2.5 bg-gradient-to-r from-[#6001d1] to-[#8083ff] text-white text-xs font-bold rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">lock_reset</span>
            <span>{changingPassword ? 'Updating...' : 'Change Password'}</span>
          </button>
        </form>
      )}

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#13131b] border border-[#34343d] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#34343d] pb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-[#c0c1ff]">manage_accounts</span>
                <h3 className="text-lg font-bold text-white">Edit Profile Details</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-[#908fa0] hover:text-white p-1 rounded-lg hover:bg-[#1f1f27]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Display Name */}
              <div>
                <label className="block text-xs font-semibold text-[#c7c4d7] mb-1.5">Display Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl px-4 py-2.5 text-sm text-[#e4e1ed] focus:outline-none focus:border-[#6001d1]"
                />
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-xs font-semibold text-[#c7c4d7] mb-1.5">Profile Picture Image URL</label>
                <input
                  type="url"
                  value={editAvatar}
                  onChange={e => setEditAvatar(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#1b1b23] border border-[#34343d] rounded-xl px-4 py-2.5 text-sm text-[#e4e1ed] focus:outline-none focus:border-[#6001d1]"
                />
              </div>

              {/* Preset Avatars */}
              <div>
                <label className="block text-xs font-semibold text-[#c7c4d7] mb-2">Or Choose Preset Avatar</label>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {PRESET_AVATARS.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Preset"
                      onClick={() => setEditAvatar(url)}
                      className={`w-12 h-12 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                        editAvatar === url ? 'border-[#6001d1] scale-105' : 'border-transparent hover:border-[#464554]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#34343d]">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-[#1f1f27] hover:bg-[#34343d] rounded-xl text-xs font-semibold text-[#908fa0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-5 py-2 bg-gradient-to-r from-[#6001d1] to-[#8083ff] text-white text-xs font-bold rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <span>{savingProfile ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
