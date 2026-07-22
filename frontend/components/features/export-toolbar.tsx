"use client";

import React from 'react';
import { Download } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface ExportToolbarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onExportJSON: () => void;
}

export default function ExportToolbar({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  onExportJSON
}: ExportToolbarProps) {
  const allSelected = selectedCount === totalCount && totalCount > 0;
  const someSelected = selectedCount > 0 && selectedCount < totalCount;

  const handleCheckboxChange = (checked: boolean | string) => {
    if (checked === true) {
      onSelectAll();
    } else {
      onDeselectAll();
    }
  };

  return (
    <div className="flex items-center justify-between bg-surface-container-low px-md py-sm rounded-xl border border-outline-variant/15 w-full flex-wrap gap-sm">
      <div className="flex items-center gap-md">
        {/* Bulk Select Checkbox */}
        <label className="flex items-center gap-sm cursor-pointer group select-none">
          <Checkbox 
            id="select-all-toolbar"
            checked={allSelected}
            onCheckedChange={handleCheckboxChange}
            className="border-outline-variant/60 data-[state=checked]:bg-primary data-[state=checked]:text-on-primary-container h-5 w-5 rounded cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            aria-label="Select all questions"
          />
          <span className="text-label-md font-medium text-on-surface-variant group-hover:text-on-surface text-sm">
            {allSelected ? "Deselect All" : "Select All"}
          </span>
        </label>
      </div>

      <div className="flex items-center gap-md ml-auto md:ml-0">
        {/* Selected Count Indicator */}
        {selectedCount > 0 && (
          <span className="text-label-md font-bold text-primary text-sm animate-pulse">
            {selectedCount} selected
          </span>
        )}

        {/* JSON Export Trigger Button */}
        <button 
          onClick={onExportJSON}
          disabled={selectedCount === 0}
          className={`flex items-center gap-xs px-md py-2 rounded-xl border font-label-md font-bold text-sm transition-all active:scale-95 duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
            selectedCount > 0
              ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-on-primary-container shadow-md shadow-primary/5'
              : 'bg-surface-container border-outline-variant/20 text-on-surface-variant/40 cursor-not-allowed opacity-50'
          }`}
        >
          <Download className="w-4 h-4" />
          Export JSON
        </button>
      </div>
    </div>
  );
}
