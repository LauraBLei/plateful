import { supabase } from "../../../../lib/supabase";

export async function deleteRecipe({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: number;
}) {
  const { error } = await supabase
    .from("recipes")
    .delete()
    .match({ id: recipeId, owner_id: userId });
  if (error) throw error;
  return true;
}
