// API logic for recipe deletion
import { getAuthHeaders } from "./headers";

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
