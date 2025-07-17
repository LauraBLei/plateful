import { EditPageContent } from "src/components/pages/EditPage";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";

interface RecipeProps {
  params: Promise<{ id: string }>;
}
const EditRecipe: React.FC<RecipeProps> = async ({ params }) => {
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

  return <EditPageContent recipe={recipe} />;
};

export default EditRecipe;
