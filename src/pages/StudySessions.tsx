import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { PlayIcon, PauseIcon, SquareIcon, Camera, BellIcon, ClockIcon, BookOpenIcon, EyeIcon, BrainIcon, LayoutGridIcon, ImageIcon, Settings2Icon } from "lucide-react";
import { SessionHistoryItem } from "@/components/study/SessionHistoryItem";
import { LiveSessionMonitor } from "@/components/dashboard/LiveSessionMonitor";

const StudySessions = () => {
  const [activeSession, setActiveSession] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionPaused, setSessionPaused] = useState(false);
  
  const startSession = () => {
    setActiveSession(true);
    toast.success("Study session started", {
      description: "Your activity is now being monitored"
    });
  };
  
  const pauseSession = () => {
    setSessionPaused(!sessionPaused);
    if (sessionPaused) {
      toast.info("Session resumed");
    } else {
      toast.info("Session paused");
    }
  };
  
  const endSession = () => {
    setActiveSession(false);
    setSessionTime(0);
    toast.success("Session completed", {
      description: "Great job! Your session data has been saved."
    });
  };
  
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Sessions</h1>
          <p className="text-muted-foreground">
            Monitor and manage your focused study time
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <Settings2Icon className="mr-1 h-4 w-4" />
              Configure Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Session Settings</DialogTitle>
              <DialogDescription>
                Configure your monitoring preferences
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="camera-settings">Camera Settings</Label>
                <Select defaultValue="face">
                  <SelectTrigger id="camera-settings">
                    <SelectValue placeholder="Select monitoring mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="face">Face monitoring only</SelectItem>
                    <SelectItem value="desk">Desk and face monitoring</SelectItem>
                    <SelectItem value="posture">Posture analysis</SelectItem>
                    <SelectItem value="full">Full monitoring suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session-duration">Default Session Duration</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input id="session-duration" placeholder="45" type="number" />
                  <Select defaultValue="minutes">
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <h3 className="font-medium">Monitoring Features</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="eye-tracking" className="flex items-center gap-2">
                    <EyeIcon className="h-4 w-4" /> 
                    Eye tracking
                  </Label>
                  <Switch id="eye-tracking" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="posture-analysis" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" /> 
                    Posture analysis
                  </Label>
                  <Switch id="posture-analysis" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="break-reminders" className="flex items-center gap-2">
                    <BellIcon className="h-4 w-4" /> 
                    Break reminders
                  </Label>
                  <Switch id="break-reminders" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>
                  Distraction Sensitivity
                </Label>
                <div className="pt-2">
                  <Slider defaultValue={[65]} max={100} step={1} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">Save Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {activeSession ? (
        <Card className="glass-card shadow-elevation animate-slide-up border-blue-100 dark:border-blue-900">
          <CardHeader className="pb-3">
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                Active Study Session
              </span>
              
              <div className="flex gap-2">
                <Badge 
                  variant="outline" 
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <ClockIcon className="mr-1 h-3 w-3" />
                  {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
                </Badge>
                
                <Badge 
                  variant="outline" 
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <BrainIcon className="mr-1 h-3 w-3" />
                  Good Focus
                </Badge>
              </div>
            </CardTitle>
            <CardDescription>
              {sessionPaused 
                ? "Session paused. Resume when you're ready to continue."
                : "Your study activity is being monitored and analyzed"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3 h-[300px] overflow-hidden relative rounded-lg">
                <LiveSessionMonitor />
              </div>
              
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-white/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 shadow-sm">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base font-medium">Real-time Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3 space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Focus Level</span>
                        <span className="font-medium">Excellent</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Posture</span>
                        <span className="font-medium">Good</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Engagement</span>
                        <span className="font-medium">Very High</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Environment</span>
                        <span className="font-medium">Minimal Distractions</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 shadow-sm">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base font-medium">AI Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <BellIcon className="h-3 w-3 text-blue-600" />
                        </div>
                        <span>Consider taking a 5-minute break in the next 15 minutes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <EyeIcon className="h-3 w-3 text-blue-600" />
                        </div>
                        <span>Try the 20-20-20 rule to reduce eye strain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <BrainIcon className="h-3 w-3 text-blue-600" />
                        </div>
                        <span>Your focus is best when studying Physics - consider scheduling more sessions</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex gap-2 justify-end pt-2">
            <Button 
              variant={sessionPaused ? "default" : "outline"} 
              onClick={pauseSession}
              className={sessionPaused ? "bg-blue-500 hover:bg-blue-600" : ""}
            >
              {sessionPaused 
                ? <><PlayIcon className="mr-1 h-4 w-4" /> Resume</>
                : <><PauseIcon className="mr-1 h-4 w-4" /> Pause</>
              }
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={endSession}
            >
              <SquareIcon className="mr-1 h-4 w-4" /> End Session
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="glass-card shadow-subtle animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle>Start a Study Session</CardTitle>
            <CardDescription>
              Begin a monitored study session with AI analysis and feedback
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
                  <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Session Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <EyeIcon className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-sm">Real-time focus and attention monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BrainIcon className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-sm">AI-powered learning suggestions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <LayoutGridIcon className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-sm">Posture and ergonomics guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BookOpenIcon className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-sm">Comprehensive session reporting</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Subject</Label>
                    <Select defaultValue="math">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="computer">Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Session Duration</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="45" type="number" />
                      <Select defaultValue="minutes">
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutes">Minutes</SelectItem>
                          <SelectItem value="hours">Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="reminder-breaks" />
                    <Label htmlFor="reminder-breaks">Enable break reminders</Label>
                  </div>
                </div>
              </div>
              
              <div className="relative h-[300px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-col gap-4">
                  <Camera className="h-16 w-16 text-muted-foreground/40" />
                  <div className="text-center px-6">
                    <h3 className="font-medium mb-1">Camera Preview</h3>
                    <p className="text-sm text-muted-foreground">Camera access will begin when you start your session</p>
                  </div>
                  <Button onClick={startSession} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <PlayIcon className="mr-1 h-4 w-4" />
                    Start Monitoring
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Recent Sessions</h2>
        <Tabs defaultValue="today">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4 pt-4">
            <SessionHistoryItem 
              date="Today"
              time="2:15 PM"
              duration="1h 30m"
              subject="Mathematics"
              focusScore={87}
              completedTasks={4}
            />
            <SessionHistoryItem 
              date="Today"
              time="10:30 AM"
              duration="45m"
              subject="Computer Science"
              focusScore={92}
              completedTasks={2}
            />
          </TabsContent>
          
          <TabsContent value="week" className="space-y-4 pt-4">
            <SessionHistoryItem 
              date="Yesterday"
              time="3:00 PM"
              duration="2h 15m"
              subject="Science"
              focusScore={85}
              completedTasks={6}
            />
            <SessionHistoryItem 
              date="2 days ago"
              time="9:45 AM"
              duration="1h 15m"
              subject="English Literature"
              focusScore={78}
              completedTasks={3}
            />
            <SessionHistoryItem 
              date="3 days ago"
              time="4:30 PM"
              duration="1h 45m"
              subject="History"
              focusScore={81}
              completedTasks={5}
            />
          </TabsContent>
          
          <TabsContent value="month" className="pt-4">
            <div className="text-center py-8 text-muted-foreground">
              <p>View all sessions in the Reports section</p>
              <Button variant="link" className="mt-2">Go to Reports</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudySessions;
