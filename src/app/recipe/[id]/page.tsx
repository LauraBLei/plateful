import RecipePage from "@/components/pages/recipe";
import { supabase } from "@/supabase";

interface RecipeProps {
  params: { id: string };
}

export default async function Recipe({ params }: RecipeProps) {
  const { id } = params;
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
