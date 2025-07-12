import { fetchAllRecipes } from "@/api/allRecipesApi";
import AllRecipes from "@/components/pages/allrecipes";
import { Recipe } from "@/types/recipe";

const AllRecipesPage = async () => {
  const recipes: Recipe[] = await fetchAllRecipes();
  return <AllRecipes initialRecipes={recipes} />;
};

export default AllRecipesPage;
