import { supabase } from "src/helpers/supaBaseBrowserClient";

export async function signInWithGoogle() {
  console.log("Attempting to sign in with Google...");

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("Sign in error:", error);
    return;
  }
}
