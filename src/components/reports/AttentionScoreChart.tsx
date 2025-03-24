
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface AttentionScoreChartProps {
  data: {
    time: string;
    score: number;
  }[];
  color?: string;
}

export const AttentionScoreChart = ({ data, color = "#3b82f6" }: AttentionScoreChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
        <XAxis 
          dataKey="time" 
          axisLine={false}
          tickLine={false}
          label={{ value: 'Minutes', position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis 
          domain={[0, 100]} 
          axisLine={false}
          tickLine={false}
          label={{ value: 'Focus Score', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
          }}
          formatter={(value) => [`${value}`, 'Focus Score']}
          labelFormatter={(label) => `${label} min`}
        />
        <Area 
          type="monotone" 
          dataKey="score" 
          stroke={color} 
          fill={color}
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
