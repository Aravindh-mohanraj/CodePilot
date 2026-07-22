import React, { useState } from 'react';

const GOOGLE_CLIENT_ID = "476202653996-hqj4srs8bvd0v4vpv6jmtnqj5rcujr85.apps.googleusercontent.com";

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignInPopup = () => {
    setErrorMsg('');
    setSubmitting(true);

    // 1. Try Google Identity Services (GIS) Token Client Popup
    if (window.google && window.google.accounts && window.google.accounts.oauth2) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
          callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                const res = await fetch('/auth/google', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ access_token: tokenResponse.access_token })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.detail || 'Google sign-in failed');
                localStorage.setItem('prepforge_user', JSON.stringify(data.user));
                localStorage.setItem('prepforge_token', data.token);
                if (onSuccess) onSuccess(data.user);
                onClose();
              } catch (err) {
                setErrorMsg(err.message || 'Google verification failed');
              } finally {
                setSubmitting(false);
              }
            } else {
              setSubmitting(false);
            }
          },
          error_callback: (err) => {
            console.warn("GIS token error:", err);
            openGoogleOAuthUrlPopup();
          }
        });
        client.requestAccessToken();
        return;
      } catch (e) {
        console.warn("GIS token client failed, fallback to OAuth URL popup", e);
      }
    }

    openGoogleOAuthUrlPopup();
  };

  const openGoogleOAuthUrlPopup = () => {
    const redirectUri = window.location.origin;
    const scope = encodeURIComponent('email profile');
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${scope}`;
    
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const popup = window.open(authUrl, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`);
    
    if (!popup) {
      setErrorMsg("Popup blocked! Please allow popups for Google authentication.");
      setSubmitting(false);
      return;
    }

    const timer = setInterval(async () => {
      try {
        if (popup.closed) {
          clearInterval(timer);
          setSubmitting(false);
          return;
        }
        
        if (popup.location.href.includes('access_token=')) {
          const hash = popup.location.hash || popup.location.href.split('#')[1] || '';
          const params = new URLSearchParams(hash);
          const accessToken = params.get('access_token');
          
          popup.close();
          clearInterval(timer);

          if (accessToken) {
            const res = await fetch('/auth/google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ access_token: accessToken })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || 'Google sign-in failed');

            localStorage.setItem('prepforge_user', JSON.stringify(data.user));
            localStorage.setItem('prepforge_token', data.token);

            if (onSuccess) onSuccess(data.user);
            onClose();
          }
        }
      } catch (e) {
        // Cross-origin polling until redirect
      }
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const endpoint = mode === 'signup' ? '/auth/signup' : '/auth/login';
      const payload = mode === 'signup' ? { name, email, password } : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Authentication failed');

      localStorage.setItem('prepforge_user', JSON.stringify(data.user));
      localStorage.setItem('prepforge_token', data.token);

      if (onSuccess) onSuccess(data.user);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#13131b] border border-[#464554]/50 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-purple-900/20">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-[#908fa0] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#1f1f27]"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#6001d1] to-[#c0c1ff] flex items-center justify-center text-white shadow-lg shadow-purple-600/30 font-bold text-xl font-mono">
            P
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#e4e1ed]">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-xs text-[#908fa0]">
              {mode === 'login' ? 'Access your AI interview prep platform' : 'Join thousands mastering tech interviews'}
            </p>
          </div>
        </div>

        {/* Single Clean Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignInPopup}
          disabled={submitting}
          className="w-full mb-5 py-3 px-4 bg-[#1f1f27] hover:bg-[#2a2a35] border border-[#464554]/60 rounded-xl text-xs font-semibold text-[#e4e1ed] transition-all flex items-center justify-center gap-3 shadow-md active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
          </svg>
          <span className="text-sm">Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-px bg-[#464554]/40 flex-1"></div>
          <span className="text-[10px] text-[#908fa0] uppercase tracking-wider font-mono">or email</span>
          <div className="h-px bg-[#464554]/40 flex-1"></div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-[#c7c4d7] mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aravindh Mohanraj"
                className="w-full bg-[#1b1b23] border border-[#464554]/60 rounded-xl px-4 py-2.5 text-sm text-[#e4e1ed] placeholder-[#908fa0] focus:outline-none focus:border-[#c0c1ff] transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#c7c4d7] mb-1.5">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aravindhmohanraj99@gmail.com"
              className="w-full bg-[#1b1b23] border border-[#464554]/60 rounded-xl px-4 py-2.5 text-sm text-[#e4e1ed] placeholder-[#908fa0] focus:outline-none focus:border-[#c0c1ff] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#c7c4d7] mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1b1b23] border border-[#464554]/60 rounded-xl px-4 py-2.5 text-sm text-[#e4e1ed] placeholder-[#908fa0] focus:outline-none focus:border-[#c0c1ff] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#6001d1] to-[#8083ff] hover:from-[#7002f1] hover:to-[#9093ff] text-white font-semibold rounded-xl text-sm shadow-lg shadow-purple-900/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{submitting ? 'Authenticating...' : (mode === 'login' ? 'Sign In to PrepForge' : 'Create Free Account')}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 pt-4 border-t border-[#464554]/30 text-center text-xs text-[#908fa0]">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button onClick={() => { setMode('signup'); setErrorMsg(''); }} className="text-[#c0c1ff] font-semibold hover:underline">
                Sign Up Free
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button onClick={() => { setMode('login'); setErrorMsg(''); }} className="text-[#c0c1ff] font-semibold hover:underline">
                Log In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
