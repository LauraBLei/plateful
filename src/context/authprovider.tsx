import { useEffect, useState } from "react";
import {
  AuthContext,
  type ContextProviderProps,
} from "../components/contextTypes";
import type { User } from "@supabase/supabase-js";
import type { UserProfile } from "../../lib/types/user";
import { checkUser } from "../app/api/auth/user";
import { setUser as SetSupaUser } from "../app/api/auth/user";
import { supabase } from "../../lib/supabase";

export const AuthProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null); // optional: typed interface for your users table

  useEffect(() => {
    const syncUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user ?? null;
      setUser(user);

      if (user) {
        // Check if the user exists in your custom users table
        const existingUser = await checkUser(user.id);

        if (!existingUser) {
          SetSupaUser(user);
        } else {
          setProfile(existingUser);
        }
      }
    };

    syncUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user ?? null;
        setUser(user);

        // Repeat sync on auth state change
        if (user) {
          supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single()
            .then(({ data }) => {
              setProfile(data);
            });
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
