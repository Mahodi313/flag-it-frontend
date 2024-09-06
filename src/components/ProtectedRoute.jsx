import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/auth.context";

const ProtectedRoute = ({ children }) => {
  const { user} = useContext(AuthContext);

  // const isLoggedIn = () => {
  //   // Kontrollera om användaren är inloggad genom att kontrollera om authToken finns i localStorage
  //   return localStorage.getItem("authToken") !== null;
  // };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;