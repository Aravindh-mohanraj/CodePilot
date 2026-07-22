"use client";

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface ChartDataPoint {
  name: string;
  solved: number;
  color: string;
}

const data: ChartDataPoint[] = [
  { name: 'ALGO', solved: 45, color: '#c0c1ff' }, // Primary
  { name: 'SYS', solved: 32, color: '#d2bbff' }, // Secondary
  { name: 'DB', solved: 52, color: '#ffb783' }, // Tertiary
  { name: 'WEB', solved: 18, color: '#c0c1ff' }, // Primary
  { name: 'NET', solved: 38, color: '#d2bbff' }, // Secondary
];

export default function CategoryBarChart() {
  return (
    <div className="w-full h-full min-h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 5,
            left: -25,
            bottom: 0,
          }}
        >
          <XAxis 
            dataKey="name" 
            stroke="#908fa0" 
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis 
            stroke="#908fa0" 
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dx={-8}
          />
          <Tooltip
            cursor={{ fill: 'rgba(192, 193, 255, 0.03)' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const dataPoint = payload[0].payload as ChartDataPoint;
                return (
                  <div className="glass-panel px-md py-sm rounded-lg border border-outline-variant/30 text-xs shadow-xl bg-surface-container-high/90 backdrop-blur-md">
                    <p className="font-bold text-on-surface">{dataPoint.name}</p>
                    <p className="text-primary mt-xs font-semibold">Solved: {dataPoint.solved}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="solved" 
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.65} className="hover:fill-opacity-95 transition-all duration-300" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
