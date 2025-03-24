
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpenIcon, VideoIcon, PenLineIcon, ClockIcon, CalendarIcon, ChevronRightIcon } from "lucide-react";

export const UpcomingTasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Watch Calculus Lecture",
      time: "10:00 AM",
      duration: "45 min",
      subject: "Mathematics",
      type: "video",
      priority: "high"
    },
    {
      id: 2,
      title: "Complete Physics Quiz",
      time: "1:30 PM",
      duration: "30 min",
      subject: "Science",
      type: "quiz",
      priority: "medium"
    },
    {
      id: 3,
      title: "Attend Online Chemistry Class",
      time: "3:00 PM",
      duration: "60 min",
      subject: "Science",
      type: "class",
      priority: "high"
    },
    {
      id: 4,
      title: "Read History Chapter 5",
      time: "5:00 PM",
      duration: "40 min",
      subject: "History",
      type: "reading",
      priority: "low"
    }
  ];
  
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <Card key={task.id} className="glass-card shadow-subtle hover:shadow-elevation transition-all duration-300 animate-slide-up">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
              <div className="flex-shrink-0">
                <div 
                  className={`
                    h-10 w-10 rounded-lg flex items-center justify-center
                    ${task.type === 'video' ? 'bg-blue-100 text-blue-600' : ''}
                    ${task.type === 'quiz' ? 'bg-purple-100 text-purple-600' : ''}
                    ${task.type === 'class' ? 'bg-green-100 text-green-600' : ''}
                    ${task.type === 'reading' ? 'bg-amber-100 text-amber-600' : ''}
                  `}
                >
                  {task.type === 'video' && <VideoIcon className="h-5 w-5" />}
                  {task.type === 'quiz' && <PenLineIcon className="h-5 w-5" />}
                  {task.type === 'class' && <VideoIcon className="h-5 w-5" />}
                  {task.type === 'reading' && <BookOpenIcon className="h-5 w-5" />}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{task.title}</h3>
                      <Badge 
                        className={`ml-2 
                          ${task.priority === 'high' ? 'bg-red-100 text-red-800 hover:bg-red-200' : ''}
                          ${task.priority === 'medium' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : ''}
                          ${task.priority === 'low' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                        `}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.subject}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center">
                      <ClockIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>{task.time}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>{task.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button size="sm" className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Start
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex justify-end mt-2">
        <Button variant="outline" size="sm">View All Tasks</Button>
      </div>
    </div>
  );
};
