
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface WeeklyProgressChartProps {
  data: {
    week: string;
    math: number;
    science: number;
    english: number;
  }[];
}

export const WeeklyProgressChart = ({ data }: WeeklyProgressChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="week" />
        <YAxis domain={[0, 100]} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="math" 
          name="Mathematics" 
          stroke="#3b82f6" 
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line 
          type="monotone" 
          dataKey="science" 
          name="Science" 
          stroke="#10b981" 
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="english" 
          name="English" 
          stroke="#f59e0b" 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
