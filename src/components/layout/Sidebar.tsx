
import React from "react";
import { cn } from "@/lib/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboardIcon, 
  BookOpenIcon, 
  CalendarIcon, 
  BarChartIcon, 
  MessagesSquareIcon, 
  SettingsIcon,
  CheckSquareIcon,
  VideoIcon,
  BrainCircuitIcon,
  HelpCircleIcon,
  LogOutIcon,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const navItems = [
    { href: "/", label: "Dashboard", icon: <LayoutDashboardIcon className="h-5 w-5" /> },
    { href: "/study-sessions", label: "Study Sessions", icon: <BookOpenIcon className="h-5 w-5" /> },
    { href: "/tasks", label: "Tasks", icon: <CheckSquareIcon className="h-5 w-5" /> },
    { href: "/classes", label: "Online Classes", icon: <VideoIcon className="h-5 w-5" /> },
    { href: "/ai-learning", label: "AI Learning", icon: <BrainCircuitIcon className="h-5 w-5" /> },
    { href: "/schedule", label: "Schedule", icon: <CalendarIcon className="h-5 w-5" /> },
    { href: "/reports", label: "Reports", icon: <BarChartIcon className="h-5 w-5" /> },
    { href: "/messages", label: "Messages", icon: <MessagesSquareIcon className="h-5 w-5" /> },
  ];
  
  const bottomNavItems = [
    { href: "/settings", label: "Settings", icon: <SettingsIcon className="h-5 w-5" /> },
    { href: "/help", label: "Help & Support", icon: <HelpCircleIcon className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    // In a real app, we would handle actual logout logic here
    // Clear tokens, session data, etc.
    
    toast.success("Logged out successfully", {
      description: "You have been logged out of your account"
    });
    
    // Redirect to login page (for demo purposes, just go to homepage)
    navigate("/");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-border transition-transform duration-300 ease-in-out",
          isMobile && !open && "-translate-x-full",
          isMobile && open && "translate-x-0",
          !isMobile && !open && "-translate-x-full",
          !isMobile && open && "translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
              SW
            </div>
            <h2 className="ml-2 font-semibold text-lg">StudyWatcher</h2>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="px-3 pt-2">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-md">
                <BrainCircuitIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">AI Study Assistant</p>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )
                }
                onClick={() => isMobile && setOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
        
        <div className="px-3 py-4">
          <Separator className="mb-4" />
          <div className="space-y-1">
            {bottomNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )
                }
                onClick={() => isMobile && setOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOutIcon className="h-5 w-5" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
