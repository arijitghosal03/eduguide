
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const StudyStats = () => {
  const subjectProgress = [
    { subject: 'Mathematics', progress: 85, color: 'bg-blue-600' },
    { subject: 'Physics', progress: 72, color: 'bg-purple-600' },
    { subject: 'Chemistry', progress: 91, color: 'bg-green-600' },
    { subject: 'English', progress: 65, color: 'bg-amber-600' },
    { subject: 'History', progress: 78, color: 'bg-red-600' }
  ];
  
  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 2 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 1.5 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 1 }
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card shadow-subtle animate-slide-up">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Subject Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectProgress.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${item.color} mr-2`}></div>
                    <span className="text-sm font-medium">{item.subject}</span>
                  </div>
                  <Badge variant="outline" className="font-mono">{item.progress}%</Badge>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card shadow-subtle animate-slide-up">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Weekly Study Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value) => [`${value} hours`, 'Study Time']}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
                  }}
                />
                <Bar 
                  dataKey="hours" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
