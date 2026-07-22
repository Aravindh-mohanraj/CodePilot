import React from 'react';
import Link from 'next/link';

interface FooterProps {
  className?: string;
  showDetails?: boolean;
}

export default function Footer({ className = "", showDetails = true }: FooterProps) {
  return (
    <footer className={`bg-surface-container-lowest border-t border-outline-variant/10 w-full ${className}`}>
      <div className="max-w-container-max mx-auto px-lg py-3xl grid grid-cols-2 md:grid-cols-4 gap-xl">
        {showDetails && (
          <div className="col-span-2 md:col-span-1 space-y-md">
            <div className="flex items-center gap-md mb-sm">
              <img 
                alt="PrepForge AI Logo" 
                className="w-8 h-8 rounded-md" 
                src="/images/logo.png" 
              />
              <span className="font-title-lg text-title-lg font-bold text-on-surface">PrepForge AI</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Empowering developers to conquer the hardest technical interviews with state-of-the-art AI assistance.
            </p>
          </div>
        )}
        <div className="flex flex-col gap-sm">
          <h5 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-xs">Platform</h5>
          <Link href="/explore" className="text-on-surface-variant font-body-sm hover:text-on-surface transition-colors">Explore</Link>
          <Link href="/companies" className="text-on-surface-variant font-body-sm hover:text-on-surface transition-colors">Companies</Link>
          <Link href="/dashboard" className="text-on-surface-variant font-body-sm hover:text-on-surface transition-colors">Dashboard</Link>
        </div>
        <div className="flex flex-col gap-sm">
          <h5 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-xs">Legal</h5>
          <Link href="#" className="text-on-surface-variant font-body-sm hover:text-on-surface transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-on-surface-variant font-body-sm hover:text-on-surface transition-colors">Terms of Service</Link>
        </div>
        <div className="flex flex-col gap-sm">
          <h5 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-xs">Connect</h5>
          <Link href="#" className="text-on-surface-variant font-body-sm hover:text-on-surface transition-colors">Twitter</Link>
          <Link href="#" className="text-on-surface-variant font-body-sm hover:text-on-surface transition-colors">LinkedIn</Link>
          <Link href="#" className="text-on-surface-variant font-body-sm hover:text-on-surface transition-colors">Discord</Link>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-lg py-md border-t border-outline-variant/10 flex justify-between items-center text-on-surface-variant text-[12px]">
        <p>© 2024 PrepForge AI. All rights reserved.</p>
        <div className="flex gap-lg">
          <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
