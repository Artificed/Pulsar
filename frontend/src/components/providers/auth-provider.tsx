'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  exp: number;
}

interface User {
  userId: string;
  username: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      
      if (decoded.exp * 1000 < Date.now()) {
        clearTokens();
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setUser({
        userId: decoded.sub,
        username: decoded.username,
        email: decoded.email,
      });
    } catch {
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    
    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      setIsAuthenticated(true);
      setUser({
        userId: decoded.sub,
        username: decoded.username,
        email: decoded.email,
      });
    } catch {
      clearTokens();
    }
  };

  const logout = () => {
    clearTokens();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
