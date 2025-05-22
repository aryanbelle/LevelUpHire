"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "student" | "recruiter" | "admin";
  points?: number;
  level?: number;
  image?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
};

const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

// Mock user for bypassing authentication
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "student@example.com",
  role: "student" as const,
  points: 350,
  level: 2,
  image: "https://i.pravatar.cc/150?u=1",
};

// Internal provider with mock authentication
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUser); // Auto-login with mock user
  const [isLoading, setIsLoading] = useState(false);
  
  const isAuthenticated = !!user;

  // Simulate login/logout functions
  const login = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 500);
  };

  const logout = () => {
    setUser(null);
  };
  
  // Auto-login effect for development
  useEffect(() => {
    if (!user) {
      login();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the provider without SessionProvider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContextProvider>{children}</AuthContextProvider>
  );
};