import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import { Bell, MessageSquare, Search, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { currentUser } from "../../data/mockData";

const Header = () => {
  const handleLogout = useAuthStore((state) => state.handleLogout);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/home" className="flex items-center space-x-2 mr-6">
            <span className="bg-gradient-to-r from-eduBlue to-eduPurple text-transparent bg-clip-text font-bold text-xl">
              EduGuide
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-eduBlue text-white font-medium">
              AI
            </span>
          </Link>

          <div className="hidden md:flex relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search subjects, assignments..."
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-eduBlue w-full"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                  <AvatarFallback>
                    {currentUser.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span onClick={handleLogout}>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
