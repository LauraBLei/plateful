import { supabase } from "../../../../lib/supabase";
import type { Recipe } from "../../../../lib/types/recipe";

export async function updateRecipe({
  recipeId,
  userId,
  updateData,
}: {
  recipeId: number;
  userId: string;
  updateData: Partial<Omit<Recipe, "id" | "owner_id">>;
}) {
  const { error, data } = await supabase
    .from("recipes")
    .update(updateData)
    .match({ id: recipeId, owner_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data;
}
