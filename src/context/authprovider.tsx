import { useEffect, useState } from "react";
import { AuthContext } from "../types/context";
import { supabase } from "../API/supabase";
import type { User } from "@supabase/supabase-js";

type ContextProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data ? data.user : null;

      setUser(user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session ? session.user : null;
        setUser(user);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
