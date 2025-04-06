
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Subject } from "@/models/types";
import { Clock, BookOpen, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Map of subject names to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  calculator: Clock,
  atom: BookOpen,
  "book-open": BookOpen,
  code: FileText,
  landmark: BookOpen,
  flask: BookOpen,
};

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  // Get the icon component or default to BookOpen
  const IconComponent = iconMap[subject.icon] || BookOpen;

  return (
    <Link to={`/subjects/${subject.id}`}>
      <Card className="hover-scale overflow-hidden border border-gray-200 hover:shadow-md">
        <CardContent className="p-0">
          <div
            className="px-6 py-5 flex items-start gap-4"
            style={{ backgroundColor: `${subject.color}15` }}
          >
            <div
              className={cn(
                "p-3 rounded-lg",
                "flex items-center justify-center"
              )}
              style={{ backgroundColor: subject.color }}
            >
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{subject.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {subject.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Progress</span>
              <span className="text-sm font-medium">{subject.progress}%</span>
            </div>
            <Progress value={subject.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SubjectCard;
