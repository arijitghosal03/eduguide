
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface SubjectAttentionChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export const SubjectAttentionChart = ({ data }: SubjectAttentionChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, 'Time Spent']}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
