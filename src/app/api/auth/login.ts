import { supabase } from "../../../../lib/supabase";

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.error("Error during sign-in:", error);
  } else {
    return data;
  }
};
