import { fetchRecentRecipes, fetchTimeRecipes } from "src/api/recipeActions";
import { Homepage } from "src/components/pages/HomePage";
import { getCurrentUser } from "src/helpers/getCurrentUser";
import { Recipe } from "src/types/recipe";
import { getRecipesFromFollowers } from "../server/supabase";

// Force dynamic rendering since we check authentication
export const dynamic = "force-dynamic";

const Home = async () => {
  let followerRecipes: Recipe[] = [];

  const currentUser = await getCurrentUser();

  if (currentUser?.following && currentUser.following.length > 0) {
    const randomFollower =
      currentUser.following[
        Math.floor(Math.random() * currentUser.following.length)
      ];
    followerRecipes = await getRecipesFromFollowers(randomFollower);
  }

  const [recentRecipes, timeRecipes] = await Promise.all([
    fetchRecentRecipes(),
    fetchTimeRecipes(),
  ]);

  return (
    <Homepage
      recentRecipes={recentRecipes}
      timeRecipes={timeRecipes}
      followerRecipes={followerRecipes}
    />
  );
};

export default Home;
