import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Upload, Youtube, FileText, AlertCircle } from 'lucide-react';
import MonitorComponent from '@/components/monitor/MonitorComponent';

interface LearnPageProps {
  subjectId: string;
}

// Mock learning materials
const learningMaterials = [
  {
    id: 1,
    title: 'Introduction to Calculus',
    type: 'video',
    url: 'https://www.youtube.com/embed/WUvTyaaNkzM',
    duration: '45 min',
    progress: 35,
    topics: ['limits', 'derivatives']
  },
  {
    id: 2,
    title: 'Fundamentals of Algebra',
    type: 'pdf',
    url: '/docs/algebra-fundamentals.pdf',
    pages: 24,
    progress: 50,
    topics: ['equations', 'functions']
  },
  {
    id: 3,
    title: 'Geometry Essentials',
    type: 'video',
    url: 'https://www.youtube.com/embed/4L1bXkIpJPo',
    duration: '38 min',
    progress: 0,
    topics: ['shapes', 'angles', 'theorems']
  }
];

const SubjectLearn: React.FC<LearnPageProps> = ({ subjectId }) => {
  const [activeContent, setActiveContent] = useState<any>(null);
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('videos');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [viewTime, setViewTime] = useState<number>(0);
  
  // Handle content selection
  const handleContentSelect = (content: any) => {
    setActiveContent(content);  
    setIsMonitoring(true);
    setViewTime(0);
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      
      // Automatically open the first uploaded file
      if (uploadedFiles.length === 0 && !activeContent) {
        handleContentSelect({
          id: `uploaded-${Date.now()}`,
          title: newFiles[0].name,
          type: 'pdf',
          file: newFiles[0],
          progress: 0
        });
      }
    }
  };
  
  // Handle focus data from monitor
  const handleFocusChange = (focusData: { isFocused: boolean; focusPercentage: number }) => {
    console.log('Focus data:', focusData);
    // Here you could implement logic to save focus metrics to a backend
  };
  
  // Filtering materials based on active tab
  const filteredMaterials = activeTab === 'videos' 
    ? learningMaterials.filter(material => material.type === 'video')
    : learningMaterials.filter(material => material.type === 'pdf');
  
  useEffect(() => {
    // Clean up monitoring when component unmounts
    return () => {
      setIsMonitoring(false);
    };
  }, []);
  
  // Timer for tracking view time
  useEffect(() => {
    let interval: number;
    
    if (isMonitoring && activeContent) {
      interval = window.setInterval(() => {
        setViewTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring, activeContent]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Learning content section */}
      <div className="md:col-span-2 space-y-6">
        {activeContent ? (
          <Card className="w-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{activeContent.title}</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setActiveContent(null);
                    setIsMonitoring(false);
                  }}
                >
                  Close
                </Button>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span>Viewing time: {Math.floor(viewTime / 60)}:{(viewTime % 60).toString().padStart(2, '0')}</span>
              </div>
            </CardHeader>
            <CardContent>
              {activeContent.type === 'video' ? (
                <div className="aspect-video">
                  <iframe 
                    src={activeContent.url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : activeContent.type === 'pdf' && activeContent.file ? (
                <div className="bg-gray-100 p-4 rounded-md h-96 flex items-center justify-center">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto mb-2 text-blue-500" />
                    <p className="font-medium">{activeContent.file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(activeContent.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <Button className="mt-4">
                      Open PDF
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 p-4 rounded-md h-96 flex items-center justify-center">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto mb-2 text-blue-500" />
                    <p>PDF Viewer would appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Select Learning Material</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">
                Select a video or PDF from the materials list to start learning
              </p>
            </CardContent>
          </Card>
        )}
        
        {/* Progress overview */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm">35%</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-xl font-bold">12 hrs</div>
                    <div className="text-sm text-gray-500">Total study time</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-xl font-bold">78%</div>
                    <div className="text-sm text-gray-500">Average focus</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sidebar with materials and monitoring */}
      <div className="space-y-6">
        {/* Monitoring component */}
        <MonitorComponent 
          isActive={isMonitoring} 
          onFocusChange={handleFocusChange} 
        />
        
        {/* Learning materials */}
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle>Learning Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="videos">
                  <Youtube size={16} className="mr-2" />
                  Videos
                </TabsTrigger>
                <TabsTrigger value="pdfs">
                  <FileText size={16} className="mr-2" />
                  PDFs
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="videos" className="m-0">
                <div className="space-y-2">
                  {filteredMaterials.map(material => (
                    <div 
                      key={material.id}
                      className={`p-3 rounded-md cursor-pointer border ${activeContent?.id === material.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => handleContentSelect(material)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{material.title}</p>
                          <p className="text-sm text-gray-500">{material.duration}</p>
                        </div>
                        {material.progress > 0 && (
                          <Badge variant="outline" className="bg-blue-100">
                            {material.progress}%
                          </Badge>
                        )}
                      </div>
                      {material.progress > 0 && (
                        <Progress value={material.progress} className="h-1 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="pdfs" className="m-0">
                <div className="space-y-2">
                  {filteredMaterials.map(material => (
                    <div 
                      key={material.id}
                      className={`p-3 rounded-md cursor-pointer border ${activeContent?.id === material.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => handleContentSelect(material)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{material.title}</p>
                          <p className="text-sm text-gray-500">{material.pages} pages</p>
                        </div>
                        {material.progress > 0 && (
                          <Badge variant="outline" className="bg-blue-100">
                            {material.progress}%
                          </Badge>
                        )}
                      </div>
                      {material.progress > 0 && (
                        <Progress value={material.progress} className="h-1 mt-2" />
                      )}
                    </div>
                  ))}
                  
                  {uploadedFiles.map(file => (
                    <div 
                      key={file.name}
                      className={`p-3 rounded-md cursor-pointer border ${activeContent?.file?.name === file.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => handleContentSelect({
                        id: `uploaded-${file.name}`,
                        title: file.name,
                        type: 'pdf',
                        file: file,
                        progress: 0
                      })}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-green-100">
                          New
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <label htmlFor="pdf-upload">
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">Upload your own PDF</p>
                        <input 
                          id="pdf-upload" 
                          type="file" 
                          accept=".pdf" 
                          className="hidden" 
                          onChange={handleFileUpload}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubjectLearn;