"use client";

import { Clock, HeartMinus, HeartPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { updateUser } from "src/api/userActions";
import { useAuth } from "src/providers/AuthProvider";
import { Recipe } from "src/types/recipe";

interface RecipeHeaderProps {
  recipe: Recipe;
}

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({ recipe }) => {
  const { user } = useAuth();
  const isFavorite = !!(user && recipe && user.favorites?.includes(recipe.id));
  const cookingTime = getCookingTimeLabel(recipe?.time ? recipe.time : 30);
  const router = useRouter();

  const handleSetFavorite = async () => {
    if (user && recipe) {
      const currentFavorites = user.favorites;

      let updatedFavorites: number[];
      if (isFavorite) {
        updatedFavorites = currentFavorites.filter((f) => f !== recipe.id);
      } else {
        updatedFavorites = [...currentFavorites, recipe.id];
      }

      try {
        await updateUser({
          id: user.id,
          updatedList: updatedFavorites,
        });
        router.refresh();

        console.log("Favorites updated successfully ", updatedFavorites);
      } catch (error) {
        console.error("Failed to update favorites:", error);
      }
    } else {
      console.log("Cannot update favorites:", {
        hasProfile: !!user,
        hasRecipe: !!recipe,
        profileId: user?.id,
        recipeId: recipe?.id,
      });
    }
  };

  return (
    <div className="flex justify-between">
      <h1 className="headline flex justify-between">
        {recipe?.name}
        <div className="flex items-center gap-5">
          <button
            onClick={handleSetFavorite}
            className="flex gap-2 items-center hover:text-brand-orange cursor-pointer"
          >
            {isFavorite ? (
              <HeartMinus className="w-[20px] hover:text-brand-orange cursor-pointer" />
            ) : (
              <HeartPlus className="w-[20px] " />
            )}
            <span className="whitespace-nowrap text-sm">
              {isFavorite ? "Remove from favorite" : "Add to favorite"}
            </span>
          </button>
          <p className="flex items-center gap-2">
            <Clock className="w-[20px]" />
            <span className="text-sm whitespace-nowrap">{cookingTime}</span>
          </p>
        </div>
      </h1>
    </div>
  );
};

const getCookingTimeLabel = (minutes: number) => {
  switch (minutes) {
    case 30:
      return "30 min";
    case 60:
      return "1 hour";
    case 90:
      return "1.5 hours";
    case 120:
      return "2 hours";
    default:
      return "> 2 hours";
  }
};
