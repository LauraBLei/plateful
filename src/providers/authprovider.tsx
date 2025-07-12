import { useEffect, useState } from "react";
import { AuthContext, type ContextProviderProps } from "./contextTypes";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/supabase";
import type { UserProfile } from "@/types/user";
import { createUserProfile, getUser } from "@/api/userActions";

export const AuthProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null); // optional: typed interface for your users table

  const updateProfile = (fields: Partial<UserProfile>) => {
    if (!profile) return;
    const updated: UserProfile = {
      id: profile.id,
      created_at: profile.created_at,
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
      avatar: profile.avatar,
      favorites: profile.favorites,
      followers: profile.followers,
      following: profile.following,
      ...fields,
    };
    setProfile(updated);
  };

  useEffect(() => {
    const syncUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user ?? null;
      setUser(user);

      if (user) {
        const existingUser = await getUser(user.id);
        if (!existingUser) {
          await createUserProfile(user);
        } else {
          setProfile(existingUser);
        }
      } else {
        setProfile(null);
      }
    };

    syncUser();

    // Listen for auth state changes and sync user
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      syncUser();
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, profile, setProfile, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
