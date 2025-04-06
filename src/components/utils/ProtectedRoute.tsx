import { useAuthStore } from "@/store/authStore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthLoading, firebaseUser } = useAuthStore();

  useEffect(() => {
    if (isAuthLoading) return;
    if (!firebaseUser) {
      navigate("/");
    }
  }, [firebaseUser, isAuthLoading]);

  if (isAuthLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <ClimbingBoxLoader size={40} color="#6B5AED" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
