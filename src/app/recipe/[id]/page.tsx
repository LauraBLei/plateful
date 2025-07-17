import RecipePage from "src/components/pages/RecipePage";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";

export default async function Recipe({ params }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: recipe, error } = await supabase
    .from("recipes")
    .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
    .eq("id", id)
    .single();

  if (error || !recipe) {
    return <div>Recipe not found</div>;
  }

  return <RecipePage recipe={recipe} owner={recipe.owner} />;
}
