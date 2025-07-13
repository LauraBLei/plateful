import { RecipeCard } from "@/components/shared/RecipeCard";
import type { Recipe } from "@/types/recipe";

interface RecipeGridProps {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  title?: string;
  emptyMessage?: string;
  noResultsMessage?: string;
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  filteredRecipes,
  title = "Recipes",
  emptyMessage = "No recipes yet!",
  noResultsMessage = "No recipes match your filters.",
}) => {
  console.log("current recipes:", recipes);

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="headline">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredRecipes.length > 0
          ? filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                time={recipe.time}
                title={recipe.name}
                image={recipe.image}
                id={recipe.id}
                owner={recipe.owner}
              />
            ))
          : recipes.length > 0
          ? noResultsMessage
          : emptyMessage}
      </div>
    </div>
  );
};
