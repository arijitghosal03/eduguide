
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Mathematics from "./pages/subject/Subject";
import SubjectLearn from "./pages/subject/SubjectLearn";  
import SubjectRevise from "./pages/subject/SubjectRevise";
import SubjectAssignments from "./pages/subject/SubjectAssignments";
import AIAssistantApp from "./pages/AIAssistantApp";
import StudentDetails from "./pages/StudentDetails";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/subject/Layout" element={<Mathematics />} />
          <Route path="/" element={<Index />} />
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/chat" element={<AIAssistantApp />} />
          <Route path="/subject/SubjectLearn" element={<SubjectLearn />} />
          <Route path="/subject/SubjectRevise" element={<SubjectRevise />} />
          <Route path="/subject/SubjectAssignments" element={<SubjectAssignments />} />
          
          <Route path="/subject/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
