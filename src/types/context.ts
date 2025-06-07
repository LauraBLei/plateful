import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
  setUser: (input: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
