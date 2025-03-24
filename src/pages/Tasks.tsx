
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon, CalendarIcon, ClockIcon, LinkIcon, MoreHorizontalIcon, BookOpenIcon, BookMarkedIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TaskItem } from "@/components/tasks/TaskItem";

interface Task {
  id: number;
  title: string;
  description?: string;
  subject: string;
  date: string;
  time?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  links?: { title: string; url: string }[];
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Watch Calculus Lecture",
      description: "Complete Chapter 5 video lecture on derivatives and take notes",
      subject: "Mathematics",
      date: "2023-08-25",
      time: "10:00 AM",
      completed: false,
      priority: "high",
      links: [
        { title: "Lecture Video", url: "https://example.com/calculus-lecture" },
        { title: "Practice Problems", url: "https://example.com/calculus-problems" }
      ]
    },
    {
      id: 2,
      title: "Read Physics Textbook",
      description: "Read Chapter 7 on Electromagnetism pages 120-135",
      subject: "Science",
      date: "2023-08-25",
      time: "2:00 PM",
      completed: false,
      priority: "medium",
      links: [
        { title: "Online Textbook", url: "https://example.com/physics-textbook" }
      ]
    },
    {
      id: 3,
      title: "Complete Programming Assignment",
      description: "Finish the Python assignment on data structures",
      subject: "Computer Science",
      date: "2023-08-26",
      completed: false,
      priority: "high"
    },
    {
      id: 4,
      title: "Attend Online Chemistry Class",
      description: "Zoom session on organic chemistry with Professor Johnson",
      subject: "Science",
      date: "2023-08-26",
      time: "11:30 AM", 
      completed: false,
      priority: "high",
      links: [
        { title: "Zoom Link", url: "https://zoom.us/j/example" }
      ]
    },
    {
      id: 5,
      title: "Submit Literature Essay",
      description: "Complete and submit analysis of 'The Great Gatsby'",
      subject: "English",
      date: "2023-08-27",
      completed: false,
      priority: "medium"
    }
  ]);
  
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    subject: "",
    date: "",
    time: "",
    priority: "medium",
    completed: false,
    links: []
  });
  
  const [newTaskLink, setNewTaskLink] = useState({ title: "", url: "" });
  
  const addTask = () => {
    if (!newTask.title || !newTask.subject || !newTask.date) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    const task: Task = {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      title: newTask.title || "",
      description: newTask.description,
      subject: newTask.subject || "",
      date: newTask.date || "",
      time: newTask.time,
      completed: false,
      priority: newTask.priority as "low" | "medium" | "high" || "medium",
      links: newTask.links
    };
    
    setTasks([...tasks, task]);
    setOpenTaskDialog(false);
    setNewTask({
      title: "",
      description: "",
      subject: "",
      date: "",
      time: "",
      priority: "medium",
      completed: false,
      links: []
    });
    
    toast.success("Task added successfully");
  };
  
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      if (!task.completed) {
        toast.success("Task marked as complete", {
          description: `"${task.title}" completed`
        });
      }
    }
  };
  
  const deleteTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    
    if (task) {
      toast.info("Task deleted", {
        description: `"${task.title}" has been removed`
      });
    }
  };
  
  const addTaskLink = () => {
    if (!newTaskLink.title || !newTaskLink.url) return;
    
    setNewTask({
      ...newTask,
      links: [...(newTask.links || []), newTaskLink]
    });
    
    setNewTaskLink({ title: "", url: "" });
  };
  
  const removeTaskLink = (index: number) => {
    setNewTask({
      ...newTask,
      links: newTask.links?.filter((_, i) => i !== index)
    });
  };
  
  const todayTasks = tasks.filter(task => task.date === "2023-08-25");
  const upcomingTasks = tasks.filter(task => task.date !== "2023-08-25");
  const completedTasks = tasks.filter(task => task.completed);
  
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your educational activities and assignments
          </p>
        </div>
        
        <Dialog open={openTaskDialog} onOpenChange={setOpenTaskDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <PlusIcon className="mr-1 h-4 w-4" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new educational task or assignment
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="flex-1 max-h-[60vh] pr-4">
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title" className="required">Task Title</Label>
                  <Input 
                    id="task-title" 
                    placeholder="Enter task title" 
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="task-description">Description</Label>
                  <Textarea 
                    id="task-description" 
                    placeholder="Enter task details" 
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-subject" className="required">Subject</Label>
                    <Select 
                      value={newTask.subject} 
                      onValueChange={(value) => setNewTask({...newTask, subject: value})}
                    >
                      <SelectTrigger id="task-subject">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="task-priority">Priority</Label>
                    <Select 
                      defaultValue="medium"
                      value={newTask.priority as string} 
                      onValueChange={(value) => setNewTask({...newTask, priority: value as "low" | "medium" | "high"})}
                    >
                      <SelectTrigger id="task-priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-date" className="required">Date</Label>
                    <div className="relative">
                      <Input 
                        id="task-date" 
                        type="date" 
                        value={newTask.date}
                        onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                      />
                      <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="task-time">Time (optional)</Label>
                    <div className="relative">
                      <Input 
                        id="task-time" 
                        type="time" 
                        value={newTask.time}
                        onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                      />
                      <ClockIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Educational Links</Label>
                  
                  <Card className="border-dashed">
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-5 gap-2">
                        <div className="col-span-2">
                          <Input 
                            placeholder="Link Title" 
                            value={newTaskLink.title}
                            onChange={(e) => setNewTaskLink({...newTaskLink, title: e.target.value})}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input 
                            placeholder="URL" 
                            value={newTaskLink.url}
                            onChange={(e) => setNewTaskLink({...newTaskLink, url: e.target.value})}
                          />
                        </div>
                        <Button 
                          onClick={addTaskLink} 
                          variant="outline" 
                          size="icon" 
                          className="col-span-1"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {newTask.links && newTask.links.length > 0 && (
                        <div className="space-y-2 mt-2">
                          {newTask.links.map((link, index) => (
                            <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                              <div className="flex items-center">
                                <LinkIcon className="h-4 w-4 mr-2 text-blue-500" />
                                <span className="text-sm font-medium">{link.title}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeTaskLink(index)}
                                className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="ai-suggestions" />
                  <Label htmlFor="ai-suggestions">Enable AI study suggestions for this task</Label>
                </div>
              </div>
            </ScrollArea>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
              <Button onClick={addTask} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="today" className="w-full">
        <TabsList>
          <TabsTrigger value="today" className="relative">
            Today
            {todayTasks.length > 0 && (
              <Badge className="ml-2 bg-blue-500">{todayTasks.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="relative">
            Upcoming
            {upcomingTasks.length > 0 && (
              <Badge className="ml-2 bg-blue-500">{upcomingTasks.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" className="relative">
            Completed
            {completedTasks.length > 0 && (
              <Badge className="ml-2 bg-green-500">{completedTasks.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="mt-6">
          <Card className="glass-card shadow-subtle">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Today's Tasks</CardTitle>
              <CardDescription>
                Educational tasks scheduled for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpenIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
                  <p>No tasks scheduled for today</p>
                  <Button variant="link" onClick={() => setOpenTaskDialog(true)} className="mt-2">
                    Add a task
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {todayTasks.map(task => (
                    <TaskItem 
                      key={task.id}
                      task={task}
                      onToggleComplete={() => toggleTaskCompletion(task.id)}
                      onDelete={() => deleteTask(task.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          <Card className="glass-card shadow-subtle">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Upcoming Tasks</CardTitle>
              <CardDescription>
                Tasks scheduled for future dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
                  <p>No upcoming tasks scheduled</p>
                  <Button variant="link" onClick={() => setOpenTaskDialog(true)} className="mt-2">
                    Add a task
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {upcomingTasks.map(task => (
                    <TaskItem 
                      key={task.id}
                      task={task}
                      onToggleComplete={() => toggleTaskCompletion(task.id)}
                      onDelete={() => deleteTask(task.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <Card className="glass-card shadow-subtle">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Completed Tasks</CardTitle>
              <CardDescription>
                Tasks you've already completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              {completedTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
                  <p>No completed tasks yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {completedTasks.map(task => (
                    <TaskItem 
                      key={task.id}
                      task={task}
                      onToggleComplete={() => toggleTaskCompletion(task.id)}
                      onDelete={() => deleteTask(task.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;
