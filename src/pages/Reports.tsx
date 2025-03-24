
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { DownloadIcon, SendIcon, PrinterIcon, BarChart2Icon, PieChartIcon, ClockIcon, CalendarIcon, BookOpenIcon, BrainIcon, TrendingUpIcon, Target, LightbulbIcon, AlertCircleIcon } from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import { SubjectAttentionChart } from "@/components/reports/SubjectAttentionChart";
import { WeeklyProgressChart } from "@/components/reports/WeeklyProgressChart";
import { AttentionScoreChart } from "@/components/reports/AttentionScoreChart";

const Reports = () => {
  const [dateRange, setDateRange] = useState("week");
  
  // Sample data for charts
  const weeklyData = [
    { day: 'Mon', studyTime: 2.5, focusScore: 85, tasks: 4 },
    { day: 'Tue', studyTime: 3, focusScore: 90, tasks: 5 },
    { day: 'Wed', studyTime: 2, focusScore: 75, tasks: 3 },
    { day: 'Thu', studyTime: 4, focusScore: 95, tasks: 6 },
    { day: 'Fri', studyTime: 1.5, focusScore: 80, tasks: 2 },
    { day: 'Sat', studyTime: 3.5, focusScore: 85, tasks: 4 },
    { day: 'Sun', studyTime: 1, focusScore: 70, tasks: 1 },
  ];
  
  const subjectData = [
    { name: 'Mathematics', value: 35, color: '#3b82f6' },
    { name: 'Science', value: 25, color: '#10b981' },
    { name: 'English', value: 15, color: '#f59e0b' },
    { name: 'History', value: 10, color: '#ef4444' },
    { name: 'Computer Science', value: 15, color: '#8b5cf6' },
  ];
  
  const attentionData = {
    mathematics: [
      { time: '0', score: 85 },
      { time: '15', score: 90 },
      { time: '30', score: 75 },
      { time: '45', score: 80 },
      { time: '60', score: 95 },
      { time: '75', score: 85 },
      { time: '90', score: 70 },
    ],
    science: [
      { time: '0', score: 75 },
      { time: '15', score: 85 },
      { time: '30', score: 90 },
      { time: '45', score: 80 },
      { time: '60', score: 75 },
      { time: '75', score: 70 },
      { time: '90', score: 65 },
    ]
  };
  
  const weeklyProgress = [
    { week: 'Week 1', math: 65, science: 70, english: 80 },
    { week: 'Week 2', math: 68, science: 72, english: 79 },
    { week: 'Week 3', math: 75, science: 78, english: 83 },
    { week: 'Week 4', math: 80, science: 82, english: 85 },
    { week: 'Week 5', math: 85, science: 84, english: 88 },
    { week: 'Week 6', math: 90, science: 89, english: 90 },
  ];
  
  const insights = [
    {
      title: "Peak Focus Time",
      description: "You're most focused in the morning between 9-11 AM. Schedule challenging tasks during this time.",
      icon: <ClockIcon className="h-5 w-5 text-blue-500" />,
      type: "info"
    },
    {
      title: "Subject Strength",
      description: "Your performance in Mathematics has improved by 15% since last month. Keep up the good work!",
      icon: <TrendingUpIcon className="h-5 w-5 text-green-500" />,
      type: "success"
    },
    {
      title: "Attention Pattern",
      description: "Your focus tends to drop after 45 minutes. Consider using the Pomodoro technique with shorter study intervals.",
      icon: <LightbulbIcon className="h-5 w-5 text-amber-500" />,
      type: "warning"
    },
    {
      title: "Learning Gap",
      description: "You're struggling with Physics concepts, particularly in Electromagnetism. Consider scheduling additional sessions.",
      icon: <AlertCircleIcon className="h-5 w-5 text-red-500" />,
      type: "alert"
    }
  ];
  
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights about your study patterns
          </p>
        </div>
        
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <Select defaultValue="week" onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <DownloadIcon className="h-4 w-4 mr-1" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SendIcon className="h-4 w-4 mr-2" />
                Email to Parent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card shadow-subtle animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Study Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ClockIcon className="mr-2 h-4 w-4 text-blue-500" />
                <div className="text-2xl font-bold">18.5h</div>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">+2.5h</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Compared to last week</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card shadow-subtle animate-slide-up delay-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpenIcon className="mr-2 h-4 w-4 text-green-500" />
                <div className="text-2xl font-bold">24</div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">+5</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Compared to last week</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card shadow-subtle animate-slide-up delay-150">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Focus Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BrainIcon className="mr-2 h-4 w-4 text-amber-500" />
                <div className="text-2xl font-bold">85%</div>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700">+3%</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Compared to last week</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card shadow-subtle animate-slide-up delay-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="mr-2 h-4 w-4 text-purple-500" />
                <div className="text-2xl font-bold">12 days</div>
              </div>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">Best: 14</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Keep going!</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-card shadow-subtle animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span>Daily Study Activity</span>
              <Badge variant="outline">{
                dateRange === "day" ? "Today" : 
                dateRange === "week" ? "This Week" : 
                dateRange === "month" ? "This Month" : "Custom"
              }</Badge>
            </CardTitle>
            <CardDescription>Study time and focus score by day</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
                    }}
                  />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="studyTime" 
                    name="Study Time (hours)" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="focusScore" 
                    name="Focus Score" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card shadow-subtle animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle>Study Time Distribution</CardTitle>
            <CardDescription>Time spent by subject</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {subjectData.map((entry, index) => (
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="progress">
        <TabsList>
          <TabsTrigger value="progress">Learning Progress</TabsTrigger>
          <TabsTrigger value="attention">Attention Analysis</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress" className="mt-6">
          <Card className="glass-card shadow-subtle">
            <CardHeader>
              <CardTitle>Subject Progress Over Time</CardTitle>
              <CardDescription>
                Track your improvement across different subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <WeeklyProgressChart data={weeklyProgress} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attention" className="mt-6">
          <Card className="glass-card shadow-subtle">
            <CardHeader>
              <CardTitle>Attention Score During Study Sessions</CardTitle>
              <CardDescription>
                Analysis of your focus patterns during sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <Label>Mathematics Session (90 minutes)</Label>
                <div className="h-[200px]">
                  <AttentionScoreChart data={attentionData.mathematics} color="#3b82f6" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Science Session (90 minutes)</Label>
                <div className="h-[200px]">
                  <AttentionScoreChart data={attentionData.science} color="#10b981" />
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center">
                  <BrainIcon className="h-4 w-4 mr-2" />
                  AI Focus Analysis
                </h3>
                <p className="mt-2 text-sm">
                  Your focus tends to peak 30 minutes into your study sessions and begins to decline after 60 minutes. 
                  Consider taking short breaks every 25-30 minutes to maintain optimal attention levels.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-6">
          <Card className="glass-card shadow-subtle">
            <CardHeader>
              <CardTitle>AI-Generated Learning Insights</CardTitle>
              <CardDescription>
                Smart recommendations based on your study patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.map((insight, index) => (
                  <Card 
                    key={index} 
                    className={`
                      border 
                      ${insight.type === "info" ? "border-blue-100 dark:border-blue-800" : ""}
                      ${insight.type === "success" ? "border-green-100 dark:border-green-800" : ""}
                      ${insight.type === "warning" ? "border-amber-100 dark:border-amber-800" : ""}
                      ${insight.type === "alert" ? "border-red-100 dark:border-red-800" : ""}
                    `}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div 
                          className={`
                            h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0
                            ${insight.type === "info" ? "bg-blue-50 dark:bg-blue-900/30" : ""}
                            ${insight.type === "success" ? "bg-green-50 dark:bg-green-900/30" : ""}
                            ${insight.type === "warning" ? "bg-amber-50 dark:bg-amber-900/30" : ""}
                            ${insight.type === "alert" ? "bg-red-50 dark:bg-red-900/30" : ""}
                          `}
                        >
                          {insight.icon}
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{insight.title}</h3>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 bg-muted/30 p-4 rounded-lg border">
                <h3 className="font-medium mb-2 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Weekly Report Summary
                </h3>
                <p className="text-sm text-muted-foreground">
                  This week, you've shown excellent progress in Mathematics, with a 15% improvement in your assessment scores. 
                  Your focus during morning sessions has been exceptional, though afternoon sessions show room for improvement. 
                  Consider restructuring your study schedule to tackle difficult topics in the morning when your concentration is at its peak.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button variant="outline" className="w-full">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Download Full Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    <SendIcon className="mr-2 h-4 w-4" />
                    Share with Parent
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Dropdown components used in the Reports page
const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="relative">
      {React.cloneElement(React.Children.only(children[0]), {
        onClick: () => setOpen(!open),
      })}
      {open && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-10 border border-gray-200 dark:border-gray-700">
          {children[1]}
        </div>
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ asChild, children }) => {
  return children;
};

const DropdownMenuContent = ({ children }) => {
  return <div className="py-1">{children}</div>;
};

const DropdownMenuItem = ({ children }) => {
  return (
    <button className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700">
      {children}
    </button>
  );
};

export default Reports;
