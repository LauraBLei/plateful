"use client";

import { createContext, ReactNode, useContext } from "react";
import { UserProfile } from "src/types/user";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  initialUser: UserProfile | null;
}

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  const value: AuthContextType = {
    user: initialUser,
    isAuthenticated: !!initialUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
