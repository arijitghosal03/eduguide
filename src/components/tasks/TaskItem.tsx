
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, LinkIcon, MoreHorizontalIcon, Trash2Icon, PencilIcon, EyeIcon } from "lucide-react";

interface TaskLink {
  title: string;
  url: string;
}

interface Task {
  id: number;
  title: string;
  description?: string;
  subject: string;
  date: string;
  time?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  links?: TaskLink[];
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: () => void;
  onDelete: () => void;
}

export const TaskItem = ({ task, onToggleComplete, onDelete }: TaskItemProps) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  
  return (
    <Card className={`
      shadow-subtle hover:shadow-elevation transition-all duration-300 animate-slide-up
      ${task.completed ? 'bg-gray-50/80 dark:bg-gray-800/50' : 'glass-card'}
    `}>
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <Checkbox 
              checked={task.completed} 
              onCheckedChange={onToggleComplete} 
              className="mt-1"
            />
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </h3>
                    <Badge 
                      className={`
                        ${task.priority === 'high' ? 'bg-red-100 text-red-800 hover:bg-red-200' : ''}
                        ${task.priority === 'medium' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : ''}
                        ${task.priority === 'low' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                      `}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {task.subject}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center">
                    <CalendarIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>{formatDate(task.date)}</span>
                  </div>
                  {task.time && (
                    <div className="flex items-center">
                      <ClockIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>{task.time}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {expanded && (
                <div className="mt-3 space-y-2">
                  {task.description && (
                    <p className="text-sm text-muted-foreground bg-muted/40 p-2 rounded-md">
                      {task.description}
                    </p>
                  )}
                  
                  {task.links && task.links.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium mb-1">Educational Links:</p>
                      <div className="space-y-1">
                        {task.links.map((link, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <LinkIcon className="h-3 w-3 mr-1 text-blue-500" />
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {link.title}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setExpanded(!expanded)}
              >
                <EyeIcon className="h-4 w-4" />
              </Button>
              
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                    <button 
                      className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button 
                      className="flex w-full items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={onDelete}
                    >
                      <Trash2Icon className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
