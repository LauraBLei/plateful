import { fetchRecentRecipes, fetchTimeRecipes } from "src/api/recipeActions";
import { Homepage } from "src/components/pages/HomePage";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";
import { Recipe } from "src/types/recipe";

const Home = async () => {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let followingRecipes = [];

  if (user) {
    const following = await getFollowers(supabase, user.id);

    // Pick a random following user
    const selected =
      following.length > 0
        ? [following[Math.floor(Math.random() * following.length)]]
        : [];

    if (selected.length > 0) {
      // Get the recipes and user info of a random user the client is following
      followingRecipes = await getRecipesFromFollowers(supabase, selected[0]);
    }
  }
  const recentRecipes = await fetchRecentRecipes();
  const timeRecipes = await fetchTimeRecipes();
  return (
    <Homepage
      recentRecipes={recentRecipes}
      timeRecipes={timeRecipes}
      followingRecipes={followingRecipes}
    />
  );
};

async function getRecipesFromFollowers(
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

async function getFollowers(supabase: any, userId: string): Promise<string[]> {
  const { data: userData } = await supabase
    .from("users")
    .select("following")
    .eq("id", userId)
    .single();
  return userData?.following ?? [];
}

export default Home;
