
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, BookOpenIcon, ClockIcon, PlayIcon, BarChart2Icon, BrainIcon, PenLineIcon, LightbulbIcon } from "lucide-react";
import { LiveSessionMonitor } from "@/components/dashboard/LiveSessionMonitor";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { StudyStats } from "@/components/dashboard/StudyStats";
import { RecommendedResources } from "@/components/dashboard/RecommendedResources";

const Dashboard = () => {
  const [studyProgress, setStudyProgress] = useState(68);
  
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="space-y-2">
        <div className="mb-1">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 animate-fade-in">
            <LightbulbIcon className="mr-1 h-3 w-3" />
            AI Education
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, Arijit
        </h1>
        <p className="text-muted-foreground">
          Monitor your study progress and improve your learning with AI assistance.
        </p>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Overview */}
        <Card className="md:col-span-2 glass-card shadow-subtle animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="flex justify-between items-center">
              <span>Today's Overview</span>
              <Badge 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </Badge>
            </CardTitle>
            <CardDescription>Your learning progress for today</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <ClockIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="bg-gray-50">Today</Badge>
                </div>
                <h3 className="text-2xl font-bold mt-3">3h 45m</h3>
                <p className="text-sm text-muted-foreground">Study time</p>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <BookOpenIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="bg-gray-50">Completed</Badge>
                </div>
                <h3 className="text-2xl font-bold mt-3">5 / 8</h3>
                <p className="text-sm text-muted-foreground">Tasks completed</p>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <BrainIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="bg-gray-50">Today</Badge>
                </div>
                <h3 className="text-2xl font-bold mt-3">142</h3>
                <p className="text-sm text-muted-foreground">Focus score</p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <h4 className="font-medium">Daily study goal progress</h4>
                  <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200">{studyProgress}%</Badge>
                </div>
                <span className="text-sm text-muted-foreground">5:15 remaining</span>
              </div>
              <Progress 
                value={studyProgress} 
                className="h-2 bg-blue-100" 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="ml-auto">
              View detailed report
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Live Session Monitor Preview */}
        <Card className="glass-card shadow-subtle overflow-hidden animate-slide-up delay-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
              Live Session Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <LiveSessionMonitor />
          </CardContent>
          <CardFooter className="flex justify-between py-2">
            <Button variant="ghost" size="sm">Settings</Button>
            <Button size="sm" className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <PlayIcon className="mr-1 h-4 w-4" />
              Start Session
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Detailed Content Tabs */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger 
            value="tasks" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-2 data-[state=active]:shadow-none"
          >
            Upcoming Tasks
          </TabsTrigger>
          <TabsTrigger 
            value="stats" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-2 data-[state=active]:shadow-none"
          >
            Study Statistics
          </TabsTrigger>
          <TabsTrigger 
            value="resources" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-2 data-[state=active]:shadow-none"
          >
            Recommended Resources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="pt-4">
          <UpcomingTasks />
        </TabsContent>
        
        <TabsContent value="stats" className="pt-4">
          <StudyStats />
        </TabsContent>
        
        <TabsContent value="resources" className="pt-4">
          <RecommendedResources />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
