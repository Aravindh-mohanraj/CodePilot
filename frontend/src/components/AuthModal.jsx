import React, { useState, useEffect } from 'react';

const GOOGLE_CLIENT_ID = "476202653996-udj06gl48d36d0fbkc5i3dojl2hf5c9o.apps.googleusercontent.com";

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Initialize Google One Tap when modal opens
  useEffect(() => {
    if (!isOpen) return;
    const tryInitGoogleId = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredential,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      }
    };
    if (window.google) {
      tryInitGoogleId();
    } else {
      const interval = setInterval(() => {
        if (window.google) { tryInitGoogleId(); clearInterval(interval); }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Called by Google One Tap with an id_token credential
  const handleGoogleCredential = async (credentialResponse) => {
    setErrorMsg('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: credentialResponse.credential })
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
  };

  const handleGoogleSignIn = () => {
    setErrorMsg('');
    setSubmitting(true);

    // Strategy 1: GIS OAuth2 Token Client (most reliable on production)
    if (window.google && window.google.accounts && window.google.accounts.oauth2) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'openid email profile',
          callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                const res = await fetch('/api/auth/google', {
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
                setSubmitting(false);
              }
            } else {
              // Token client closed without response — try One Tap prompt
              tryOneTap();
            }
          },
          error_callback: (err) => {
            console.warn('GIS token error:', err);
            tryOneTap();
          }
        });
        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (e) {
        console.warn('GIS token client init failed:', e);
      }
    }

    // Strategy 2: Google One Tap prompt
    tryOneTap();
  };

  const tryOneTap = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredential,
        });
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            handleDemoLogin();
          }
        });
        return;
      } catch (e) {
        console.warn('One Tap failed:', e);
      }
    }
    handleDemoLogin();
  };

  const handleDemoLogin = async () => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Guest Developer', email: 'guest.developer@code-pilot.com' })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('prepforge_user', JSON.stringify(data.user));
        localStorage.setItem('prepforge_token', data.token);
        if (onSuccess) onSuccess(data.user);
        onClose();
        return;
      }
    } catch (e) {}
    setErrorMsg('Google OAuth initialization error. Please verify Google Console settings or use Email Sign In below.');
    setSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
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

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={submitting}
          className="w-full mb-3 py-3 px-4 bg-[#1f1f27] hover:bg-[#2a2a35] border border-[#464554]/60 rounded-xl text-sm font-semibold text-[#e4e1ed] transition-all flex items-center justify-center gap-3 shadow-md active:scale-[0.98] disabled:opacity-50"
        >
          {submitting ? (
            <div className="w-5 h-5 border-2 border-[#6001d1] border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
            </svg>
          )}
          <span>Continue with Google</span>
        </button>

        {/* 1-Click Guest Access Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={submitting}
          className="w-full mb-5 py-3 px-4 bg-gradient-to-r from-[#6001d1]/30 to-[#8083ff]/30 hover:from-[#6001d1]/50 hover:to-[#8083ff]/50 border border-[#6001d1]/60 rounded-xl text-sm font-bold text-[#c0c1ff] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-base">rocket_launch</span>
          <span>Instant Guest Access (No Sign-Up)</span>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-px bg-[#464554]/40 flex-1"></div>
          <span className="text-[10px] text-[#908fa0] uppercase tracking-wider font-mono">or email credentials</span>
          <div className="h-px bg-[#464554]/40 flex-1"></div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
            <span className="material-symbols-outlined text-base mt-0.5 shrink-0">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Email/Password Form */}
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
              placeholder="you@example.com"
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
