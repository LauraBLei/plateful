import Link from "next/link";
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
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 font-primary">
        <div className="max-w-md mx-auto">
          <h1 className="headlineTwo mb-4 text-brand-black dark:text-brand-white">
            Recipe Not Found
          </h1>
          <p className="text-brand-black/70 dark:text-brand-white/70 mb-6">
            This recipe has been deleted or doesn&apos;t exist.
          </p>
          <Link href="/" className="button button-active inline-block">
            Go Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <RecipePage recipe={recipe} owner={recipe.owner} />;
};

export default Recipe;
