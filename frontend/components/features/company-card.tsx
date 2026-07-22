"use client";

import React from 'react';
import { Company } from '@/types';

interface CompanyCardProps {
  company: Company;
  onClick: () => void;
}

export default function CompanyCard({ company, onClick }: CompanyCardProps) {
  // Render Trend Visualization dynamically matching trendType
  const renderTrend = () => {
    switch (company.trendType) {
      case 'bar':
        return (
          <div className="w-full h-12 flex items-end gap-[3px] mt-md">
            <div className="flex-1 bg-primary/20 h-4 rounded-t-sm group-hover:h-6 transition-all duration-300"></div>
            <div className="flex-1 bg-primary/20 h-6 rounded-t-sm group-hover:h-10 transition-all duration-300 delay-[50ms]"></div>
            <div className="flex-1 bg-primary/40 h-8 rounded-t-sm group-hover:h-8 transition-all duration-300 delay-[100ms]"></div>
            <div className="flex-1 bg-primary/60 h-10 rounded-t-sm group-hover:h-12 transition-all duration-300 delay-[150ms]"></div>
            <div className="flex-1 bg-primary h-7 rounded-t-sm group-hover:h-9 transition-all duration-300 delay-[200ms]"></div>
            <div className="flex-1 bg-primary/80 h-11 rounded-t-sm group-hover:h-11 transition-all duration-300 delay-[250ms]"></div>
          </div>
        );
      case 'progress':
        return (
          <div className="w-full h-12 flex items-center mt-md">
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${company.brandColor.includes('bg-') ? company.brandColor : 'bg-primary'}`}
                style={{ 
                  backgroundColor: company.brandColor.includes('bg-') ? '' : company.brandColor,
                  width: `${company.trendValue || 80}%` 
                }}
              />
            </div>
          </div>
        );
      case 'wave':
        return (
          <div className="w-full h-12 mt-md flex items-center">
            <svg className="w-full h-8 text-primary stroke-2 fill-none" viewBox="0 0 100 20">
              <path d="M0,15 Q25,5 50,15 T100,5" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'dots':
      default:
        return (
          <div className="w-full h-12 flex items-center justify-center gap-sm mt-md">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/10" />
          </div>
        );
    }
  };

  return (
    <div 
      onClick={onClick}
      className="glass-card rounded-2xl p-lg cursor-pointer flex flex-col group hover:shadow-primary/20 hover:border-primary/30 transition-all border border-white/5 bg-[#1f1f27]/40 backdrop-blur-xl relative overflow-hidden h-full justify-between"
    >
      {/* Radial Hover glow overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(250px circle at 50% 50%, rgba(192, 193, 255, 0.04), transparent 80%)`
        }}
      />

      <div className="relative z-10 w-full flex flex-col h-full justify-between">
        {/* Top Header Card Info */}
        <div className="flex justify-between items-start mb-xl w-full">
          {/* Logo container */}
          <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center border border-outline-variant/10 overflow-hidden shrink-0">
            <img 
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300" 
              src={company.logoPath} 
              alt={company.name}
              onError={(e) => {
                // If logo fails, fallback to simple placeholder text
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.parentElement) {
                  const fallback = document.createElement('span');
                  fallback.className = "text-primary font-bold text-lg uppercase";
                  fallback.innerText = company.name.substring(0, 2);
                  e.currentTarget.parentElement.appendChild(fallback);
                }
              }}
            />
          </div>
          <div className="flex flex-col items-end shrink-0 ml-md">
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-sm py-xs rounded-full uppercase tracking-wider">
              {company.frequency}
            </span>
            <span className="text-[9px] text-on-surface-variant opacity-60 mt-xs font-mono">
              Updated 2h ago
            </span>
          </div>
        </div>

        {/* Brand details */}
        <div className="text-left w-full mt-2">
          <h3 className="font-headline-sm text-headline-sm mb-xs text-on-surface font-bold leading-tight">
            {company.name}
          </h3>
          <p className="text-on-surface-variant font-body-sm text-body-sm text-sm">
            {company.questionCount}+ Questions asked
          </p>
        </div>

        {/* Lower Trend visualization */}
        <div className="w-full pt-md mt-lg border-t border-white/5">
          <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/40 mb-xs text-left">
            Hiring Trend (Last 30d)
          </p>
          {renderTrend()}
        </div>
      </div>
    </div>
  );
}
