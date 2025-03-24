
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoIcon, Users, Clock, CalendarIcon, ExternalLinkIcon, PlayCircleIcon } from "lucide-react";

interface ClassCardProps {
  title: string;
  time?: string;
  date: string;
  duration: string;
  type: 'live' | 'recording';
  platform: 'Zoom' | 'Google Meet' | 'YouTube';
  teacher?: string;
  onJoin: () => void;
}

export const ClassCard = ({
  title,
  time,
  date,
  duration,
  type,
  platform,
  teacher,
  onJoin
}: ClassCardProps) => {
  return (
    <Card className="glass-card shadow-subtle hover:shadow-elevation transition-all duration-300 animate-slide-up">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
          <div className="flex-shrink-0">
            <div 
              className={`
                h-10 w-10 rounded-lg flex items-center justify-center
                ${platform === 'YouTube' ? 'bg-red-100 text-red-600' : ''}
                ${platform === 'Zoom' ? 'bg-blue-100 text-blue-600' : ''}
                ${platform === 'Google Meet' ? 'bg-green-100 text-green-600' : ''}
              `}
            >
              {platform === 'YouTube' && <PlayCircleIcon className="h-5 w-5" />}
              {(platform === 'Zoom' || platform === 'Google Meet') && <VideoIcon className="h-5 w-5" />}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{title}</h3>
                  <Badge 
                    className={`ml-2 
                      ${type === 'live' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                      ${type === 'recording' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : ''}
                    `}
                  >
                    {type === 'live' ? 'Live' : 'Recording'}
                  </Badge>
                </div>
                {teacher && <p className="text-sm text-muted-foreground">Teacher: {teacher}</p>}
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                {time && (
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>{time}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span>{duration}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onJoin}
            className={`flex-shrink-0 
              ${platform === 'YouTube' ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' : ''}
              ${platform === 'Zoom' ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' : ''}
              ${platform === 'Google Meet' ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' : ''}
            `}
          >
            {type === 'live' ? 'Join Now' : 'Watch'}
            <ExternalLinkIcon className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
