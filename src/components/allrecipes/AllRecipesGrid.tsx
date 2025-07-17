import { Loader } from "lucide-react";
import React from "react";
import { Recipe } from "src/types/recipe";
import { UserProfile } from "src/types/user";
import { RecipeCard } from "../shared/RecipeCard";

interface AllRecipesGridProps {
  recipes: Recipe[];
  loading: boolean;
  currentUser?: UserProfile | null;
}

const AllRecipesGrid: React.FC<AllRecipesGridProps> = ({
  recipes,
  loading,
  currentUser,
}) => (
  <div className="w-full flex flex-col gap-2">
    <h1 className="headline">All Recipes</h1>
    {loading ? (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              image={recipe.image}
              id={recipe.id}
              title={recipe.name}
              time={recipe.time}
              owner={recipe.owner}
              currentUser={currentUser}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No recipes found.
          </div>
        )}
      </div>
    )}
  </div>
);

export default AllRecipesGrid;
