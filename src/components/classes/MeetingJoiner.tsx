
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Mic, Camera, ExternalLinkIcon } from "lucide-react";

interface MeetingJoinerProps {
  meetingUrl: string;
}

export const MeetingJoiner = ({ meetingUrl }: MeetingJoinerProps) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [name, setName] = useState("");

  const isPlatformZoom = meetingUrl.includes('zoom');
  const platformName = isPlatformZoom ? 'Zoom' : 'Google Meet';

  const handleJoinMeeting = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    // In a real app, we might want to track attendance here
    // by sending analytics data or other tracking mechanisms
    
    // Open the meeting URL in a new tab
    window.open(meetingUrl, '_blank');
    
    toast.success(`Joining ${platformName} meeting`, {
      description: `Camera: ${cameraEnabled ? 'On' : 'Off'}, Microphone: ${micEnabled ? 'On' : 'Off'}`
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="student-name">Your Name</Label>
        <Input 
          id="student-name" 
          placeholder="Enter your name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="camera-toggle">Camera</Label>
          </div>
          <Switch 
            id="camera-toggle" 
            checked={cameraEnabled}
            onCheckedChange={setCameraEnabled}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="mic-toggle">Microphone</Label>
          </div>
          <Switch 
            id="mic-toggle" 
            checked={micEnabled}
            onCheckedChange={setMicEnabled}
          />
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          You'll be joining a {platformName} meeting. Your attendance will be tracked for the duration of the class.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleJoinMeeting}
          className={isPlatformZoom 
            ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" 
            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          }
        >
          Join {platformName} Meeting
          <ExternalLinkIcon className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
