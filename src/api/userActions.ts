import { UpdateUserRequest, UserProfile } from "src/types/user";
import { getAuthHeaders } from "./headerHelper";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export async function createUserProfile(user: Omit<UserProfile, "id">) {
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

export async function getUserWithFollowData(
  id: string,
  options?: {
    followers?: string[];
    following?: string[];
  }
): Promise<UserProfile | null> {
  const params = new URLSearchParams();

  if (options?.followers && options.followers.length > 0) {
    params.append("followers", options.followers.join(","));
  }

  if (options?.following && options.following.length > 0) {
    params.append("following", options.following.join(","));
  }

  const queryString = params.toString();
  const url = queryString
    ? `${API_BASE_URL}/api/auth/user/${id}?${queryString}`
    : `${API_BASE_URL}/api/auth/user/${id}`;

  const res = await fetch(url);
  if (!res.ok) return null;
  return await res.json();
}

export async function updateUser(fields: UpdateUserRequest) {
  const headers = getAuthHeaders();
  await fetch(`${API_BASE_URL}/api/auth/user/${fields.id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(fields),
  });
}
