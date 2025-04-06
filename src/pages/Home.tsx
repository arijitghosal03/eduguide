import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { currentUser, subjects } from "@/data/mockData";
import { useAuthStore } from "@/store/authStore";
import {
  Award,
  BarChart2,
  Bell,
  Bookmark,
  BookOpen,
  BookText,
  Brain,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  HelpCircle,
  Home as HomeIcon,
  Menu,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const { profileDetails } = useAuthStore();

  const [greeting, setGreeting] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Get appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
      setTimeOfDay("morning");
    } else if (hour < 17) {
      setGreeting("Good Afternoon");
      setTimeOfDay("afternoon");
    } else {
      setGreeting("Good Evening");
      setTimeOfDay("evening");
    }
  }, []);

  // Toggle sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Get upcoming tasks (would come from API in real app)
  const upcomingTasks = [
    {
      id: 1,
      title: "Math Assignment: Algebra",
      due: "Today",
      subject: "Mathematics",
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 2,
      title: "Read Chapter 5: Cell Biology",
      due: "Tomorrow",
      subject: "Biology",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Practice Essay Writing",
      due: "Thu, Apr 10",
      subject: "English",
      color: "bg-blue-100 text-blue-600",
    },
  ];

  // Calculate study stats (in a real app, these would come from the backend)
  const studyStats = {
    weeklyMinutes: 320,
    completedTasks: 12,
    streakDays: 5,
  };

  // Navigation items
  const navItems = [
    { icon: <HomeIcon className="h-5 w-5" />, name: "Home", path: "/" },
    { icon: <BookText className="h-5 w-5" />, name: "Tasks", path: "/tasks" },
    {
      icon: <Bookmark className="h-5 w-5" />,
      name: "Subjects",
      path: "/subjects",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      name: "Calendar",
      path: "/calendar",
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      name: "Progress",
      path: "/progress",
    },
    {
      icon: <Brain className="h-5 w-5" />,
      name: "AI Assistant",
      path: "/assistant",
    },
  ];

  // Secondary navigation items
  const secondaryNavItems = [
    {
      icon: <Settings className="h-5 w-5" />,
      name: "Settings",
      path: "/settings",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      name: "Help & Support",
      path: "/help",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 transition-all duration-300 z-20 
            ${sidebarCollapsed ? "w-20" : "w-64"} 
            ${
              mobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            } 
            fixed lg:relative h-[calc(100vh-64px)] overflow-y-auto`}
        >
          <div className="flex flex-col h-full">
            <Sidebar />

            {/* Secondary navigation */}
            <div className="mt-auto border-t border-gray-100 py-4">
              <ul className="space-y-1 px-3">
                {secondaryNavItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 group transition-colors`}
                    >
                      <div
                        className={`${
                          sidebarCollapsed ? "mx-auto" : "mr-3"
                        } text-gray-500`}
                      >
                        {item.icon}
                      </div>
                      {!sidebarCollapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collapse toggle */}
          </div>
        </aside>

        {/* Mobile sidebar backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-10 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        <div className="flex-1">
          {/* Hero Section */}
          <div
            className={`bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-8`}
          >
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  {/* Mobile menu toggle */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-1 rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  <div>
                    <h1 className="text-3xl font-bold">
                      {greeting}, {profileDetails.name}!
                    </h1>
                    <p className="opacity-90 mt-1">
                      Ready for a productive {timeOfDay}?
                    </p>
                  </div>
                </div>
                <div className="flex gap-3"></div>
              </div>
            </div>
          </div>

          <main className="max-w-6xl mx-auto px-6 py-8">
            {/* Welcome Card (dismissible) */}
            {showWelcome && (
              <Card className="mb-8 border-0 shadow-md bg-gradient-to-r from-purple-50 to-blue-50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        Welcome to EduGuide
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Here's how to make the most of your learning journey:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-indigo-100 mt-1">
                            <Clock className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Track Study Time
                            </h3>
                            <p className="text-sm text-gray-600">
                              Our focus monitoring helps you build better habits
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-purple-100 mt-1">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Complete Tasks
                            </h3>
                            <p className="text-sm text-gray-600">
                              Organized by subject to keep you on track
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-blue-100 mt-1">
                            <Brain className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Ask AI for Help
                            </h3>
                            <p className="text-sm text-gray-600">
                              Get instant answers to your questions
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowWelcome(false)}
                      className="text-gray-500"
                    >
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Upcoming Tasks Section */}
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Your Tasks</h2>
                    <Link
                      to="/tasks"
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    >
                      View all <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {upcomingTasks.map((task) => (
                      <Card
                        key={task.id}
                        className="border border-gray-200 hover:border-indigo-300 transition-colors"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${task.color}`}
                                >
                                  {task.subject}
                                </span>
                                <span className="text-sm text-gray-500">
                                  Due: {task.due}
                                </span>
                              </div>
                              <h3 className="font-medium">{task.title}</h3>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-8"
                            >
                              Start Task
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Subjects Section */}
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Your Subjects</h2>
                    <Link
                      to="/subjects"
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    >
                      All subjects <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {subjects.slice(0, 6).map((subject) => (
                      <Card
                        key={subject.id}
                        className="border border-gray-200 hover:shadow-md transition-all cursor-pointer group"
                      >
                        <Link to={`/subject/Layout`}>
                          <CardContent className="p-4">
                            <div
                              className="w-10 h-10 rounded-full mb-3 flex items-center justify-center"
                              style={{
                                backgroundColor: `${subject.color}20`,
                                color: subject.color,
                              }}
                            >
                              <Bookmark className="h-5 w-5" />
                            </div>
                            <h3 className="font-medium group-hover:text-indigo-600 transition-colors">
                              {subject.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {subject.taskCount ||
                                Math.floor(Math.random() * 5) + 1}{" "}
                              tasks
                            </p>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar Column */}
              <div className="space-y-6">
                {/* Study Stats */}
                <Card className="border-0 shadow-sm bg-gradient-to-b from-indigo-50 to-white">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-4">Your Study Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-indigo-100">
                            <Clock className="h-4 w-4 text-indigo-600" />
                          </div>
                          <span className="text-gray-700">This week</span>
                        </div>
                        <span className="font-medium">
                          {studyStats.weeklyMinutes} mins
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-green-100">
                            <BookOpen className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-gray-700">Tasks completed</span>
                        </div>
                        <span className="font-medium">
                          {studyStats.completedTasks}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-orange-100">
                            <Award className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-gray-700">Current streak</span>
                        </div>
                        <span className="font-medium">
                          {studyStats.streakDays} days
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
                      asChild
                    >
                      <Link to="/stats">View Detailed Stats</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Calendar Quick View */}
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Upcoming</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-indigo-600"
                        asChild
                      >
                        <Link to="/calendar">Full Calendar</Link>
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-3 items-start">
                        <div className="bg-red-100 text-red-600 p-2 rounded-lg text-center min-w-12">
                          <div className="text-xs font-medium">APR</div>
                          <div className="text-lg font-bold">07</div>
                        </div>
                        <div>
                          <h4 className="font-medium">Science Quiz</h4>
                          <p className="text-sm text-gray-500">Chapters 3-5</p>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start">
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg text-center min-w-12">
                          <div className="text-xs font-medium">APR</div>
                          <div className="text-lg font-bold">10</div>
                        </div>
                        <div>
                          <h4 className="font-medium">Math Assignment</h4>
                          <p className="text-sm text-gray-500">
                            Linear equations
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start">
                        <div className="bg-purple-100 text-purple-600 p-2 rounded-lg text-center min-w-12">
                          <div className="text-xs font-medium">APR</div>
                          <div className="text-lg font-bold">15</div>
                        </div>
                        <div>
                          <h4 className="font-medium">History Project</h4>
                          <p className="text-sm text-gray-500">
                            Final submission
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                        asChild
                      >
                        <Link to="/study">
                          <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                          <span>Start Study Session</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                        asChild
                      >
                        <Link to="/assistant">
                          <Brain className="h-4 w-4 mr-2 text-purple-600" />
                          <span>Ask AI Assistant</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                        asChild
                      >
                        <Link to="/create-task">
                          <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                          <span>Create New Task</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
