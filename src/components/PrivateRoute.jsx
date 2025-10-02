import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  // If user is not logged in → redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → show the component
  return children;
}
