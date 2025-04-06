
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Camera, Pause, Play, X } from "lucide-react";

const WebcamTracker = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [attentionScore, setAttentionScore] = useState(85);
  const [webcamAvailable, setWebcamAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if webcam is available
    const checkWebcam = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasWebcam = devices.some(device => device.kind === 'videoinput');
        setWebcamAvailable(hasWebcam);
      } catch (error) {
        console.error("Error checking for webcam:", error);
        setWebcamAvailable(false);
      }
    };

    checkWebcam();
  }, []);

  const startWebcam = async () => {
    if (!videoRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsTracking(true);
      
      // Simulate changing attention score over time
      const interval = setInterval(() => {
        setAttentionScore(prev => {
          // Random fluctuation between -5 and +5
          const change = Math.floor(Math.random() * 11) - 5;
          // Keep within 50-100 range
          return Math.min(100, Math.max(50, prev + change));
        });
      }, 3000);

      return () => clearInterval(interval);
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setWebcamAvailable(false);
    }
  };

  const stopWebcam = () => {
    if (!videoRef.current?.srcObject) return;
    
    const stream = videoRef.current.srcObject as MediaStream;
    const tracks = stream.getTracks();
    
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
    setIsTracking(false);
  };

  const toggleTracking = () => {
    if (isTracking) {
      stopWebcam();
    } else {
      startWebcam();
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">Attention Tracking</CardTitle>
        <div className="flex items-center gap-2">
          {isTracking && (
            <div className="flex items-center gap-1 text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Tracking
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {webcamAvailable === false ? (
          <div className="text-center py-6 text-gray-500">
            <Camera className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="mb-2">Webcam not available</p>
            <p className="text-sm text-gray-400">
              Please check your camera permissions or connect a webcam to use attention tracking.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative bg-black rounded-md overflow-hidden aspect-video">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`w-full h-full object-cover ${!isTracking ? 'hidden' : ''}`}
              ></video>
              
              {!isTracking && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-16 w-16 text-gray-500 opacity-30" />
                </div>
              )}
              
              {isTracking && (
                <div className="absolute top-2 right-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 w-8 p-0 rounded-full bg-white/20 hover:bg-white/30 border-white/40"
                    onClick={stopWebcam}
                  >
                    <X className="h-4 w-4 text-white" />
                  </Button>
                </div>
              )}
            </div>
            
            {isTracking && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Attention Score</span>
                  <span 
                    className={`text-sm font-medium ${
                      attentionScore > 80 ? 'text-green-600' : 
                      attentionScore > 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}
                  >
                    {attentionScore}%
                  </span>
                </div>
                <Progress 
                  value={attentionScore} 
                  className={`h-2 ${
                    attentionScore > 80 ? 'bg-green-500' : 
                    attentionScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <Button
          onClick={toggleTracking}
          disabled={webcamAvailable === false}
          className={`w-full ${isTracking ? 'bg-amber-500 hover:bg-amber-600' : 'bg-eduBlue hover:bg-eduBlue-dark'}`}
        >
          {isTracking ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause Tracking
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Start Tracking
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WebcamTracker;
