import { Recipe } from "@/types/recipe";

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
  const response = await fetch("/api/recipe/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId, userId, updateData }),
  });
  return response.ok;
}

export async function createRecipe(recipeData: any): Promise<any> {
  const response = await fetch("/api/recipe/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  formData.append("image", image);
  formData.append("userId", userId);
  const response = await fetch("/api/recipe/uploadImage", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to upload image");
  const data = await response.json();
  return data.url;
}
