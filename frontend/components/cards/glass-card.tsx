"use client";

import React, { useState, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverGlow?: boolean;
  pulseGlow?: boolean;
}

export default function GlassCard({ 
  children, 
  className = "", 
  hoverGlow = true,
  pulseGlow = false,
  ...props 
}: GlassCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "glass-card p-xl rounded-2xl border border-white/5 bg-[#1f1f27]/40 backdrop-blur-xl relative overflow-hidden transition-all duration-300",
        pulseGlow && "pulse-glow-effect",
        className
      )}
      {...props}
    >
      {/* Glow Highlight overlay */}
      {hoverGlow && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(192, 193, 255, 0.08), transparent 80%)`
          }}
        />
      )}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
