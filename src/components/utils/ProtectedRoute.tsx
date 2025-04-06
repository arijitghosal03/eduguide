import { useAuthStore } from "@/store/authStore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthLoading, firebaseUser } = useAuthStore();

  useEffect(() => {
    if (!isAuthLoading && !firebaseUser) {
      navigate("/");
    }
  }, [firebaseUser, isAuthLoading, navigate]);

  if (isAuthLoading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
