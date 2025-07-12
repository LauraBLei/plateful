import { fetchRecentRecipes, fetchTimeRecipes } from "@/api/recipeActions";
import { Homepage } from "@/components/pages/home";

const Home = async () => {
  const recentRecipes = await fetchRecentRecipes();
  const timeRecipes = await fetchTimeRecipes();
  return <Homepage recentRecipes={recentRecipes} timeRecipes={timeRecipes} />;
};

export default Home;
