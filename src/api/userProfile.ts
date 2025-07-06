// API logic for user authentication and profile
export async function fetchUserProfile(userId: string) {
  const res = await fetch(`/api/auth/user?id=${userId}`);
  if (!res.ok) return null;
  return await res.json();
}

export async function createUserProfile(user: any) {
  await fetch("/api/auth/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}
