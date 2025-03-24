
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LiveSessionMonitorProps {
  isActive?: boolean;
}

export const LiveSessionMonitor = ({ isActive = false }: LiveSessionMonitorProps) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [monitoringStatus, setMonitoringStatus] = useState<'inactive' | 'ready' | 'monitoring' | 'paused'>('inactive');
  const [studentPresent, setStudentPresent] = useState(true);
  const [attentionScore, setAttentionScore] = useState(85);
  
  const activateCamera = () => {
    setCameraActive(true);
    setMonitoringStatus('ready');
    toast.info("Camera activated", {
      description: "Face detection is ready to begin monitoring"
    });
    
    // In a real application, we'd connect to the camera here
    // and start the face/attention detection algorithms
  };
  
  const startMonitoring = () => {
    setMonitoringStatus('monitoring');
    
    // Simulate monitoring with random student presence checks
    const monitoringInterval = setInterval(() => {
      // Randomly change student presence status (for demo purposes)
      if (Math.random() > 0.8) {
        const present = Math.random() > 0.3;
        setStudentPresent(present);
        
        if (!present) {
          toast.warning("Student absence detected", {
            description: "The system has detected that you're not at your desk"
          });
        }
      }
      
      // Randomly adjust attention score (for demo purposes)
      setAttentionScore(prev => {
        const newScore = prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5);
        return Math.min(100, Math.max(50, newScore));
      });
    }, 10000);
    
    // Clean up interval (in a real component, we'd use useEffect for cleanup)
    return () => clearInterval(monitoringInterval);
  };
  
  return (
    <div className="relative w-full h-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
      {!cameraActive ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-blue-500/20 animate-pulse [animation-delay:300ms]"></div>
              <div className="absolute inset-4 rounded-full bg-blue-500/30 animate-pulse [animation-delay:600ms]"></div>
              <div className="absolute inset-6 rounded-full bg-blue-500/40 animate-pulse [animation-delay:900ms]"></div>
              <div className="absolute inset-8 rounded-full bg-blue-500/60 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></div>
              </div>
            </div>
            <p className="font-medium">Camera access needed</p>
            <p className="text-sm text-muted-foreground mt-1">Click to start monitoring your study session</p>
            <Button 
              className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              onClick={activateCamera}
            >
              Activate Camera
            </Button>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
          {/* This would be a real camera feed in a production app */}
          <div className="relative w-full h-full">
            {/* Simulated camera feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gray-600 relative">
                {/* Simulated face outline */}
                <div className={`absolute inset-0 rounded-full border-2 ${studentPresent ? 'border-green-400' : 'border-red-400'} animate-pulse`}></div>
                {/* Simulated eyes */}
                <div className="absolute top-1/3 left-1/4 w-4 h-2 rounded-full bg-gray-400"></div>
                <div className="absolute top-1/3 right-1/4 w-4 h-2 rounded-full bg-gray-400"></div>
                {/* Simulated mouth */}
                <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-gray-400"></div>
              </div>
            </div>
            
            {/* Monitoring metrics overlay */}
            <div className="absolute top-2 right-2 left-2 flex items-center gap-2">
              <Card className="bg-white/70 dark:bg-black/50 backdrop-blur-sm border-white/20 p-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className={`h-2 w-2 rounded-full ${studentPresent ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>{studentPresent ? 'Present' : 'Absent'}</span>
                </div>
              </Card>
              
              <Card className="bg-white/70 dark:bg-black/50 backdrop-blur-sm border-white/20 p-2 text-xs flex-1">
                <div>
                  <span>Attention: </span>
                  <span className={`font-medium
                    ${attentionScore > 80 ? 'text-green-600 dark:text-green-400' : ''}
                    ${attentionScore > 60 && attentionScore <= 80 ? 'text-amber-600 dark:text-amber-400' : ''}
                    ${attentionScore <= 60 ? 'text-red-600 dark:text-red-400' : ''}
                  `}>{attentionScore}%</span>
                </div>
              </Card>
            </div>
            
            {/* Status and focus tips */}
            {monitoringStatus === 'ready' && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gray-900 to-transparent p-4 text-center">
                <p className="text-white font-medium mb-2">Camera is ready</p>
                <Button 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  onClick={startMonitoring}
                >
                  Start Monitoring
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom status bar */}
      <div className="absolute bottom-2 left-2 right-2">
        <Card className="bg-white/70 dark:bg-black/50 backdrop-blur-sm border-white/20 p-2 text-xs flex justify-between">
          <div>Monitoring: <span className="font-medium">
            {monitoringStatus === 'inactive' && 'Inactive'}
            {monitoringStatus === 'ready' && 'Ready'}
            {monitoringStatus === 'monitoring' && 'Active'}
            {monitoringStatus === 'paused' && 'Paused'}
          </span></div>
          <div className="flex items-center gap-1">
            <div className={`h-2 w-2 rounded-full 
              ${monitoringStatus === 'inactive' && 'bg-gray-500'}
              ${monitoringStatus === 'ready' && 'bg-amber-500'}
              ${monitoringStatus === 'monitoring' && 'bg-green-500'}
              ${monitoringStatus === 'paused' && 'bg-amber-500'}
            `}></div>
            <span>{monitoringStatus === 'monitoring' ? 'Tracking' : 'Ready'}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
