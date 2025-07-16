import { fetchRecentRecipes, fetchTimeRecipes } from "src/api/recipeActions";
import { getUser } from "src/api/userActions";
import { Homepage } from "src/components/pages/HomePage";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";
import { getFollowers, getRecipesFromFollowers } from "../server/supabase";

const Home = async () => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let followingRecipes = [];
  let profile = null;

  if (user) {
    profile = await getUser(user.id);
    const following = await getFollowers(supabase, user.id);

    const selected =
      following.length > 0
        ? [following[Math.floor(Math.random() * following.length)]]
        : [];

    if (selected.length > 0) {
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
      profile={profile}
    />
  );
};

export default Home;
