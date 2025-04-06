
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Check, Clock } from "lucide-react";
import { assignments } from "@/data/mockData";
import { Link } from "react-router-dom";

const AssignmentList = () => {
  const pendingAssignments = assignments.filter(
    (assignment) => assignment.status === "pending"
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Upcoming Assignments</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/assignments" className="flex items-center gap-1 text-eduBlue">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {pendingAssignments.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No upcoming assignments</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {pendingAssignments.slice(0, 3).map((assignment) => {
            const dueDate = new Date(assignment.dueDate);
            const now = new Date();
            const daysLeft = Math.ceil(
              (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
            );
            const isUrgent = daysLeft <= 3;

            return (
              <div
                key={assignment.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50"
              >
                <div
                  className={`p-2 rounded-lg ${
                    isUrgent ? "bg-red-100" : "bg-blue-100"
                  }`}
                >
                  <FileText
                    className={`h-5 w-5 ${
                      isUrgent ? "text-red-500" : "text-eduBlue"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/assignments/${assignment.id}`}>
                    <h4 className="font-medium text-gray-900 truncate hover:text-eduBlue">
                      {assignment.title}
                    </h4>
                  </Link>
                  <p className="text-sm text-gray-500 truncate">
                    {assignment.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span
                    className={`text-sm font-medium ${
                      isUrgent ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {daysLeft === 0
                      ? "Due today"
                      : daysLeft === 1
                      ? "Due tomorrow"
                      : `${daysLeft} days left`}
                  </span>
                </div>
                <Link to={`/assignments/${assignment.id}`}>
                  <Button size="sm">Submit</Button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssignmentList;
