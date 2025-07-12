import { fetchRecentRecipes, fetchTimeRecipes } from "@/api/recipeActions";
import { Homepage } from "@/components/pages/home";
import { Recipe } from "@/types/recipe";

const Home = async () => {
  const recentRecipes: Recipe[] = await fetchRecentRecipes();
  const timeRecipes: Recipe[] = await fetchTimeRecipes();
  return <Homepage recentRecipes={recentRecipes} timeRecipes={timeRecipes} />;
};

export default Home;
