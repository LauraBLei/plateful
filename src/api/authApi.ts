import { supabase } from "../../lib/supabase";

// API logic for sign out
export async function signOut() {
  await supabase.auth.signOut(); // Clear client session
  await fetch("/api/auth/signOut", { method: "POST" }); // Server-side cleanup (optional)
  window.location.reload();
}

export async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({ provider: "google" });
}
