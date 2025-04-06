
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { subjects } from "@/data/mockData";
import { Play, Camera, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StudySessionWidget = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].id);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  const handleStartSession = () => {
    // In a real implementation, this would start webcam monitoring
    // and begin the study session
    console.log("Starting study session for subject:", selectedSubject);
    console.log("Camera tracking enabled:", cameraEnabled);
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Start Study Session</h3>
            {cameraEnabled && (
              <span className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                <Camera className="h-3 w-3" />
                Camera Ready
              </span>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-sm text-gray-500">Select Subject</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={cameraEnabled}
                  onChange={() => setCameraEnabled(!cameraEnabled)}
                />
                <div
                  className={`block w-10 h-6 rounded-full transition-colors ${
                    cameraEnabled ? "bg-eduBlue" : "bg-gray-300"
                  }`}
                />
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    cameraEnabled ? "transform translate-x-4" : ""
                  }`}
                />
              </div>
              <span className="ml-3 text-sm">Enable attention tracking</span>
            </label>
          </div>

          {!cameraEnabled && (
            <div className="flex items-start gap-2 text-sm p-3 bg-yellow-50 text-yellow-700 rounded-md">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                Attention tracking helps monitor your focus during study sessions.
                Enable camera access for this feature.
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-4">
        <Button
          onClick={handleStartSession}
          className="w-full bg-eduGreen hover:bg-eduGreen-dark"
        >
          <Play className="mr-2 h-4 w-4" />
          Start Study Session
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudySessionWidget;
