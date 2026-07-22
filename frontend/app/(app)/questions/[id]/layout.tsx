"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bolt } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function IDELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const pathname = usePathname();

  const userInitials = user 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() 
    : 'JD';

  return (
    <div className="flex flex-col min-h-screen bg-[#13131b]">
      {/* Minimal Header Nav */}
      <nav className="bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm sticky top-0 z-50 w-full flex justify-between items-center px-lg py-md h-[72px]">
        <div className="flex items-center gap-xl">
          <Link href="/" className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-on-surface tracking-tight">
            PrepForge AI
          </Link>
          <div className="hidden md:flex gap-lg items-center">
            <Link 
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" 
              href="/"
            >
              Home
            </Link>
            <Link 
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" 
              href="/explore"
            >
              Explore
            </Link>
            <Link 
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200" 
              href="/companies"
            >
              Companies
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-sm bg-surface-container px-md py-xs rounded-full border border-outline-variant/30">
            <Bolt className="w-4 h-4 text-primary fill-current" />
            <span className="font-label-md text-label-md text-primary font-bold">Pro Active</span>
          </div>
          {user?.avatarUrl ? (
            <Link href="/profile" className="h-10 w-10 rounded-full border border-primary/30 p-0.5 block hover:opacity-85 transition-opacity">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="h-full w-full rounded-full object-cover"
              />
            </Link>
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">
              {userInitials}
            </div>
          )}
        </div>
      </nav>

      {/* Main IDE Workspace */}
      <main className="flex-grow flex flex-col h-[calc(100vh-72px)] overflow-hidden">
        {children}
      </main>
    </div>
  );
}
