import { Recipe } from "src/types/recipe";

export async function getRecipesFromFollowers(
  supabase: any,
  userId: string
): Promise<Recipe[]> {
  const { data: recipes } = await supabase
    .from("recipes")
    .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
    .eq("owner_id", userId);

  return recipes
    .sort(
      (a: { created: Date }, b: { created: Date }) =>
        new Date(b.created || b.created).getTime() -
        new Date(a.created || a.created).getTime()
    )
    .slice(0, 3);
}

export async function getFollowers(
  supabase: any,
  userId: string
): Promise<string[]> {
  const { data: userData } = await supabase
    .from("users")
    .select("following")
    .eq("id", userId)
    .single();
  return userData?.following ?? [];
}
