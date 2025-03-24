
import React from "react";
import { cn } from "@/lib/utils";
import { MenuIcon, BellIcon, ArrowRightCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between h-16 px-4 md:px-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-2"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex items-center">
          <span className="hidden sm:inline">StudyWatcher</span>
          <span className="inline sm:hidden">SW</span>
          <span className="ml-1 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
            AI
          </span>
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 transition-transform hover:scale-105">
            <AvatarImage src="/placeholder.svg" alt="Student" />
            <AvatarFallback className="bg-blue-100 text-blue-800">SW</AvatarFallback>
          </Avatar>
          {!isMobile && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">Arijit Ghosal</span>
              <span className="text-xs text-muted-foreground">Grade 12</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
