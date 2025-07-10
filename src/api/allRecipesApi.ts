import { Recipe } from "@/types/recipe";

export async function fetchAllRecipes(): Promise<Recipe[]> {
  const res = await fetch("/api/recipe/read");
  if (!res.ok) return [];
  return await res.json();
}

export async function fetchRecipesByTag(tag: string): Promise<Recipe[]> {
  const res = await fetch(`/api/recipe/read?tag=${encodeURIComponent(tag)}`);
  if (!res.ok) return [];
  return await res.json();
}
