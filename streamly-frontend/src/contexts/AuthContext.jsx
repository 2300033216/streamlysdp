// src/contexts/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import api from "../api"; // <- this is src/api.js you showed

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { token, role, fullName }
  const [loading, setLoading] = useState(true);

  // Load from localStorage when app starts
  useEffect(() => {
    const token = localStorage.getItem("token");      // must match api.js
    const role = localStorage.getItem("role");
    const fullName = localStorage.getItem("fullName");

    if (token && role && fullName) {
      setUser({ token, role, fullName });
    }
    setLoading(false);
  }, []);

  // Login: call backend and store token + role + fullName
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    const { token, role, fullName } = res.data;

    // Store for future reloads
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("fullName", fullName);

    setUser({ token, role, fullName });

    // return role so caller (Login page) can redirect
    return role;
  };

  // Logout: clear everything
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("fullName");
    setUser(null);
  };

  const value = {
    user,        // null or {token, role, fullName}
    loading,     // true while restoring from localStorage
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
