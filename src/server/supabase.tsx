import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";
import { Recipe } from "src/types/recipe";

export async function getRecipesFromFollowers(
  userId: string
): Promise<Recipe[]> {
  const supabase = await createServerSupabaseClient();
  const { data: recipes } = await supabase
    .from("recipes")
    .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
    .eq("owner_id", userId);

  if (!recipes) return [];

  return recipes
    .sort(
      (a: Recipe, b: Recipe) =>
        new Date(b.created).getTime() - new Date(a.created).getTime()
    )
    .slice(0, 3);
}

export async function getFollowers(userId: string): Promise<string[]> {
  const supabase = await createServerSupabaseClient();
  const { data: userData } = await supabase
    .from("users")
    .select("following")
    .eq("id", userId)
    .single();
  return userData?.following ?? [];
}
