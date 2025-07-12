"use client";
import { useContext, useEffect, useState, Suspense } from "react";
import type { Recipe } from "@/types/recipe";
import type { UserProfile } from "@/types/user";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { AuthContext } from "@/components/contextTypes";
import Link from "next/link";
import Loader from "@/components/loader";
import { Clock, HeartMinus, HeartPlus } from "lucide-react";
import { readRecipe } from "@/api/recipeActions";
import { getUser, updateUser } from "@/api/userActions";

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

const RecipeContent = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [owner, setOwner] = useState<UserProfile | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([]);
  const { profile, updateProfile } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? ``;
  const isFavorite = !!(
    profile &&
    recipe &&
    profile.favorites?.includes(recipe.id)
  );
  const [loading, setLoading] = useState(true);

  const cookingTime = getCookingTimeLabel(recipe?.time ? recipe.time : 30);

  useEffect(() => {
    setLoading(true);
    if (id) {
      readRecipe(Number(id)).then((x) => {
        if (x) setRecipe(x);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (recipe && recipe.owner_id) {
      getUser(recipe.owner_id).then((x) => {
        if (x) setOwner(x);
      });
    }
  }, [recipe]);

  useEffect(() => {
    if (recipe?.steps) {
      setCheckedSteps(Array(recipe.steps.length).fill(false));
    }
  }, [recipe?.steps]);

  const handleStepCheck = (index: number) => {
    setCheckedSteps((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleSetFavorite = async () => {
    if (profile && recipe) {
      console.log("Favorites action started:", {
        userId: profile.id,
        recipeId: recipe.id,
        currentFavorites: profile.favorites,
        isFavorite: isFavorite,
      });

      // Ensure favorites is always an array
      const currentFavorites = Array.isArray(profile.favorites)
        ? profile.favorites
        : [];

      let updatedFavorites;
      if (isFavorite) {
        // Remove favorite if it exists
        updatedFavorites = currentFavorites.filter((f) => f !== recipe.id);
      } else {
        // Add favorite if it doesn't exist
        updatedFavorites = [...currentFavorites, recipe.id];
      }

      console.log("Updated favorites list:", updatedFavorites);

      try {
        await updateUser({
          id: profile.id,
          bio: profile.bio,
          updatedList: updatedFavorites,
        });

        // Only update local state if API call succeeded
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-[1440px] mb-30 px-2 flex gap-10 w-full flex-wrap lg:flex-nowrap font-primary text-brand-black dark:text-brand-white">
      <div className="flex flex-col gap-5 md:gap-10 w-full">
        <div className="relative aspect-[308/181] w-full rounded-md overflow-hidden shadow-md">
          <Image
            fill
            src={recipe?.image ? recipe.image : "/default.jpg"}
            alt={recipe?.name ? recipe.name : "no image found"}
            className="object-cover"
          />
        </div>
        <div className="border-1 p-5 shadow-md flex flex-col gap-5 rounded-md border-brand-black dark:border-brand-white">
          <h2 className="headlineTwo flex justify-between pb-2 border-b-1 border-brand-black dark:border-brand-white">
            Ingredients
            <p>Portions: {recipe?.portions}</p>
          </h2>

          {recipe?.ingredients.map((ingredientGroup) => (
            <div key={ingredientGroup.groupName}>
              <p className="text-lg font-semibold">
                {ingredientGroup.groupName}
              </p>
              <ul className="ml-5">
                {ingredientGroup.ingredients.map((ingredient, i) => (
                  <li className="text-lg" key={ingredient + i}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
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
        <Link
          href={`/profile?id=${owner?.id}`}
          className="flex gap-5 items-center py-2 border-b-1 border-brand-black dark:border-brand-white"
        >
          <div className="relative  aspect-square w-[50px] rounded-full overflow-hidden shadow-md">
            <Image
              fill
              src={owner?.avatar ? owner.avatar : "/default.jpg"}
              alt={owner?.name ? owner.name : "no image found"}
              className="object-cover"
            />
          </div>
          <p className="text-lg">{owner?.name}</p>
        </Link>
        <div className="flex flex-col gap-5 py-2">
          <h3 className="headlineTwo">How to do it!</h3>

          {recipe?.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4 py-1 min-h-[32px]">
              <input
                type="checkbox"
                id={`step-checkbox-${i}`}
                className={`shrink-0 cursor-pointer w-5 h-5 rounded-md border-2 border-brand-orange appearance-none transition-colors duration-200 ${
                  checkedSteps[i] ? "bg-brand-orange" : "bg-transparent"
                }`}
                checked={checkedSteps[i] || false}
                onChange={() => handleStepCheck(i)}
              />
              <p
                className={
                  checkedSteps[i]
                    ? "line-through text-brand-black dark:text-brand-white"
                    : ""
                }
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Recipe = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RecipeContent />
    </Suspense>
  );
};

export default Recipe;
