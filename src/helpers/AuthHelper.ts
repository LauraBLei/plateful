import supabase from "lib/supabase";

export const signOutHandler = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};
