import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, FileText, AlertTriangle, Check, Calendar as CalendarIcon, Upload } from 'lucide-react';
import MonitorComponent from '@/components/monitor/MonitorComponent';

interface AssignmentsPageProps {
  subjectId: string;
}

// Mock assignment data
const assignments = {
  upcoming: [
    {
      id: 1,
      title: 'Calculus Problem Set',
      dueDate: '2025-04-15T23:59:59',
      topics: ['Derivatives', 'Integrals'],
      difficulty: 'Hard',
      estimatedTime: '2 hours',
      instructions: 'Complete problems 1-10 in Chapter 5. Show all your work and explain your reasoning.',
      status: 'not_started'
    },
    {
      id: 2,
      title: 'Algebra Quiz',
      dueDate: '2025-04-10T16:30:00',
      topics: ['Functions', 'Equations'],
      difficulty: 'Medium',
      estimatedTime: '45 minutes',
      instructions: 'Complete the online quiz. You will have one attempt only.',
      status: 'in_progress'
    },
    {
      id: 3,
      title: 'Geometry Proofs',
      dueDate: '2025-04-22T23:59:59',
      topics: ['Triangles', 'Circles'],
      difficulty: 'Medium',
      estimatedTime: '1.5 hours',
      instructions: 'Complete the 5 proofs provided and submit your work as a PDF.',
      status: 'not_started'
    }
  ],
  completed: [
    {
      id: 4,
      title: 'Probability Exercise',
      completedDate: '2025-04-02',
      topics: ['Basic Probability', 'Combinations'],
      difficulty: 'Easy',
      grade: 'A',
      score: 92,
      feedback: 'Excellent work! Your explanation of the birthday paradox was particularly insightful.'
    },
    {
      id: 5,
      title: 'Algebra Midterm',
      completedDate: '2025-03-28',
      topics: ['Equations', 'Polynomials', 'Functions'],
      difficulty: 'Hard',
      grade: 'B+',
      score: 88,
      feedback: 'Good job overall. Review the concept of function composition for future assignments.'
    }
  ]
};

// Utility function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};

// Utility function to calculate days remaining
const getDaysRemaining = (dueDate: string): number => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const SubjectAssignments: React.FC<AssignmentsPageProps> = ({ subjectId }) => {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(assignments.upcoming[0]);
  const [assignmentTab, setAssignmentTab] = useState<string>('upcoming');
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  const [workingOnAssignment, setWorkingOnAssignment] = useState<boolean>(false);
  
  const handleSelectAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
  };
  
  const handleStartWork = () => {
    setWorkingOnAssignment(true);
    setIsMonitoring(true);
  };
  
  const handleStopWork = () => {
    setWorkingOnAssignment(false);
    setIsMonitoring(false);
  };
  
  const handleFocusChange = (focusData: { isFocused: boolean; focusPercentage: number }) => {
    console.log('Focus data:', focusData);
    // Here you could implement logic to save focus metrics to a backend
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'not_started': return 'Not Started';
      case 'in_progress': return 'In Progress';
      default: return status;
    }
  };
  
  const getGradeColor = (grade: string) => {
    const firstChar = grade.charAt(0);
    switch (firstChar) {
      case 'A': return 'text-green-600';
      case 'B': return 'text-blue-600';
      case 'C': return 'text-yellow-600';
      case 'D': return 'text-orange-600';
      case 'F': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Assignment details section */}
      <div className="md:col-span-2 space-y-6">
        {/* Selected assignment detail */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedAssignment.title}</CardTitle>
                <CardDescription>
                  {selectedAssignment.dueDate ? 
                    `Due ${formatDate(selectedAssignment.dueDate)}` : 
                    `Completed ${selectedAssignment.completedDate}`}
                </CardDescription>
              </div>
              {selectedAssignment.dueDate ? (
                <Badge 
                  className={`${getStatusColor(selectedAssignment.status)}`}
                >
                  {getStatusText(selectedAssignment.status)}
                </Badge>
              ) : (
                <div className="text-right">
                  <div className={`text-lg font-bold ${getGradeColor(selectedAssignment.grade)}`}>
                    {selectedAssignment.grade} ({selectedAssignment.score}%)
                  </div>
                  <div className="text-xs text-gray-500">Final Grade</div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedAssignment.dueDate ? (
              <>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Due Date</div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-blue-500" />
                      <span>{formatDate(selectedAssignment.dueDate)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Estimated Time</div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-blue-500" />
                      <span>{selectedAssignment.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-gray-500">Topics</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedAssignment.topics.map((topic: string, idx: number) => (
                      <Badge key={idx} variant="outline">{topic}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-gray-500">Instructions</div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>{selectedAssignment.instructions}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Difficulty</div>
                  <Badge 
                    className={`${getDifficultyColor(selectedAssignment.difficulty)}`}
                  >
                    {selectedAssignment.difficulty}
                  </Badge>
                </div>
                
                {workingOnAssignment ? (
                  <div className="mt-6 space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="text-lg font-medium mb-4">Assignment Workspace</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                        <FileText className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">
                          This is where the assignment content would be displayed
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handleStopWork}>
                        Save Progress
                      </Button>
                      <Button variant="default">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Assignment
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6">
                    <Button onClick={handleStartWork}>
                      Start Working
                    </Button>
                    {getDaysRemaining(selectedAssignment.dueDate) <= 3 && (
                      <div className="flex items-center text-amber-600 mt-4">
                        <AlertTriangle size={16} className="mr-2" />
                        <span className="text-sm">
                          Due soon - only {getDaysRemaining(selectedAssignment.dueDate)} days left!
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Completed Date</div>
                    <div className="flex items-center">
                      <Check size={16} className="mr-2 text-green-500" />
                      <span>{selectedAssignment.completedDate}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Grade</div>
                    <div className={`text-lg font-bold ${getGradeColor(selectedAssignment.grade)}`}>
                      {selectedAssignment.grade} ({selectedAssignment.score}%)
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-gray-500">Topics</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedAssignment.topics.map((topic: string, idx: number) => (
                      <Badge key={idx} variant="outline">{topic}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-gray-500">Teacher Feedback</div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>{selectedAssignment.feedback}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline">
                    View Submission
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        {/* Progress overview */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Assignment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="text-xl font-bold">3</div>
                  <div className="text-sm text-gray-500">Pending</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="text-xl font-bold">5</div>
                  <div className="text-sm text-gray-500">Completed</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="text-xl font-bold">B+</div>
                  <div className="text-sm text-gray-500">Avg Grade</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="text-xl font-bold">87%</div>
                  <div className="text-sm text-gray-500">Avg Score</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sidebar with list and monitoring */}
      <div className="space-y-6">
        {/* Monitoring component */}
        <MonitorComponent 
          isActive={isMonitoring} 
          onFocusChange={handleFocusChange} 
        />
        
        {/* Assignment list */}
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={assignmentTab} onValueChange={setAssignmentTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="upcoming">
                  <CalendarIcon size={16} className="mr-2" />
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="completed">
                  <Check size={16} className="mr-2" />
                  Completed
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="m-0">
                <div className="space-y-2">
                  {assignments.upcoming.map((assignment) => (
                    <div 
                      key={assignment.id}
                      className={`p-3 rounded-md cursor-pointer hover:bg-gray-100 ${selectedAssignment.id === assignment.id ? 'bg-blue-50 border border-blue-200' : ''}`}
                      onClick={() => handleSelectAssignment(assignment)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{assignment.title}</div>
                        <Badge 
                          className={`${getStatusColor(assignment.status)}`}
                        >
                          {getStatusText(assignment.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar size={14} className="mr-1" />
                        <span>Due {formatDate(assignment.dueDate)}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Badge 
                          className={`${getDifficultyColor(assignment.difficulty)} text-xs`}
                        >
                          {assignment.difficulty}
                        </Badge>
                        {getDaysRemaining(assignment.dueDate) <= 3 && (
                          <span className="ml-2 text-xs text-amber-600 flex items-center">
                            <AlertTriangle size={12} className="mr-1" />
                            {getDaysRemaining(assignment.dueDate)} days left
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="m-0">
                <div className="space-y-2">
                  {assignments.completed.map((assignment) => (
                    <div 
                      key={assignment.id}
                      className={`p-3 rounded-md cursor-pointer hover:bg-gray-100 ${selectedAssignment.id === assignment.id ? 'bg-blue-50 border border-blue-200' : ''}`}
                      onClick={() => handleSelectAssignment(assignment)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{assignment.title}</div>
                        <div className={`font-bold ${getGradeColor(assignment.grade)}`}>
                          {assignment.grade}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Check size={14} className="mr-1 text-green-500" />
                        <span>Completed {assignment.completedDate}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Badge 
                          className={`${getDifficultyColor(assignment.difficulty)} text-xs`}
                        >
                          {assignment.difficulty}
                        </Badge>
                        <span className="ml-2 text-xs text-gray-500">
                          Score: {assignment.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default  SubjectAssignments;