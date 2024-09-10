import React, { createContext, useState, useEffect } from "react";

import { getCookie } from "../utils/cookieUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (!user) {
      console.log("User not found in localStorage, fetching user data...");
      fetch("https://localhost:7007/api/Auth/me", { credentials: "include" })
        .then((response) => response.json())
        .then((data) => {
          const sessionCookie = getCookie(".AspNetCore.Identity.Application");
          const userData = { ...data, session: sessionCookie };

          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  const signOut = () => {
    fetch("/api/Auth/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUser(null);
      localStorage.removeItem("user");
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
