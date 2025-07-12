import { getAuthHeaders } from "./headerActions";

export async function createUserProfile(user: any) {
  await fetch("/api/auth/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

export async function getUser(id: string) {
  const res = await fetch(`/api/auth/user?id=${id}`);
  if (!res.ok) return null;
  return await res.json();
}

export type UpdateUserRequest = {
  id: string;
  bio?: string;
  name?: string;
  followingUpdated?: string[];
  followersUpdated?: string[];
  updatedList?: number[];
};

export async function updateUser(fields: UpdateUserRequest) {
  const headers = await getAuthHeaders();
  await fetch("/api/auth/user", {
    method: "PATCH",
    headers,
    body: JSON.stringify(fields),
  });
}
