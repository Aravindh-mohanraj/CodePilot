"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import SideNavBar from '@/components/layout/side-nav-bar';
import GlobalSearchHeader from '@/components/layout/global-search-header';
import MobileBottomNav from '@/components/layout/mobile-bottom-nav';
import Footer from '@/components/layout/footer';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isQuestionIDE = pathname.includes('/questions/');

  if (isQuestionIDE) {
    return <div className="min-h-screen bg-background text-foreground flex flex-col">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Desktop Sidebar Navigation */}
      <SideNavBar className="fixed left-0 top-0 h-full w-64 hidden md:flex z-40" />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col md:pl-64 min-h-screen pb-16 md:pb-0 relative">
        <GlobalSearchHeader />
        
        {/* Child Pages Content */}
        <main className="flex-grow w-full max-w-container-max mx-auto">
          {children}
        </main>
        
        {/* App Footer */}
        <Footer className="mt-auto" />
      </div>

      {/* Mobile Navigation Shell */}
      <MobileBottomNav />
    </div>
  );
}
