// API logic for user and favorite recipes in profile
import { Recipe } from "@/types/recipe";

export async function readUserRecipes(
  userId: string
): Promise<Recipe[] | null> {
  const res = await fetch(`/api/recipe/read?userId=${userId}`);
  if (!res.ok) return null;
  return await res.json();
}

export async function readFavoriteRecipes({
  id,
  favorites,
}: {
  id: string;
  favorites: number[];
}): Promise<Recipe[]> {
  if (!favorites || favorites.length === 0) return [];
  const params = favorites.map((fid) => `id=${fid}`).join("&");
  const res = await fetch(`/api/recipe/read?${params}`);
  if (!res.ok) return [];
  return await res.json();
}

export async function getUser(id: string) {
  const res = await fetch(`/api/auth/user?id=${id}`);
  if (!res.ok) return null;
  return await res.json();
}

export async function updateUser(fields: any) {
  await fetch("/api/auth/user", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
}
