// API logic for recipe and user in recipe page
import { Recipe } from "@/types/recipe";

export async function readRecipe(id: number): Promise<Recipe | null> {
  const res = await fetch(`/api/recipe/read?id=${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  if (Array.isArray(data)) {
    return data[0] ?? null;
  }
  return data ?? null;
}

export async function checkUser(id: string) {
  const res = await fetch(`/api/auth/user?id=${id}`);
  if (!res.ok) return null;
  return await res.json();
}

export async function updateUser(fields: {
  id: string;
  bio?: string;
  updatedList?: number[];
}) {
  await fetch("/api/auth/user", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
}
