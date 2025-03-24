
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircleIcon, BookIcon, FileTextIcon, ExternalLinkIcon, StarIcon } from "lucide-react";

export const RecommendedResources = () => {
  const resources = [
    {
      id: 1,
      title: "Advanced Calculus: Derivatives Deep Dive",
      description: "Comprehensive tutorial on advanced differentiation techniques",
      type: "video",
      subject: "Mathematics",
      duration: "28 min",
      rating: 4.9
    },
    {
      id: 2,
      title: "Interactive Physics Lab: Forces and Motion",
      description: "Hands-on virtual lab for understanding Newton's laws",
      type: "interactive",
      subject: "Science",
      duration: "45 min",
      rating: 4.7
    },
    {
      id: 3,
      title: "Literary Analysis: Understanding Shakespeare",
      description: "Expert guide to analyzing Shakespearean themes and language",
      type: "article",
      subject: "English",
      duration: "15 min",
      rating: 4.5
    }
  ];
  
  return (
    <div className="space-y-4">
      {resources.map(resource => (
        <Card key={resource.id} className="glass-card shadow-subtle hover:shadow-elevation transition-all duration-300 animate-slide-up">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40 h-24 sm:h-auto flex-shrink-0 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                {resource.type === 'video' && <PlayCircleIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />}
                {resource.type === 'interactive' && <LaptopIcon className="h-10 w-10 text-purple-600 dark:text-purple-400" />}
                {resource.type === 'article' && <FileTextIcon className="h-10 w-10 text-green-600 dark:text-green-400" />}
                {resource.type === 'book' && <BookIcon className="h-10 w-10 text-amber-600 dark:text-amber-400" />}
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <Badge variant="secondary">{resource.subject}</Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {resource.type}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
                      <StarIcon className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {resource.rating}
                    </Badge>
                  </div>
                  
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mt-3">
                  <div className="text-sm text-muted-foreground">
                    Duration: {resource.duration}
                  </div>
                  
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <ExternalLinkIcon className="mr-1 h-4 w-4" />
                    Open Resource
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex justify-end mt-2">
        <Button variant="outline" size="sm">Browse All Resources</Button>
      </div>
    </div>
  );
};

// Icon component used in RecommendedResources
const LaptopIcon = (props) => (
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
    <rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect>
    <line x1="2" y1="20" x2="22" y2="20"></line>
  </svg>
);
