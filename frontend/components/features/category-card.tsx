"use client";

import React from 'react';
import { 
  TableProperties, 
  Type, 
  Link2, 
  Network, 
  Coins, 
  Undo2, 
  Layers, 
  Server, 
  Cpu, 
  Database, 
  Globe,
  Plus
} from 'lucide-react';
import { Category } from '@/types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "arrays": TableProperties,
  "strings": Type,
  "linked-lists": Link2,
  "trees": Network,
  "greedy": Coins,
  "backtracking": Undo2,
  "dynamic-programming": Layers,
  "system-design": Server,
  "operating-systems": Cpu,
  "graph-theory": Network,
  "databases": Database,
  "computer-networks": Globe
};

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  const IconComponent = ICON_MAP[category.id] || Plus;

  const isDoubleWidth = category.spanColumns;

  if (isDoubleWidth) {
    return (
      <div 
        onClick={onClick}
        className="glass-card rounded-2xl p-xl flex flex-col gap-lg group cursor-pointer border border-white/5 bg-[#1f1f27]/40 backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:border-primary/40 lg:col-span-2 text-left"
      >
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at 50% 50%, rgba(192, 193, 255, 0.04), transparent 80%)`
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row gap-xl h-full justify-between">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-lg">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
                  <IconComponent className="w-6 h-6 text-primary group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
                </div>
                <span className={`px-sm py-xs rounded-full font-label-md text-label-md text-xs font-semibold ${category.difficultyColor}`}>
                  {category.difficultyTag}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs font-bold leading-tight">
                {category.name}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md text-sm leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="flex items-center gap-xl pt-lg mt-auto">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-xs text-xs">
                  <span className="font-label-md text-on-surface-variant font-medium">Progress</span>
                  <span className="font-label-md text-primary font-bold">{category.progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${category.progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-body-sm text-body-sm text-on-surface-variant block text-[10px] uppercase font-bold tracking-wider">Total Problems</span>
                <span className="font-title-lg text-title-lg text-on-surface font-bold">{category.totalQuestions}</span>
              </div>
            </div>
          </div>

          {/* Right illustration image mock */}
          <div className="w-full md:w-1/3 rounded-xl overflow-hidden relative min-h-[160px] border border-outline-variant/20 shadow-2xl">
            <div className="absolute inset-0 bg-[#0d0d15]/40 z-10 mix-blend-overlay"></div>
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('/images/graph-network.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="glass-card rounded-2xl p-xl flex flex-col gap-lg group cursor-pointer border border-white/5 bg-[#1f1f27]/40 backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:border-primary/40 text-left h-full justify-between"
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(250px circle at 50% 50%, rgba(192, 193, 255, 0.04), transparent 80%)`
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-lg">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
              <IconComponent className="w-6 h-6 text-primary group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
            </div>
            <span className={`px-sm py-xs rounded-full font-label-md text-label-md text-xs font-semibold ${category.difficultyColor}`}>
              {category.difficultyTag}
            </span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs font-bold leading-tight">
            {category.name}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-sm leading-relaxed mb-lg">
            {category.description}
          </p>
        </div>

        <div className="pt-md mt-auto">
          <div className="flex justify-between items-center mb-xs text-xs">
            <span className="font-label-md text-on-surface-variant font-medium">
              {category.questionsSolved}/{category.totalQuestions} Solved
            </span>
            <span className="font-label-md text-primary font-bold">{category.progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: `${category.progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
