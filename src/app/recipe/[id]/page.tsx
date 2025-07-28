import RecipePage from "src/components/pages/RecipePage";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";

interface RecipeProps {
  params: Promise<{ id: string }>;
}

const Recipe: React.FC<RecipeProps> = async ({ params }) => {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: recipe, error } = await supabase
    .from("recipes")
    .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
    .eq("id", id)
    .single();

  if (error || !recipe) {
    return <div>Recipe deleted</div>;
  }

  return <RecipePage recipe={recipe} owner={recipe.owner} />;
};

export default Recipe;
