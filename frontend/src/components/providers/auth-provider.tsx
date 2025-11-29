'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authService } from "@/features/auth/api/auth-service";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.validateToken({ accessToken });
      if (response.payload?.valid) {
        setIsAuthenticated(true);
      } else {
        
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const refreshResponse = await authService.refreshToken({ refreshToken });
            if (refreshResponse.payload) {
              localStorage.setItem("accessToken", refreshResponse.payload.accessToken);
              localStorage.setItem("refreshToken", refreshResponse.payload.refreshToken);
              setIsAuthenticated(true);
            } else {
              clearTokens();
            }
          } catch {
            clearTokens();
          }
        } else {
          clearTokens();
        }
      }
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
  };

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearTokens();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
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
