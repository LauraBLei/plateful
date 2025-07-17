import { fetchRecentRecipes, fetchTimeRecipes } from "src/api/recipeActions";
import { Homepage } from "src/components/pages/HomePage";
import { getCurrentUser } from "src/helpers/getCurrentUser";
import { getRecipesFromFollowers } from "../server/supabase";

const Home = async () => {
  let followerRecipes = [];

  const currentUser = await getCurrentUser();

  if (currentUser?.following?.length > 0) {
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
      currentUser={currentUser}
    />
  );
};

export default Home;
