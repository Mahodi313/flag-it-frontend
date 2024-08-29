import React, { createContext, useState, useEffect } from "react";

import { getCookie } from "../utils/cookieUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) return;

    fetch("/api/Auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Not authenticated");
        }
      })
      .then((data) => {
        const sessionCookie = getCookie(".AspNetCore.Identity.Application");
        const userData = { ...data, session: sessionCookie };
        console.log("Saving user to localStorage:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      })
      .catch(() => setUser(null));
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
