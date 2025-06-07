import { supabase } from "../supabase";

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.error("Error during sign-in:", error);
  } else {
    // This will redirect user to Google login page
    console.log("Redirecting to Google...");
    console.log("data: ", data);
  }
};
