import { getAllRecipes } from "src/api/recipeActions";
import AllRecipes from "src/components/pages/allrecipes";
import { getCurrentUser } from "src/helpers/getCurrentUser";

const AllRecipesPage = async () => {
  const [recipes, currentUser] = await Promise.all([
    getAllRecipes(),
    getCurrentUser(),
  ]);

  return <AllRecipes initialRecipes={recipes} currentUser={currentUser} />;
};

export default AllRecipesPage;
