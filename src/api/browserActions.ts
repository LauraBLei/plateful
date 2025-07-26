import { Recipe } from "src/types/recipe";
import { SearchResults } from "src/types/types";
import { getAuthHeaders } from "./headerHelper";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;

export async function deleteRecipe({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: number;
}): Promise<boolean> {
  const headers = getAuthHeaders();
  const response = await fetch(`${baseUrl}/api/recipe/delete`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ userId, recipeId }),
  });
  if (!response.ok) throw new Error("Failed to delete recipe");
  return true;
}

export async function updateRecipe({
  recipeId,
  userId,
  updateData,
}: {
  recipeId: number;
  userId: string;
  updateData: Partial<Recipe>;
}): Promise<boolean> {
  const headers = getAuthHeaders();
  const response = await fetch(`${baseUrl}/api/recipe/update`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ recipeId, userId, updateData }),
  });
  return response.ok;
}

export async function createRecipe(
  recipeData: Omit<Recipe, "id" | "created" | "updated" | "owner" | "owner_id">
): Promise<Recipe | null> {
  try {
    const headers = getAuthHeaders();
    const response = await fetch(`${baseUrl}/api/recipe/create`, {
      method: "POST",
      headers,
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Failed to create recipe: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Create recipe error:", error);
    throw error;
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
  const res = await fetch(`${baseUrl}/api/recipe/read?${params}`);
  if (!res.ok) return [];
  return await res.json();
}
export async function searchContent(
  query: string
): Promise<SearchResults | null> {
  if (!query || query.trim().length === 0) {
    return { recipes: [], users: [], query: "" };
  }

  try {
    const res = await fetch(
      `${baseUrl}/api/search?q=${encodeURIComponent(query.trim())}`
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Search API error response:", errorText);
      return null;
    }

    const result = await res.json();
    console.log("Search API success:", result);
    return result;
  } catch (error) {
    console.error("Search API error:", error);
    return null;
  }
}
export async function uploadRecipeImage(
  image: File,
  userId: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("userId", userId);
  const response = await fetch(`${baseUrl}/api/recipe/uploadImage`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to upload image");
  const data = await response.json();
  return data.publicUrl;
}
