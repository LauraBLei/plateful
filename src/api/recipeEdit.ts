import { Recipe } from "@/types/recipe";
import { getAuthHeaders } from "./headers";

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

export async function uploadRecipeImage(
  image: File,
  userId: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", image); // <-- match backend expectation
  formData.append("userId", userId);
  const response = await fetch("/api/recipe/uploadImage", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to upload image");
  const data = await response.json();
  return data.publicUrl;
}
