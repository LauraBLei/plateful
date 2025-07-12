import { getAllRecipes } from "@/api/recipeActions";
import AllRecipes from "@/components/pages/allrecipes";
import { Recipe } from "@/types/recipe";

const AllRecipesPage = async () => {
  const recipes: Recipe[] = await getAllRecipes();
  return <AllRecipes initialRecipes={recipes} />;
};

export default AllRecipesPage;
