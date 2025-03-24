
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClockIcon, BookOpenIcon, BarChart2Icon, DownloadIcon, ChevronRightIcon } from "lucide-react";

interface SessionHistoryItemProps {
  date: string;
  time: string;
  duration: string;
  subject: string;
  focusScore: number;
  completedTasks: number;
}

export const SessionHistoryItem = ({
  date,
  time,
  duration,
  subject,
  focusScore,
  completedTasks
}: SessionHistoryItemProps) => {
  return (
    <Card className="glass-card shadow-subtle hover:shadow-elevation transition-all duration-300 animate-slide-up">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          <div className="flex-shrink-0 sm:border-r sm:pr-4 sm:mr-2">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium">{date}</p>
              <p className="text-xs text-muted-foreground">{time}</p>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="flex items-center sm:flex-col sm:items-start gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <ClockIcon className="h-4 w-4 text-blue-500" />
                  <span className="text-muted-foreground sm:text-xs">Duration</span>
                </div>
                <div className="text-sm font-medium">{duration}</div>
              </div>
              
              <div className="flex items-center sm:flex-col sm:items-start gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <BookOpenIcon className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground sm:text-xs">Subject</span>
                </div>
                <div className="text-sm font-medium">{subject}</div>
              </div>
              
              <div className="flex items-center sm:flex-col sm:items-start gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <BarChart2Icon className="h-4 w-4 text-purple-500" />
                  <span className="text-muted-foreground sm:text-xs">Focus Score</span>
                </div>
                <Badge 
                  className={`
                    ${focusScore >= 90 ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                    ${focusScore >= 75 && focusScore < 90 ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : ''}
                    ${focusScore < 75 ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : ''}
                  `}
                >
                  {focusScore}/100
                </Badge>
              </div>
              
              <div className="flex items-center sm:flex-col sm:items-start gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <CheckIcon className="h-4 w-4 text-amber-500" />
                  <span className="text-muted-foreground sm:text-xs">Tasks</span>
                </div>
                <div className="text-sm font-medium">{completedTasks} completed</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-row sm:flex-col gap-2 justify-end">
            <Button size="sm" variant="outline" className="flex-1 h-8 gap-1">
              <DownloadIcon className="h-3.5 w-3.5" />
              <span className="sm:hidden md:inline">Report</span>
            </Button>
            <Button size="sm" className="flex-1 h-8 gap-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <ChevronRightIcon className="h-3.5 w-3.5" />
              <span className="sm:hidden md:inline">Details</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Icon component used in SessionHistoryItem
const CheckIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
