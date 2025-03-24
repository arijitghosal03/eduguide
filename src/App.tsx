
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

import Dashboard from "./pages/Index";
import StudySessions from "./pages/StudySessions";
import Tasks from "./pages/Tasks";
import AILearning from "./pages/AILearning";
import Reports from "./pages/Reports";
import Classes from "./pages/Classes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/study-sessions" element={
            <AppLayout>
              <StudySessions />
            </AppLayout>
          } />
          <Route path="/tasks" element={
            <AppLayout>
              <Tasks />
            </AppLayout>
          } />
          <Route path="/ai-learning" element={
            <AppLayout>
              <AILearning />
            </AppLayout>
          } />
          <Route path="/reports" element={
            <AppLayout>
              <Reports />
            </AppLayout>
          } />
          <Route path="/classes" element={
            <AppLayout>
              <Classes />
            </AppLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
