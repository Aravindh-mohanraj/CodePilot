"use client";

import React, { useState, MouseEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader2, ShieldAlert } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const mode = searchParams.get('mode');

  const { login, signup } = useAuth();

  const [isLogin, setIsLogin] = useState(mode !== 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [experience, setExperience] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Field validation errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Mouse move glow effect
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setError(null);
    setFieldErrors({});
    setPassword('');
    setConfirmPassword('');
  };

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const errors: Record<string, string> = {};

    if (!email) {
      errors.email = "Email address is required";
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      const success = await login(email);
      if (success) {
        router.push(redirect);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const errors: Record<string, string> = {};

    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";

    if (!email) {
      errors.email = "Email address is required";
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!targetCompany) errors.targetCompany = "Please select a target company";
    if (!experience) errors.experience = "Please select your experience level";

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      errors.agreeTerms = "You must agree to the Terms & Conditions";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      const success = await signup(firstName, lastName, email);
      if (success) {
        router.push(redirect);
      } else {
        setError("A user with this email already exists");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialMockClick = () => {
    setError("Social Authentication is simulated. Please use the email login form to sign in.");
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="glass-panel w-full max-w-[480px] p-xl rounded-xl space-y-xl relative overflow-hidden group"
      style={{
        background: 'rgba(24, 24, 27, 0.7)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(39, 39, 42, 0.8)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
      }}
    >
      {/* Light gradient highlight overlay */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(192, 193, 255, 0.08), transparent 80%)`
        }}
      />

      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-xl"
          >
            {/* Login Header */}
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Welcome back</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant opacity-70 mt-xs">
                Enter your credentials to access your practice forge.
              </p>
            </div>

            {/* Error alerts */}
            {error && (
              <div className="flex items-start gap-md bg-error-container/20 text-error border border-error/30 p-md rounded-xl">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="font-body-sm text-body-sm leading-snug">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-lg">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className={`bg-surface-container-lowest border rounded-xl px-md py-sm text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-on-surface-variant/40 ${
                    fieldErrors.email ? 'border-error/50' : 'border-outline-variant/30'
                  }`}
                />
                {fieldErrors.email && (
                  <span className="text-xs text-error font-body-sm mt-0.5">{fieldErrors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-xs">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); setError("Password recovery is simulated. Please use any dummy password to log in."); }} className="text-primary font-body-sm text-body-sm hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className={`w-full bg-surface-container-lowest border rounded-xl px-md py-sm pr-12 text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-on-surface-variant/40 ${
                      fieldErrors.password ? 'border-error/50' : 'border-outline-variant/30'
                    }`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-md flex items-center text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <span className="text-xs text-error font-body-sm mt-0.5">{fieldErrors.password}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    className="border-outline-variant/50 data-[state=checked]:bg-primary data-[state=checked]:text-on-primary-container"
                  />
                  <label htmlFor="remember" className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
                    Remember for 30 days
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-on-primary-container font-bold py-md rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Forging workspace...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Social Logins */}
            <div className="space-y-md">
              <div className="flex items-center gap-md my-xl">
                <div className="flex-1 h-[1px] bg-outline-variant/20"></div>
                <span className="font-label-md text-label-md text-on-surface-variant/40 uppercase tracking-widest">
                  Or Email
                </span>
                <div className="flex-1 h-[1px] bg-outline-variant/20"></div>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <button 
                  type="button" 
                  onClick={handleSocialMockClick}
                  className="flex items-center justify-center gap-sm bg-surface-container-low border border-outline-variant/30 rounded-xl py-md font-label-md text-label-md hover:bg-surface-container-high transition-colors text-on-surface"
                >
                  <svg className="w-4 h-4 mr-1 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button 
                  type="button" 
                  onClick={handleSocialMockClick}
                  className="flex items-center justify-center gap-sm bg-surface-container-low border border-outline-variant/30 rounded-xl py-md font-label-md text-label-md hover:bg-surface-container-high transition-colors text-on-surface"
                >
                  <svg className="w-4 h-4 mr-1 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </button>
              </div>
            </div>

            {/* Link to Toggle */}
            <div className="text-center pt-md border-t border-outline-variant/10 text-body-sm font-body-sm text-on-surface-variant">
              <span>Don't have an account? </span>
              <button onClick={toggleAuth} className="text-primary hover:underline font-semibold">
                Sign up for free
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-xl"
          >
            {/* Signup Header */}
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Create your forge</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant opacity-70 mt-xs">
                Start your path to architectural mastery.
              </p>
            </div>

            {/* Error alerts */}
            {error && (
              <div className="flex items-start gap-md bg-error-container/20 text-error border border-error/30 p-md rounded-xl">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="font-body-sm text-body-sm leading-snug">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignupSubmit} className="space-y-md">
              <div className="grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex" 
                    className={`bg-surface-container-lowest border rounded-xl px-md py-sm text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-on-surface-variant/40 ${
                      fieldErrors.firstName ? 'border-error/50' : 'border-outline-variant/30'
                    }`}
                  />
                  {fieldErrors.firstName && (
                    <span className="text-xs text-error font-body-sm mt-0.5">{fieldErrors.firstName}</span>
                  )}
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Rivera" 
                    className={`bg-surface-container-lowest border rounded-xl px-md py-sm text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-on-surface-variant/40 ${
                      fieldErrors.lastName ? 'border-error/50' : 'border-outline-variant/30'
                    }`}
                  />
                  {fieldErrors.lastName && (
                    <span className="text-xs text-error font-body-sm mt-0.5">{fieldErrors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@rivera.dev" 
                  className={`bg-surface-container-lowest border rounded-xl px-md py-sm text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-on-surface-variant/40 ${
                    fieldErrors.email ? 'border-error/50' : 'border-outline-variant/30'
                  }`}
                />
                {fieldErrors.email && (
                  <span className="text-xs text-error font-body-sm mt-0.5">{fieldErrors.email}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Target Company
                  </label>
                  <select 
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className={`bg-surface-container-lowest border rounded-xl px-md py-sm text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none ${
                      fieldErrors.targetCompany ? 'border-error/50' : 'border-outline-variant/30'
                    } text-on-surface`}
                  >
                    <option value="" disabled className="text-on-surface-variant/40">Target</option>
                    <option value="Google">Google</option>
                    <option value="Meta">Meta</option>
                    <option value="OpenAI">OpenAI</option>
                    <option value="NVIDIA">NVIDIA</option>
                    <option value="Other">Other / general</option>
                  </select>
                  {fieldErrors.targetCompany && (
                    <span className="text-xs text-error font-body-sm mt-0.5">{fieldErrors.targetCompany}</span>
                  )}
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Experience
                  </label>
                  <select 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className={`bg-surface-container-lowest border rounded-xl px-md py-sm text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none ${
                      fieldErrors.experience ? 'border-error/50' : 'border-outline-variant/30'
                    } text-on-surface`}
                  >
                    <option value="" disabled className="text-on-surface-variant/40">Experience</option>
                    <option value="Entry">Entry Level</option>
                    <option value="Mid">Mid-Level</option>
                    <option value="Senior">Senior / Staff</option>
                    <option value="Lead">Tech Lead+</option>
                  </select>
                  {fieldErrors.experience && (
                    <span className="text-xs text-error font-body-sm mt-0.5">{fieldErrors.experience}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Password
                  </label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className={`bg-surface-container-lowest border rounded-xl px-md py-sm text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-on-surface-variant/40 ${
                      fieldErrors.password ? 'border-error/50' : 'border-outline-variant/30'
                    }`}
                  />
                  {fieldErrors.password && (
                    <span className="text-xs text-error font-body-sm mt-0.5">{fieldErrors.password}</span>
                  )}
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Confirm
                  </label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••" 
                    className={`bg-surface-container-lowest border rounded-xl px-md py-sm text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-on-surface-variant/40 ${
                      fieldErrors.confirmPassword ? 'border-error/50' : 'border-outline-variant/30'
                    }`}
                  />
                  {fieldErrors.confirmPassword && (
                    <span className="text-xs text-error font-body-sm mt-0.5">{fieldErrors.confirmPassword}</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-sm pt-sm">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                  className="mt-1 border-outline-variant/50 data-[state=checked]:bg-primary data-[state=checked]:text-on-primary-container"
                />
                <label htmlFor="terms" className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none leading-snug">
                  I agree to the Terms of Service and Privacy Policy, including AI model processing consent.
                </label>
              </div>
              {fieldErrors.agreeTerms && (
                <span className="text-xs text-error font-body-sm block -mt-1">{fieldErrors.agreeTerms}</span>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-on-primary-container font-bold py-md rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-md mt-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sparking forge...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Link to Toggle */}
            <div className="text-center pt-md border-t border-outline-variant/10 text-body-sm font-body-sm text-on-surface-variant">
              <span>Already have an account? </span>
              <button onClick={toggleAuth} className="text-primary hover:underline font-semibold">
                Sign in
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
