import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

const ProtectedRoute = ({ children, isProfileCompletionRequired = false }) => {
  console.log("here");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthLoading, firebaseUser, profileDetails } = useAuthStore();

  useEffect(() => {
    if (isAuthLoading) return;

    console.log(firebaseUser);
    if (!firebaseUser) {
      navigate("/");
      return;
    }

    if (isProfileCompletionRequired) {
      console.log("here for pc");

      if (!profileDetails) {
        navigate("/student-details");
        return;
      }
    }

    console.log(isAuthLoading);
    console.log(firebaseUser);
    console.log(profileDetails);
    setIsLoading(false);
  }, [
    firebaseUser,
    isAuthLoading,
    profileDetails,
    isProfileCompletionRequired,
  ]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <ClimbingBoxLoader size={40} color="#6B5AED" />
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
