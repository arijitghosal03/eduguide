import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, CheckCircle, Sparkles, X, ArrowRight, Lightbulb, FileQuestion } from 'lucide-react';
import MonitorComponent from '@/components/monitor/MonitorComponent';

interface RevisePageProps {
  subjectId: string;
}

// Mock topics for mathematics
const mathTopics = [
  {
    id: 1,
    name: 'Algebra',
    mastery: 75,
    subtopics: ['Equations', 'Functions', 'Polynomials']
  },
  {
    id: 2,
    name: 'Calculus',
    mastery: 45,
    subtopics: ['Limits', 'Derivatives', 'Integrals']
  },
  {
    id: 3,
    name: 'Geometry',
    mastery: 60,
    subtopics: ['Triangles', 'Circles', 'Coordinate Geometry']
  },
  {
    id: 4,
    name: 'Probability',
    mastery: 30,
    subtopics: ['Basic Probability', 'Distributions', 'Combinations']
  }
];

// Mock flashcards
const flashcards = [
  {
    id: 1,
    question: 'What is the derivative of f(x) = x²?',
    answer: 'f\'(x) = 2x',
    topic: 'Calculus',
    difficulty: 'Medium'
  },
  {
    id: 2,
    question: 'What is the formula for the area of a circle?',
    answer: 'A = πr²',
    topic: 'Geometry',
    difficulty: 'Easy'
  },
  {
    id: 3,
    question: 'Solve for x: 2x + 5 = 13',
    answer: 'x = 4',
    topic: 'Algebra',
    difficulty: 'Easy'
  },
  {
    id: 4,
    question: 'What is the probability of rolling a 6 on a standard die?',
    answer: '1/6',
    topic: 'Probability',
    difficulty: 'Easy'
  }
];

// Mock quizzes
const quizzes = [
  {
    id: 1,
    title: 'Algebra Fundamentals',
    questions: 10,
    timeLimit: '15 min',
    difficulty: 'Medium',
    lastScore: 80
  },
  {
    id: 2,
    title: 'Calculus Concepts',
    questions: 15,
    timeLimit: '25 min',
    difficulty: 'Hard',
    lastScore: 65
  },
  {
    id: 3,
    title: 'Geometry Basics',
    questions: 12,
    timeLimit: '20 min',
    difficulty: 'Medium',
    lastScore: 75
  }
];

const SubjectRevise: React.FC<RevisePageProps> = ({ subjectId }) => {
  const [selectedTopic, setSelectedTopic] = useState<any>(mathTopics[0]);
  const [activeRevisionType, setActiveRevisionType] = useState<string>('flashcards');
  const [currentCard, setCurrentCard] = useState<any>(flashcards[0]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  
  const handleTopicSelect = (topic: any) => {
    setSelectedTopic(topic);
  };
  
  const handleStartRevision = (type: string) => {
    setActiveRevisionType(type);
    setIsMonitoring(true);
    
    if (type === 'flashcards') {
      setCurrentCard(flashcards[0]);
      setShowAnswer(false);
    }
  };
  
  const handleNextCard = () => {
    const currentIndex = flashcards.findIndex(card => card.id === currentCard.id);
    const nextIndex = (currentIndex + 1) % flashcards.length;
    setCurrentCard(flashcards[nextIndex]);
    setShowAnswer(false);
  };
  
  const handleFocusChange = (focusData: { isFocused: boolean; focusPercentage: number }) => {
    console.log('Focus data:', focusData);
    // Here you could implement logic to save focus metrics to a backend
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Revision content area */}
      <div className="md:col-span-2 space-y-6">
        {activeRevisionType === 'flashcards' ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Flashcards</CardTitle>
              <CardDescription>
                Test your knowledge with these flashcards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-between items-center">
                <Badge>{currentCard.topic}</Badge>
                <Badge variant="outline">{currentCard.difficulty}</Badge>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 min-h-64 flex flex-col items-center justify-center text-center">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Question:</h3>
                  <p className="text-xl">{currentCard.question}</p>
                </div>
                
                {showAnswer ? (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Answer:</h3>
                    <p className="text-xl text-green-600">{currentCard.answer}</p>
                  </div>
                ) : (
                  <Button onClick={() => setShowAnswer(true)}>
                    <Lightbulb size={16} className="mr-2" />
                    Show Answer
                  </Button>
                )}
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  setActiveRevisionType('');
                  setIsMonitoring(false);
                }}>
                  <X size={16} className="mr-2" />
                  End Session
                </Button>
                <Button onClick={handleNextCard}>
                  Next Card
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : activeRevisionType === 'quiz' ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Quiz</CardTitle>
              <CardDescription>
                Take a quiz to test your knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileQuestion size={48} className="mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-medium mb-2">Quiz Interface</h3>
                <p className="text-gray-500 mb-6">
                  Here would be a full quiz interface with multiple-choice questions, 
                  timing, and automatic grading.
                </p>
                <Button variant="outline" onClick={() => {
                  setActiveRevisionType('');
                  setIsMonitoring(false);
                }}>
                  <X size={16} className="mr-2" />
                  End Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Start Revising</CardTitle>
              <CardDescription>
                Choose a revision method below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleStartRevision('flashcards')}>
                  <CardContent className="p-6 text-center">
                    <Brain size={32} className="mx-auto mb-4 text-blue-500" />
                    <h3 className="text-lg font-medium mb-2">Flashcards</h3>
                    <p className="text-gray-500">
                      Quick recall practice with question and answer cards
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleStartRevision('quiz')}>
                  <CardContent className="p-6 text-center">
                    <FileQuestion size={32} className="mx-auto mb-4 text-purple-500" />
                    <h3 className="text-lg font-medium mb-2">Quizzes</h3>
                    <p className="text-gray-500">
                      Comprehensive knowledge tests with scoring and timing
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Revision Statistics */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Revision Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="text-xl font-bold">85%</div>
                  <div className="text-sm text-gray-500">Quiz Accuracy</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="text-xl font-bold">12</div>
                  <div className="text-sm text-gray-500">Sessions</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="text-xl font-bold">68</div>
                  <div className="text-sm text-gray-500">Flashcards</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="text-xl font-bold">8</div>
                  <div className="text-sm text-gray-500">Quizzes</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sidebar with topics and monitoring */}
      <div className="space-y-6">
        {/* Monitoring component */}
        <MonitorComponent 
          isActive={isMonitoring} 
          onFocusChange={handleFocusChange} 
        />
        
        {/* Topics list */}
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle>Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mathTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className={`p-3 rounded-md cursor-pointer border ${selectedTopic?.id === topic.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handleTopicSelect(topic)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{topic.name}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {topic.subtopics.map((subtopic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {subtopic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {topic.mastery >= 70 && <CheckCircle size={16} className="text-green-500 mr-1" />}
                      <span className={`text-sm ${topic.mastery >= 70 ? 'text-green-600' : topic.mastery >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {topic.mastery}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Mastery</span>
                      <span>{topic.mastery}%</span>
                    </div>
                    <Progress 
                      value={topic.mastery} 
                      className="h-1" 
                      style={{
                        background: topic.mastery >= 70 ? 'rgb(134, 239, 172)' : 
                                  topic.mastery >= 40 ? 'rgb(253, 230, 138)' : 
                                  'rgb(252, 165, 165)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Available quizzes */}
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle>Available Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quizzes.map((quiz) => (
                <div 
                  key={quiz.id}
                  className="p-3 rounded-md cursor-pointer border border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                  onClick={() => handleStartRevision('quiz')}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{quiz.title}</p>
                      <p className="text-sm text-gray-500">
                        {quiz.questions} questions • {quiz.timeLimit}
                      </p>
                    </div>
                    <Badge 
                      variant={quiz.difficulty === 'Easy' ? 'outline' : 
                              quiz.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                    >
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  {quiz.lastScore && (
                    <div className="mt-2 flex items-center text-sm">
                      <Sparkles size={14} className="mr-1 text-yellow-500" />
                      <span>Last score: {quiz.lastScore}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubjectRevise;