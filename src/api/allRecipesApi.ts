import { Recipe } from "@/types/recipe";

// Uses /api/recipe/all
export async function fetchAllRecipes(): Promise<Recipe[]> {
  const res = await fetch("/api/recipe/all");
  if (!res.ok) return [];
  return await res.json();
}

// Uses /api/recipe/search
export async function fetchRecipesByTag(tag: string): Promise<Recipe[]> {
  const res = await fetch(`/api/recipe/search?tag=${encodeURIComponent(tag)}`);
  if (!res.ok) return [];
  return await res.json();
}
