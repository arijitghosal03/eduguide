import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Brain, 
  ClipboardList,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/dashboard/Header';
import { currentUser } from "@/data/mockData";
import SubjectLearn    from './SubjectLearn';
import SubjectRevise   from './SubjectRevise';
import SubjectAssignments from './SubjectAssignments';

const Subject = () => {
  const { subjectId = 'mathematics' } = useParams();
  const [activeTab, setActiveTab] = useState<string>('learn');
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-1 overflow-y-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="mr-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Subjects
          </Button>
          
          <h1 className="text-2xl font-bold capitalize">{subjectId}</h1>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="learn" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="revise" className="flex items-center">
              <Brain className="mr-2 h-4 w-4" />
              Revise
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center">
              <ClipboardList className="mr-2 h-4 w-4" />
              Assignments
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="learn">
            <SubjectLearn subjectId={subjectId} />
          </TabsContent>
          
          <TabsContent value="revise">
            <SubjectRevise subjectId={subjectId} />
          </TabsContent>
          
          <TabsContent value="assignments">
            <SubjectAssignments subjectId={subjectId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Subject;