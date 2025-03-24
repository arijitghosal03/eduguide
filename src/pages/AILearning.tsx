
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainIcon, BookOpenIcon, MessagesSquareIcon, SendIcon, ChevronRightIcon, LightbulbIcon, StarIcon, PenSquareIcon, SparklesIcon, NotebookIcon, Share2Icon, BrainCircuitIcon, BookMarkedIcon } from "lucide-react";

const AILearning = () => {
  const [activeTab, setActiveTab] = useState("tutor");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "system", content: "Hello! I'm your AI learning assistant. How can I help you today?" },
  ]);
  
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      if (activeTab === "tutor") {
        response = "I can help explain that concept. The key thing to understand is how the different elements interact with each other. Would you like me to break it down step by step?";
      } else if (activeTab === "notes") {
        response = "I've created comprehensive notes on this topic. Here are the key points to remember:\n\n• First principle: Energy can neither be created nor destroyed\n• Second principle: Entropy of an isolated system always increases\n• Third principle: The entropy approaches a constant value as temperature approaches absolute zero";
      } else if (activeTab === "questions") {
        response = "Here's a practice question: If a system undergoes an adiabatic process, what happens to its entropy? \n\nTake your time to think about it, and let me know when you're ready for the answer.";
      }
      
      setChatMessages(prev => [...prev, { role: "system", content: response }]);
    }, 1000);
    
    setChatInput("");
  };
  
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Learning Assistant</h1>
        <p className="text-muted-foreground">
          Personalized learning support powered by advanced AI
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar with AI features */}
        <Card className="lg:col-span-1 glass-card shadow-subtle h-[600px] flex flex-col animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <BrainCircuitIcon className="mr-2 h-5 w-5 text-blue-500" />
              AI Learning Tools
            </CardTitle>
            <CardDescription>
              Educational AI assistants
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-3 flex-1">
            <Tabs defaultValue="brain" orientation="vertical" className="h-full flex flex-col">
              <TabsList className="grid grid-cols-3 lg:grid-cols-1 h-auto bg-muted/50 p-1 rounded-md">
                <TabsTrigger 
                  value="brain" 
                  className="px-3 py-2 h-auto data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <BookMarkedIcon className="lg:mr-2 h-4 w-4" />
                  <span className="hidden lg:inline">Learning</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="subjects" 
                  className="px-3 py-2 h-auto data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <BookOpenIcon className="lg:mr-2 h-4 w-4" />
                  <span className="hidden lg:inline">Subjects</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className="px-3 py-2 h-auto data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <LightbulbIcon className="lg:mr-2 h-4 w-4" />
                  <span className="hidden lg:inline">Insights</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="brain" className="flex-1 mt-3 overflow-auto">
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left p-3 rounded-md ${activeTab === "tutor" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" : ""}`}
                    onClick={() => setActiveTab("tutor")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-md">
                        <BrainIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">AI Tutor</div>
                        <div className="text-xs text-muted-foreground">Ask questions & get explanations</div>
                      </div>
                    </div>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left p-3 rounded-md ${activeTab === "notes" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" : ""}`}
                    onClick={() => setActiveTab("notes")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 dark:bg-green-800 p-2 rounded-md">
                        <NotebookIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">Smart Notes</div>
                        <div className="text-xs text-muted-foreground">Generate & organize study notes</div>
                      </div>
                    </div>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left p-3 rounded-md ${activeTab === "questions" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" : ""}`}
                    onClick={() => setActiveTab("questions")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-md">
                        <PenSquareIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">Practice Questions</div>
                        <div className="text-xs text-muted-foreground">Test your knowledge</div>
                      </div>
                    </div>
                  </Button>
                  
                  <Separator className="my-4" />
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-medium">Learning Insights</h3>
                    <div className="mt-2 text-sm text-muted-foreground space-y-2">
                      <div className="flex justify-between">
                        <span>Math proficiency</span>
                        <div className="font-medium text-blue-600">87%</div>
                      </div>
                      <div className="flex justify-between">
                        <span>Science concepts</span>
                        <div className="font-medium text-blue-600">92%</div>
                      </div>
                      <div className="flex justify-between">
                        <span>Focus quality</span>
                        <div className="font-medium text-blue-600">78%</div>
                      </div>
                    </div>
                    <Button variant="link" size="sm" className="mt-1 px-0">View detailed report</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="subjects" className="flex-1 mt-3 overflow-auto">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Your Subjects</h3>
                  
                  {["Mathematics", "Physics", "Chemistry", "English Literature", "Computer Science"].map((subject, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left px-3 py-2 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{subject}</div>
                        <ChevronRightIcon className="h-4 w-4 ml-auto" />
                      </div>
                    </Button>
                  ))}
                  
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Subject
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="insights" className="flex-1 mt-3 overflow-auto">
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center">
                      <SparklesIcon className="h-4 w-4 mr-1" />
                      AI Learning Insight
                    </h3>
                    <p className="mt-1 text-sm">
                      You learn best with visual materials and short practice sessions. Try watching more video tutorials.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                    <h3 className="text-sm font-medium text-amber-700 dark:text-amber-300 flex items-center">
                      <StarIcon className="h-4 w-4 mr-1" />
                      Study Recommendation
                    </h3>
                    <p className="mt-1 text-sm">
                      Your Physics knowledge has gaps in electromagnetism. Consider focusing on this area.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center">
                      <ChartIcon className="h-4 w-4 mr-1" />
                      Progress Update
                    </h3>
                    <p className="mt-1 text-sm">
                      Your Calculus skills have improved 15% in the last 2 weeks. Keep up the good work!
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Main AI interaction area */}
        <Card className="lg:col-span-3 glass-card shadow-subtle h-[600px] flex flex-col animate-slide-up">
          <CardHeader className="pb-2 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold">
                  {activeTab === "tutor" && "AI Tutor"}
                  {activeTab === "notes" && "Smart Notes Generator"}
                  {activeTab === "questions" && "Practice Questions"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "tutor" && "Get personalized explanations and answers to your questions"}
                  {activeTab === "notes" && "Generate comprehensive study notes on any topic"}
                  {activeTab === "questions" && "Test your knowledge with AI-generated questions"}
                </CardDescription>
              </div>
              
              <Badge 
                className={`
                  ${activeTab === "tutor" ? "bg-blue-100 text-blue-700 border-blue-200" : ""}
                  ${activeTab === "notes" ? "bg-green-100 text-green-700 border-green-200" : ""}
                  ${activeTab === "questions" ? "bg-amber-100 text-amber-700 border-amber-200" : ""}
                `}
              >
                AI Powered
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-3 flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {chatMessages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`
                        flex gap-3 max-w-[80%] rounded-lg p-3
                        ${message.role === "user" 
                          ? "bg-blue-500 text-white ml-auto" 
                          : "bg-gray-100 dark:bg-gray-800"
                        }
                      `}
                    >
                      {message.role === "system" && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-blue-100 text-blue-700">AI</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className="space-y-1">
                        <div className="text-sm whitespace-pre-line">{message.content}</div>
                        {message.role === "system" && (
                          <div className="flex gap-1 mt-2">
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs rounded-full">
                              <ThumbsUpIcon className="h-3 w-3 mr-1" />
                              Helpful
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs rounded-full">
                              <RefreshCcwIcon className="h-3 w-3 mr-1" />
                              Regenerate
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs rounded-full">
                              <Share2Icon className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="mt-4 relative">
              <Input
                placeholder={
                  activeTab === "tutor" 
                    ? "Ask any question about your studies..." 
                    : activeTab === "notes" 
                      ? "Enter a topic to generate study notes..." 
                      : "Enter a subject for practice questions..."
                }
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="pr-20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={handleSendMessage}
                disabled={!chatInput}
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <Button variant="outline" size="sm" className="rounded-full bg-muted/50" onClick={() => setChatInput("Explain the concept of photosynthesis")}>
                Explain photosynthesis
              </Button>
              <Button variant="outline" size="sm" className="rounded-full bg-muted/50" onClick={() => setChatInput("How do I solve quadratic equations?")}>
                Solve quadratic equations
              </Button>
              <Button variant="outline" size="sm" className="rounded-full bg-muted/50" onClick={() => setChatInput("What are the key themes in Hamlet?")}>
                Themes in Hamlet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card shadow-subtle animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <PenSquareIcon className="mr-2 h-4 w-4 text-blue-500" />
              Personalized Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">Physics Problem Set</h3>
                <Badge variant="outline">Generated</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Based on your recent study sessions
              </p>
              <Button className="w-full mt-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                View Assignment
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card shadow-subtle animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <NotebookIcon className="mr-2 h-4 w-4 text-blue-500" />
              Smart Study Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">Calculus Derivatives</h3>
                <Badge variant="outline">Saved</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Comprehensive notes with examples
              </p>
              <Button className="w-full mt-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                View Notes
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card shadow-subtle animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <BrainIcon className="mr-2 h-4 w-4 text-blue-500" />
              Learning Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">Learning Progress Report</h3>
                <Badge variant="outline">Updated</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                AI analysis of your study patterns
              </p>
              <Button className="w-full mt-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                View Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// These components are used within the AILearning component
const PlusIcon = (props) => (
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
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const ChartIcon = (props) => (
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
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </svg>
);

const ThumbsUpIcon = (props) => (
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
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

const RefreshCcwIcon = (props) => (
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
    <path d="M3 2v6h6" />
    <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
    <path d="M21 22v-6h-6" />
    <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
  </svg>
);

export default AILearning;
