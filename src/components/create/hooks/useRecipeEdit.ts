import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchRecipeById } from "src/api/recipeActions";
import { Recipe } from "src/types/recipe";

export const useRecipeEdit = () => {
  const searchParams = useSearchParams();
  const recipeIdFromUrl = searchParams.get("id");
  const isEdit = !!recipeIdFromUrl;

  const [existingRecipe, setExistingRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && recipeIdFromUrl) {
      setIsLoading(true);
      setError(null);

      fetchRecipeById(Number(recipeIdFromUrl))
        .then((data: Recipe | null | Recipe[]) => {
          const recipe = Array.isArray(data) ? data[0] : data;
          if (recipe) {
            setExistingRecipe(recipe);
          } else {
            setError("Recipe not found");
          }
        })
        .catch((err) => {
          console.error("Failed to load recipe:", err);
          setError("Failed to load recipe");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isEdit, recipeIdFromUrl]);

  return {
    isEdit,
    existingRecipe,
    isLoading,
    error,
  };
};
