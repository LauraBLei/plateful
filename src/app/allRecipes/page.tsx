import { getAllRecipes } from "src/api/recipeActions";
import AllRecipes from "src/components/pages/AllRecipes";
import { Recipe } from "src/types/recipe";

const AllRecipesPage = async () => {
  const recipes: Recipe[] = await getAllRecipes();
  return <AllRecipes initialRecipes={recipes} />;
};

export default AllRecipesPage;
