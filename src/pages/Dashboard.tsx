
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import SubjectCard from "@/components/dashboard/SubjectCard";
import AssignmentList from "@/components/dashboard/AssignmentList";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import { subjects } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Track your progress and assignments
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
              <Card className="border border-gray-200 mb-6">
                <CardContent className="p-4 h-[300px]">
                  <PerformanceChart />
                </CardContent>
              </Card>
              
              <h2 className="text-xl font-semibold mb-4">Your Subjects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {subjects.slice(0, 4).map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
              <Card className="border border-gray-200 h-full">
                <CardContent className="p-4">
                  <AssignmentList />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
