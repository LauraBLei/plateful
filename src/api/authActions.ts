import { supabase } from "@/supabase";

export async function signOut() {
  await supabase.auth.signOut();
  await fetch("/api/auth/signOut", { method: "POST" });
  window.location.reload();
}

export async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({ provider: "google" });
}
