"use client";

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Easy', value: 62, color: '#c0c1ff' },
  { name: 'Medium', value: 54, color: '#d2bbff' },
  { name: 'Hard', value: 26, color: '#ffb783' },
];

export default function DifficultyDonut() {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="w-full h-full flex flex-col justify-between items-center min-h-[220px]">
      <div className="w-full flex-grow relative flex items-center justify-center min-h-[160px]">
        
        {/* Centered label inside the donut */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="block font-headline-md text-headline-md text-on-surface font-bold leading-none">
            {total}
          </span>
          <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
            Total
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const entry = payload[0].payload;
                  return (
                    <div className="glass-panel px-md py-sm rounded-lg border border-outline-variant/30 text-xs shadow-xl bg-surface-container-high/90 backdrop-blur-md">
                      <p className="font-bold text-on-surface">{entry.name}</p>
                      <p className="mt-xs font-semibold" style={{ color: entry.color }}>
                        Solved: {entry.value} ({Math.round(entry.value / total * 100)}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={data}
              cx="55%"
              cy="50%"
              innerRadius={50}
              outerRadius={65}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="rgba(19, 19, 27, 0.8)" 
                  strokeWidth={2}
                  className="outline-none focus:outline-none"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend list below */}
      <div className="grid grid-cols-3 gap-md w-full max-w-[280px] mt-md pt-sm border-t border-white/5">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col items-center text-center">
            <div className="flex items-center gap-xs">
              <span 
                className="w-2.5 h-2.5 rounded-full shrink-0" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                {item.name}
              </span>
            </div>
            <span className="text-xs text-on-surface font-semibold mt-0.5">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
