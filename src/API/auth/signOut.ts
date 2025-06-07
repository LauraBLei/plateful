import { supabase } from "../supabase";

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    console.log("Successfully signed out");
  }
};
