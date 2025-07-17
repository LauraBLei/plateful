"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUser } from "src/api/userActions";
import { supabase } from "src/helpers/supaBaseBrowserClient";
import { UserProfile } from "src/types/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signInWithGoogle: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
  initialUser: UserProfile | null;
}
export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!initialUser
  );
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        try {
          const fullUserProfile = await getUser(session.user.id);
          if (fullUserProfile) {
            setUser(fullUserProfile);
            setIsAuthenticated(true);
            router.refresh();
            console.log(
              "User data updated after auth state change:",
              fullUserProfile
            );
          }
        } catch (error) {
          console.error(
            "Error fetching user data after auth state change:",
            error
          );
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setIsAuthenticated(false);
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        console.error("Sign in error:", error);
        return;
      }

      // The auth state change handler will handle user data fetching
      // when the user returns from the OAuth redirect
    } catch (error) {
      console.error("Sign in exception:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated,
        setUser: setUser,
        setIsAuthenticated,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
