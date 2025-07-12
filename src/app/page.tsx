import { fetchRecentRecipes, fetchTimeRecipes } from "@/api/homeFetch";
import { Homepage } from "@/components/pages/home";
import { Recipe } from "@/types/recipe";

const Home = async () => {
  console.log("This is logged on the server side.");
  const recentRecipes: Recipe[] = await fetchRecentRecipes();
  const timeRecipes: Recipe[] = await fetchTimeRecipes();
  return <Homepage recentRecipes={recentRecipes} timeRecipes={timeRecipes} />;
};

export default Home;
