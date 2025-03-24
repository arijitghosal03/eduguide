
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { VideoIcon, Users, Clock, CalendarIcon, ExternalLinkIcon, PlayCircleIcon, MessageSquareIcon } from "lucide-react";
import { ClassCard } from "@/components/classes/ClassCard";
import { VideoPlayer } from "@/components/classes/VideoPlayer";
import { MeetingJoiner } from "@/components/classes/MeetingJoiner";

const Classes = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [showMeetingJoiner, setShowMeetingJoiner] = useState(false);
  const [currentMeetingUrl, setCurrentMeetingUrl] = useState("");

  const handlePlayVideo = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoPlayer(true);
  };

  const handleJoinMeeting = (meetingUrl: string) => {
    setCurrentMeetingUrl(meetingUrl);
    setShowMeetingJoiner(true);
  };

  const upcomingClasses = [
    {
      id: 1,
      title: "Advanced Calculus",
      time: "9:30 AM",
      date: "Today",
      duration: "60 min",
      type: "live",
      platform: "Zoom",
      url: "https://zoom.us/j/example",
      teacher: "Mr. Johnson"
    },
    {
      id: 2,
      title: "Physics Basics",
      time: "11:00 AM",
      date: "Today",
      duration: "45 min",
      type: "recording",
      platform: "YouTube",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      teacher: "Ms. Smith"
    },
    {
      id: 3,
      title: "Chemistry Lab - Molecules",
      time: "2:00 PM",
      date: "Tomorrow",
      duration: "90 min",
      type: "live",
      platform: "Google Meet",
      url: "https://meet.google.com/example",
      teacher: "Dr. Williams"
    }
  ];

  const recordedClasses = [
    {
      id: 4,
      title: "History - World War II",
      date: "Yesterday",
      duration: "55 min",
      type: "recording",
      platform: "YouTube",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      teacher: "Mr. Davis"
    },
    {
      id: 5,
      title: "English Literature - Shakespeare",
      date: "2 days ago",
      duration: "60 min",
      type: "recording",
      platform: "YouTube",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      teacher: "Ms. Johnson"
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Online Classes</h1>
          <p className="text-muted-foreground">
            Attend live classes and watch recorded content
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <VideoIcon className="mr-1 h-4 w-4" />
              Add Class Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="class-title">Class Title</Label>
                <Input id="class-title" placeholder="Enter class title" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="class-link">Class Link</Label>
                <Input id="class-link" placeholder="Paste YouTube, Zoom or Google Meet link" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="class-date">Date</Label>
                  <Input id="class-date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class-time">Time</Label>
                  <Input id="class-time" type="time" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="class-duration">Duration (minutes)</Label>
                <Input id="class-duration" type="number" placeholder="60" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                onClick={() => {
                  toast.success("Class added successfully");
                }}
              >
                Add Class
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
          <TabsTrigger value="recorded">Recorded Classes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 pt-4">
          {upcomingClasses.map((classItem) => (
            <ClassCard 
              key={classItem.id}
              title={classItem.title}
              time={classItem.time}
              date={classItem.date}
              duration={classItem.duration}
              type={classItem.type}
              platform={classItem.platform}
              teacher={classItem.teacher}
              onJoin={() => {
                if (classItem.platform === "YouTube") {
                  handlePlayVideo(classItem.url);
                } else {
                  handleJoinMeeting(classItem.url);
                }
              }}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="recorded" className="space-y-4 pt-4">
          {recordedClasses.map((classItem) => (
            <ClassCard 
              key={classItem.id}
              title={classItem.title}
              date={classItem.date}
              duration={classItem.duration}
              type={classItem.type}
              platform={classItem.platform}
              teacher={classItem.teacher}
              onJoin={() => handlePlayVideo(classItem.url)}
            />
          ))}
        </TabsContent>
      </Tabs>
      
      {showVideoPlayer && (
        <Dialog open={showVideoPlayer} onOpenChange={setShowVideoPlayer}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Class Video</DialogTitle>
            </DialogHeader>
            <div className="aspect-video w-full">
              <VideoPlayer videoUrl={currentVideoUrl} />
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {showMeetingJoiner && (
        <Dialog open={showMeetingJoiner} onOpenChange={setShowMeetingJoiner}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Meeting</DialogTitle>
            </DialogHeader>
            <MeetingJoiner meetingUrl={currentMeetingUrl} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Classes;
