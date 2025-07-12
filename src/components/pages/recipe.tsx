"use client";

import { updateUser } from "@/api/userActions";
import { IngredientsInfo } from "@/components/recipe/IngredientsInfo";
import { RecipeHeader } from "@/components/recipe/RecipeHeader";
import { RecipeOwner } from "@/components/recipe/RecipeOwner";
import { RecipeSteps } from "@/components/recipe/RecipeSteps";
import Loader from "@/helpers/loader";
import { AuthContext } from "@/providers/contextTypes";
import { Recipe } from "@/types/recipe";
import type { UserProfile } from "@/types/user";
import { Suspense, useContext } from "react";

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

interface RecipePageProps {
  recipe: Recipe;
  owner: UserProfile;
}

const RecipePage = ({ recipe, owner }: RecipePageProps) => {
  const { profile, updateProfile } = useContext(AuthContext);
  const isFavorite = !!(
    profile &&
    recipe &&
    profile.favorites?.includes(recipe.id)
  );

  const cookingTime = getCookingTimeLabel(recipe?.time ? recipe.time : 30);
  console.log("RecipePage rendered with recipe:", recipe);

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
    <Suspense fallback={<Loader />}>
      <div className="max-w-[1440px] mb-30 px-2 flex gap-10 w-full flex-wrap lg:flex-nowrap font-primary text-brand-black dark:text-brand-white">
        <IngredientsInfo recipe={recipe} />
        <div className="w-full">
          <RecipeHeader
            name={recipe?.name}
            isFavorite={isFavorite}
            cookingTime={cookingTime}
            onFavoriteClick={handleSetFavorite}
          />
          <RecipeOwner owner={owner} />
          <RecipeSteps steps={recipe?.steps || []} />
        </div>
      </div>
    </Suspense>
  );
};

export default RecipePage;
