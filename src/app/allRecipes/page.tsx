import { getAllRecipes } from "src/api/recipeActions";
import AllRecipes from "src/components/pages/allrecipes";

const AllRecipesPage = async () => {
  const recipes = await getAllRecipes();
  return <AllRecipes initialRecipes={recipes} />;
};

export default AllRecipesPage;
