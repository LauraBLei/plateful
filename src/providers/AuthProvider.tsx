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
import { handleAuthError, isAuthError } from "src/helpers/authErrorHandler";
import { supabase } from "src/helpers/supaBaseBrowserClient";
import { UserProfile } from "src/types/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signOutHandler: () => Promise<void>;
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

  // Check for auth success parameter and refresh to sync state
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get("auth");

    if (authSuccess === "success") {
      console.log("🔄 Auth success detected, refreshing to sync state");
      // Remove the parameter from URL and refresh
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
      window.location.reload();
    }
  }, []); // Only run once on mount

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
          if (isAuthError(error)) {
            handleAuthError(error);
          }
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
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
      if (error) {
        console.error("Sign in error:", error);
        if (isAuthError(error)) {
          handleAuthError(error);
        }
        return;
      }
    } catch (error) {
      console.error("Sign in exception:", error);
      if (isAuthError(error)) {
        handleAuthError(error);
      }
    }
  };

  const signOutHandler = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated,
        setUser: setUser,
        setIsAuthenticated,
        signInWithGoogle,
        signOutHandler,
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
