// API logic for recipe deletion
import { supabase } from "src/helpers/supaBaseBrowserClient";
import { Recipe } from "src/types/recipe";
import { getAuthHeaders } from "./headerActions";

export async function deleteRecipe({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: number;
}): Promise<boolean> {
  const headers = await getAuthHeaders();
  const response = await fetch("/api/recipe/delete", {
    method: "DELETE",
    headers,
    body: JSON.stringify({ userId, recipeId }),
  });
  if (!response.ok) throw new Error("Failed to delete recipe");
  return true;
}

export async function getRecipesByTag(tag: string): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
      .contains("tags", [tag]);

    if (error) {
      console.error("Error fetching recipes by tag from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching recipes by tag:", error);
    return [];
  }
}

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)");

    if (error) {
      console.error("Error fetching recipes from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return [];
  }
}

export async function fetchRecipeById(
  recipeId: number
): Promise<Recipe | null> {
  const res = await fetch(`/api/recipe/read?id=${recipeId}`);
  if (!res.ok) return null;
  return await res.json();
}

export async function updateRecipe({
  recipeId,
  userId,
  updateData,
}: {
  recipeId: number;
  userId: string;
  updateData: any;
}): Promise<boolean> {
  const headers = await getAuthHeaders();
  const response = await fetch("/api/recipe/update", {
    method: "PATCH",
    headers,
    body: JSON.stringify({ recipeId, userId, updateData }),
  });
  return response.ok;
}

export async function createRecipe(recipeData: any): Promise<any> {
  const headers = await getAuthHeaders();
  const response = await fetch("/api/recipe/create", {
    method: "POST",
    headers,
    body: JSON.stringify(recipeData),
  });
  if (!response.ok) throw new Error("Failed to create recipe");
  return await response.json();
}

export async function fetchTimeRecipes(): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
      .lte("time", 30)
      .limit(4);

    if (error) {
      console.error("Error fetching time recipes from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching time recipes:", error);
    return [];
  }
}

export async function fetchRecentRecipes(): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      console.error("Error fetching recent recipes from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching recent recipes:", error);
    return [];
  }
}

export async function readFavoriteRecipes({
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
