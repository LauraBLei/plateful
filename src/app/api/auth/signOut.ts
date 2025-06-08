import { supabase } from "../../../../lib/supabase";

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    alert("you logged out");
  }
};
