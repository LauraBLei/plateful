import { createContext, type Dispatch, type SetStateAction } from "react";
import type { User } from "@supabase/supabase-js";
import type { UserProfile } from "./user";

export type ContextProviderProps = {
  children: React.ReactNode;
};

export interface AuthContextType {
  user: User | null;
  setUser: (input: User | null) => void;
  profile: UserProfile | null;
  setProfile: (input: UserProfile | null) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export interface CommonContextType {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  toggleDarkMode: () => void;
}

export const CommonContext = createContext<CommonContextType>(
  {} as CommonContextType
);
