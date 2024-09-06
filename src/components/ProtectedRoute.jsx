import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = () => {
    // Kontrollera om användaren är inloggad genom att kontrollera om authToken finns i localStorage
    return localStorage.getItem("authToken") !== null;
  };

  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;