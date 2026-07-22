import React from 'react';
import TopNavBar from '@/components/layout/top-nav-bar';
import Footer from '@/components/layout/footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
