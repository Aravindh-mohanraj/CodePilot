"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { useRouter, useSearchParams } from 'next/navigation';
import SideNavBar from './side-nav-bar';

export default function GlobalSearchHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const query = searchParams.get('q') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    router.push(`/explore?${params.toString()}`);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-20 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 flex items-center justify-between px-md md:px-3xl w-full">
      {/* Mobile Menu Trigger & Sheet */}
      <div className="flex items-center gap-md md:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger render={<button className="p-sm text-on-surface-variant hover:text-on-surface transition-colors" />}>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-surface-container border-r border-outline-variant/30">
            <SideNavBar onLinkClick={() => setMobileMenuOpen(false)} className="border-r-0 w-full" />
          </SheetContent>
        </Sheet>
        <span className="font-bold text-primary tracking-tighter md:hidden">PrepForge</span>
      </div>

      {/* Global Search Box */}
      <div className="relative flex-1 max-w-2xl group mx-sm md:mx-0">
        <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input 
          ref={searchInputRef}
          type="text" 
          value={query}
          onChange={handleSearchChange}
          placeholder="Search questions, companies, or concepts..." 
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 pl-12 pr-20 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
        />
        <div className="absolute inset-y-0 right-0 pr-md flex items-center pointer-events-none">
          <kbd className="hidden md:inline-flex items-center gap-1 bg-surface-container-highest border border-outline-variant/40 rounded px-2 py-0.5 text-xs font-mono text-on-surface-variant">
            <span>⌘</span>K
          </kbd>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-md md:gap-lg ml-md md:ml-auto">
        <button className="p-2 text-on-surface-variant hover:text-on-surface relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full"></span>
        </button>
        {user ? (
          <Link href="/profile" className="h-10 w-10 rounded-full border border-primary/30 p-0.5 block hover:opacity-85 transition-opacity">
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="h-full w-full rounded-full object-cover"
            />
          </Link>
        ) : (
          <Link href="/auth" className="h-10 w-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-sm">
            AI
          </Link>
        )}
      </div>
    </header>
  );
}
