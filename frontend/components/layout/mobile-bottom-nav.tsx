"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Compass, Bot, User, Plus } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
  };

  const navItems = [
    { name: 'Dash', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Explore', href: '/explore', icon: Compass },
  ];

  const rightNavItems = [
    { name: 'AI', href: '/ai-coach', icon: Bot },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container/90 backdrop-blur-xl border-t border-outline-variant/20 flex justify-around items-center px-md z-50">
      {navItems.map((item) => {
        const active = isActive(item.href);
        const Icon = item.icon;
        return (
          <Link 
            key={item.name} 
            href={item.href}
            className={`flex flex-col items-center gap-1 ${active ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            <Icon className="w-5 h-5" />
            <span className={`text-[10px] font-label-md ${active ? 'font-bold' : ''}`}>{item.name}</span>
          </Link>
        );
      })}

      {/* Elevated central start/practice button */}
      <Link href="/explore">
        <div className="w-12 h-12 bg-primary text-on-primary-container rounded-full flex items-center justify-center -mt-6 shadow-xl active:scale-95 transition-all">
          <Plus className="w-6 h-6 stroke-[3]" />
        </div>
      </Link>

      {rightNavItems.map((item) => {
        const active = isActive(item.href);
        const Icon = item.icon;
        return (
          <Link 
            key={item.name} 
            href={item.href}
            className={`flex flex-col items-center gap-1 ${active ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            <Icon className="w-5 h-5" />
            <span className={`text-[10px] font-label-md ${active ? 'font-bold' : ''}`}>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
