import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CTA from "./components/landing/CTA";
import Features from "./components/landing/Features";
import Contact from "./components/landing/Footer";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import AIAssistantApp from "./pages/AIAssistantApp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import StudentDetails from "./pages/StudentDetails";
import Mathematics from "./pages/subject/Subject";
import SubjectAssignments from "./pages/subject/SubjectAssignments";
import SubjectLearn from "./pages/subject/SubjectLearn";
import SubjectRevise from "./pages/subject/SubjectRevise";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/subject/Layout" element={<Mathematics />} />
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/student-details"
              element={
                <ProtectedRoute>
                  <StudentDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<CTA />} />
            <Route path="/features" element={<Features />} />
            <Route path="/chat" element={<AIAssistantApp />} />
            <Route path="/subject/SubjectLearn" element={<SubjectLearn />} />
            <Route path="/subject/SubjectRevise" element={<SubjectRevise />} />
            <Route
              path="/subject/SubjectAssignments"
              element={<SubjectAssignments />}
            />

            <Route path="/subject/" element={<Index />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isProfileCompletionRequired={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute isProfileCompletionRequired={true}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
