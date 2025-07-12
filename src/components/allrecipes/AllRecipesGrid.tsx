import React from "react";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "@/components/card";
import Loader from "@/components/loader";

interface AllRecipesGridProps {
  recipes: Recipe[];
  loading: boolean;
}

const AllRecipesGrid: React.FC<AllRecipesGridProps> = ({
  recipes,
  loading,
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
