// API logic for sign out
export async function signOut() {
  await fetch("/api/auth/signOut", { method: "POST" });
}
