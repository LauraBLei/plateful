import { supabase } from "src/helpers/supaBaseBrowserClient";

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) {
    console.error("Sign in error:", error);
    return;
  }
}
