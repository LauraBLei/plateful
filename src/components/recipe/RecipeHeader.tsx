"use client";

import { updateUser } from "@/api/userActions";
import { AuthContext } from "@/providers/contextTypes";
import { Recipe } from "@/types/recipe";
import { Clock, HeartMinus, HeartPlus } from "lucide-react";
import React, { useContext } from "react";

interface RecipeHeaderProps {
  recipe: Recipe;
}

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({ recipe }) => {
  const { profile, updateProfile } = useContext(AuthContext);

  const isFavorite = !!(
    profile &&
    recipe &&
    profile.favorites?.includes(recipe.id)
  );
  const cookingTime = getCookingTimeLabel(recipe?.time ? recipe.time : 30);

  const handleSetFavorite = async () => {
    if (profile && recipe) {
      const currentFavorites = Array.isArray(profile.favorites)
        ? profile.favorites
        : [];

      let updatedFavorites: number[];
      if (isFavorite) {
        // Remove favorite if it exists
        updatedFavorites = currentFavorites.filter((f) => f !== recipe.id);
      } else {
        // Add favorite if it doesn't exist
        updatedFavorites = [...currentFavorites, recipe.id];
      }

      try {
        await updateUser({
          id: profile.id,
          bio: profile.bio,
          updatedList: updatedFavorites,
        });

        if (updatedFavorites && updateProfile) {
          updateProfile({ favorites: updatedFavorites });
        }

        console.log("Favorites updated successfully");
      } catch (error) {
        console.error("Failed to update favorites:", error);
      }
    } else {
      console.log("Cannot update favorites:", {
        hasProfile: !!profile,
        hasRecipe: !!recipe,
        profileId: profile?.id,
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
