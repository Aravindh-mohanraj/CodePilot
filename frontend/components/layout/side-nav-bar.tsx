"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Compass, 
  Building2, 
  Grid, 
  Bot, 
  User, 
  Settings, 
  HelpCircle,
  Zap
} from 'lucide-react';

interface SideNavBarProps {
  className?: string;
  onLinkClick?: () => void;
}

export default function SideNavBar({ className = "", onLinkClick }: SideNavBarProps) {
  const pathname = usePathname();

  const primaryNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Explore', href: '/explore', icon: Compass },
    { name: 'Companies', href: '/companies', icon: Building2 },
    { name: 'Categories', href: '/categories', icon: Grid },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'AI Assistant', href: '/ai-coach', icon: Bot },
  ];

  const isActive = (href: string) => {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
  };

  return (
    <aside className={`h-full bg-surface-container border-r border-outline-variant/30 flex flex-col py-xl ${className}`}>
      {/* Header */}
      <div className="px-lg mb-3xl">
        <h1 className="font-headline-sm text-headline-sm text-primary font-black tracking-tighter">PrepForge AI</h1>
        <p className="font-label-md text-label-md text-on-surface-variant opacity-70 mt-xs">AI Interview Prep</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-xs overflow-y-auto custom-scrollbar">
        {primaryNavItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onLinkClick}
              className={`flex items-center gap-md p-md mx-sm rounded-lg transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                active
                  ? 'bg-primary-container text-on-primary-container shadow-lg shadow-primary/10'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? '' : 'text-on-surface-variant group-hover:text-on-surface'}`} />
              <span className="font-label-md text-label-md">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Action / Footer Section */}
      <div className="px-md mt-auto pt-xl border-t border-outline-variant/10 space-y-md">
        <Link href="/explore" onClick={onLinkClick} tabIndex={-1}>
          <button className="w-full py-md bg-primary text-on-primary-container font-label-md text-label-md rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/10 pulse-glow-effect flex items-center justify-center gap-xs focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
            <Zap className="w-4 h-4 fill-current" />
            Start Practice
          </button>
        </Link>
        <div className="flex flex-col gap-xs pt-sm">
          <Link
            href="#"
            onClick={onLinkClick}
            className="flex items-center gap-md text-on-surface-variant p-md mx-sm hover:bg-surface-container-highest hover:text-on-surface transition-all rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <Settings className="w-5 h-5 text-on-surface-variant" />
            <span className="font-label-md text-label-md">Settings</span>
          </Link>
          <Link
            href="#"
            onClick={onLinkClick}
            className="flex items-center gap-md text-on-surface-variant p-md mx-sm hover:bg-surface-container-highest hover:text-on-surface transition-all rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <HelpCircle className="w-5 h-5 text-on-surface-variant" />
            <span className="font-label-md text-label-md">Support</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
