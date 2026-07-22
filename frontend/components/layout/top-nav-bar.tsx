"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Menu, X, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TopNavBar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Companies', href: '/companies' },
    { name: 'Categories', href: '/categories' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-background/80 backdrop-blur-xl font-body-md text-body-md docked full-width top-0 sticky z-50 border-b border-outline-variant/10 shadow-sm">
      <nav className="flex justify-between items-center w-full px-lg py-md max-w-container-max mx-auto">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-md">
          <img 
            alt="PrepForge AI Logo" 
            className="w-10 h-10 rounded-md" 
            src="/images/logo.png" 
          />
          <span className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-on-surface tracking-tight">
            PrepForge AI
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-xl">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`font-medium transition-colors duration-200 ${
                  active 
                    ? 'text-primary font-bold border-b-2 border-primary pb-1' 
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Auth Actions / Profile */}
        <div className="hidden lg:flex items-center gap-md">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-md">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors text-body-sm font-medium px-md py-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Workspace
              </Link>
              <div className="flex items-center gap-sm">
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full border border-primary/30 object-cover"
                />
                <span className="text-body-sm text-on-surface font-medium">{user.name}</span>
              </div>
              <Button 
                variant="ghost" 
                onClick={logout}
                className="text-on-surface-variant hover:text-error transition-colors p-sm"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <Link href="/auth?mode=login">
                <button className="text-on-surface-variant font-medium hover:text-on-surface transition-colors px-md py-sm flex items-center gap-xs">
                  <LogIn className="w-4 h-4" />
                  Log In
                </button>
              </Link>
              <Link href="/auth?mode=signup">
                <button className="bg-primary-container text-on-primary-container font-bold px-lg py-sm rounded-lg active:opacity-80 active:scale-95 transition-all shadow-lg hover:shadow-primary/40 flex items-center gap-xs">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-sm text-on-surface-variant hover:text-on-surface transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container/95 border-b border-outline-variant/20 p-lg flex flex-col gap-md">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-sm text-lg font-medium ${
                  active ? 'text-primary font-bold border-l-4 border-primary pl-md' : 'text-on-surface-variant pl-md'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="border-t border-outline-variant/10 pt-md mt-sm flex flex-col gap-md px-md">
            {isAuthenticated && user ? (
              <div className="flex flex-col gap-sm">
                <div className="flex items-center gap-md">
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full border border-primary/30 object-cover"
                  />
                  <div>
                    <p className="text-on-surface font-bold leading-tight">{user.name}</p>
                    <p className="text-on-surface-variant text-xs">{user.title}</p>
                  </div>
                </div>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary-container text-on-primary-container">
                    Workspace Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-error hover:bg-error/10">
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-sm">
                <Link href="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-on-surface-variant">Log In</Button>
                </Link>
                <Link href="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary-container text-on-primary-container">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
