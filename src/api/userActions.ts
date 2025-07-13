import { UserProfile } from "@/types/user";
import { getAuthHeaders } from "./headerActions";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export async function createUserProfile(user: any) {
  await fetch(`${API_BASE_URL}/api/auth/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

export async function getUser(id: string): Promise<UserProfile | null> {
  const res = await fetch(`${API_BASE_URL}/api/auth/user/${id}`);
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
  await fetch(`${API_BASE_URL}/api/auth/user/${fields.id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(fields),
  });
}
