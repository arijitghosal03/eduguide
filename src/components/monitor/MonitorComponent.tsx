import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import * as faceapi from 'face-api.js';

interface MonitorComponentProps {
  isActive: boolean;
  onFocusChange?: (focusData: { isFocused: boolean; focusPercentage: number }) => void;
}

const MonitorComponent: React.FC<MonitorComponentProps> = ({ isActive, onFocusChange }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [focusPercentage, setFocusPercentage] = useState<number>(0);
  const [focusTime, setFocusTime] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [posture, setPosture] = useState<string>('Good');
  const [status, setStatus] = useState<'idle' | 'active' | 'warning' | 'error'>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);
  const [faceDetected, setFaceDetected] = useState<boolean>(false);

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      try {
        // Update these paths to where you host the models
        const MODEL_URL = '/models';
        
        // Load required models
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        
        console.log('Face detection models loaded');
        setIsModelLoaded(true);
      } catch (error) {
        console.error('Error loading face detection models:', error);
        setStatus('error');
      }
    };
    
    loadModels();
  }, []);

  // Start or stop monitoring based on isActive prop
  useEffect(() => {
    if (isActive && isModelLoaded) {
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
  }, [isActive, isModelLoaded]);

  // Face detection function
  const detectFaces = async () => {
    if (!videoRef.current || !canvasRef.current || !isModelLoaded || !isActive) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Detect faces
    const detections = await faceapi.detectAllFaces(
      video, 
      new faceapi.TinyFaceDetectorOptions({ inputSize: 320 })
    ).withFaceLandmarks();
    
    // Clear previous drawings
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Check if any faces are detected
    const faceFound = detections.length > 0;
    setFaceDetected(faceFound);
    
    // Draw face boundary boxes
    if (faceFound) {
      // Draw ideal face position box (center of frame)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const idealBoxSize = Math.min(canvas.width, canvas.height) * 0.4;
      
      // Draw ideal position box
      ctx.strokeStyle = '#3366FF';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(
        centerX - idealBoxSize/2,
        centerY - idealBoxSize/2,
        idealBoxSize,
        idealBoxSize
      );
      ctx.setLineDash([]);
      
      // Draw detected face boxes
      detections.forEach(detection => {
        const box = detection.detection.box;
        
        // Check if face is in the ideal position
        const faceX = box.x + box.width/2;
        const faceY = box.y + box.height/2;
        const inPosition = 
          Math.abs(faceX - centerX) < idealBoxSize/3 && 
          Math.abs(faceY - centerY) < idealBoxSize/3;
        
        // Draw box around detected face
        ctx.strokeStyle = inPosition ? '#00FF00' : '#FF0000';
        ctx.lineWidth = 3;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
        
        // Update focus status based on face position
        if (inPosition) {
          setFocusPercentage(prev => Math.min(100, prev + 2));
          setIsFocused(true);
        } else {
          setFocusPercentage(prev => Math.max(30, prev - 1));
          setIsFocused(focusPercentage > 70);
        }
        
        // Update posture based on face landmarks
        const landmarks = detection.landmarks;
        const nose = landmarks.getNose();
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        
        // Simple posture check (can be enhanced)
        if (nose.length > 0 && leftEye.length > 0 && rightEye.length > 0) {
          const eyeLevel = (leftEye[0].y + rightEye[0].y) / 2;
          const noseY = nose[0].y;
          
          if (Math.abs(noseY - eyeLevel) > 20) {
            setPosture('Leaning');
            setStatus('warning');
          } else {
            setPosture('Good');
            setStatus('active');
          }
        }
      });
      
      if (onFocusChange) {
        onFocusChange({ isFocused, focusPercentage });
      }
    } else {
      // No face detected
      setFocusPercentage(prev => Math.max(0, prev - 3));
      setIsFocused(false);
      
      // Draw warning box
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 3;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const boxSize = Math.min(canvas.width, canvas.height) * 0.5;
      
      ctx.strokeRect(
        centerX - boxSize/2,
        centerY - boxSize/2,
        boxSize,
        boxSize
      );
      
      // Add text
      ctx.font = '24px Arial';
      ctx.fillStyle = '#FF0000';
      ctx.textAlign = 'center';
      ctx.fillText('No Face Detected', centerX, centerY - boxSize/2 - 10);
    }
    
    // Run detection again
    if (isActive && !isPaused) {
      requestAnimationFrame(detectFaces);
    }
  };

  // Update focus time every second when active
  useEffect(() => {
    let interval: number;
    
    if (isActive && startTime && !isPaused) {
      interval = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setFocusTime(elapsed);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime, isPaused]);

  const startMonitoring = async () => {
    try {
      if (!streamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: 640, height: 480 }
        });
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          // Wait for video to start playing before detecting faces
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            // Start face detection
            detectFaces();
          };
        }
      } else if (videoRef.current) {
        videoRef.current.play();
        detectFaces();
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
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <canvas 
                  ref={canvasRef} 
                  className="absolute top-0 left-0 w-full h-full"
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Camera inactive</p>
              </div>
            )}
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${getStatusColor()}`}></div>
              {!isModelLoaded && isActive && (
                <span className="text-xs bg-black bg-opacity-50 text-white px-2 py-0.5 rounded">
                  Loading models...
                </span>
              )}
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
          <div className="flex items-center gap-2 text-sm">
            <Badge variant={faceDetected ? "default" : "destructive"}>
              {faceDetected ? "Face Detected" : "No Face Detected"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitorComponent;