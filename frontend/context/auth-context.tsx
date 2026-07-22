"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { MOCK_USER } from '@/lib/constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and check local storage or set default user for quick demo
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('prepforge_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('prepforge_user');
        }
      } else {
        // For Demo/Hackathon, start as authenticated by default if no clear logout has happened
        setUser(MOCK_USER);
        localStorage.setItem('prepforge_user', JSON.stringify(MOCK_USER));
      }
      setIsLoading(false);
    };

    const timer = setTimeout(checkAuth, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newUser = {
      ...MOCK_USER,
      name: email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || MOCK_USER.name,
    };
    setUser(newUser);
    localStorage.setItem('prepforge_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const signup = async (firstName: string, lastName: string, _email: string): Promise<boolean> => {
    if (_email) {
      // no-op
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newUser = {
      ...MOCK_USER,
      name: `${firstName} ${lastName}`,
    };
    setUser(newUser);
    localStorage.setItem('prepforge_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prepforge_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
