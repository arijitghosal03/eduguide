
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  PieChart,
  Settings,
  Timer,
  User,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon, title, href, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-eduBlue/10 text-eduBlue hover:bg-eduBlue/15"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      {icon}
      <span>{title}</span>
      {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-gray-50 h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex-1 py-6 px-3 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 px-3 uppercase tracking-wider">
            Main
          </h3>
          <SidebarItem
            icon={<LayoutDashboard className="h-5 w-5" />}
            title="Home"
            href="/home"
            isActive={currentPath === "/home"}
          />    
          <SidebarItem
            icon={<LayoutDashboard className="h-5 w-5" />}
            title="Dashboard"
            href="/dashboard"
            isActive={currentPath === "/dashboard"}
          />
    
    
        </div>

        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 px-3 uppercase tracking-wider">
            Tools
          </h3>
        </div>

        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 px-3 uppercase tracking-wider">
            Account
          </h3>
          <SidebarItem
            icon={<User className="h-5 w-5" />}
            title="Profile"
            href="/profile"
            isActive={currentPath === "/profile"}
          />
          <SidebarItem
            icon={<Settings className="h-5 w-5" />}
            title="Settings"
            href="/settings"
            isActive={currentPath === "/settings"}
          />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-eduBlue/5 rounded-lg p-3">
          <h4 className="font-medium text-eduBlue mb-1">Need help?</h4>
          <p className="text-xs text-gray-600 mb-2">Contact your AI assistant anytime</p>
          <Link to="/chat" className="w-full">
            <Button size="sm" variant="default" className="w-full bg-eduBlue">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with AI
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
