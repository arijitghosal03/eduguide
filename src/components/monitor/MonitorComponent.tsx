import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MonitorComponentProps {
  isActive: boolean;
  onFocusChange?: (focusData: { isFocused: boolean; focusPercentage: number }) => void;
}

const MonitorComponent: React.FC<MonitorComponentProps> = ({ isActive, onFocusChange }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [focusPercentage, setFocusPercentage] = useState<number>(0);
  const [focusTime, setFocusTime] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [posture, setPosture] = useState<string>('Good');
  const [status, setStatus] = useState<'idle' | 'active' | 'warning' | 'error'>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Start or stop monitoring based on isActive prop
  useEffect(() => {
    if (isActive) {
      startMonitoring();
      setStartTime(Date.now());
      setStatus('active');
    } else {
      stopMonitoring();
      setStatus('idle');
    }

    return () => {
      stopMonitoring();
    };
  }, [isActive]);

  // Update focus time every second when active
  useEffect(() => {
    let interval: number;
    
    if (isActive && startTime && !isPaused) {
      interval = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setFocusTime(elapsed);
        
        // Simulate focus detection with random changes
        // In a real app, this would use computer vision or other techniques
        if (elapsed % 10 === 0) {
          const newFocus = Math.min(100, Math.max(0, focusPercentage + (Math.random() * 20 - 10)));
          setFocusPercentage(newFocus);
          setIsFocused(newFocus > 70);
          
          // Random posture feedback
          if (Math.random() > 0.8) {
            setPosture('Leaning');
            setStatus('warning');
          } else {
            setPosture('Good');
            setStatus('active');
          }
          
          if (onFocusChange) {
            onFocusChange({ isFocused: newFocus > 70, focusPercentage: newFocus });
          }
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime, isPaused, focusPercentage]);

  const startMonitoring = async () => {
    try {
      if (!streamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
      setIsPaused(false);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setStatus('error');
    }
  };

  const stopMonitoring = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsPaused(true);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Focus Monitor</CardTitle>
          <Badge variant={isFocused ? "default" : "outline"} className={isFocused ? "bg-green-500" : ""}>
            {isFocused ? "Focused" : "Distracted"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative w-full aspect-video bg-gray-100 rounded-md overflow-hidden">
            {isActive ? (
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Camera inactive</p>
              </div>
            )}
            <div className="absolute bottom-2 right-2">
              <div className={`h-3 w-3 rounded-full ${getStatusColor()}`}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Focus Level</span>
              <span className="text-sm">{Math.round(focusPercentage)}%</span>
            </div>
            <Progress value={focusPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} />
              <span>Focus time: {formatTime(focusTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {posture === 'Good' ? (
                <CheckCircle size={16} className="text-green-500" />
              ) : (
                <AlertCircle size={16} className="text-yellow-500" />
              )}
              <span>Posture: {posture}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitorComponent;