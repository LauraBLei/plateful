import type { Recipe } from "@/types/recipe";
import Link from "next/link";
import type { UserProfile } from "../../../lib/types/user";
import { readFavoriteRecipes } from "../../api/recipeActions";

interface OptionsProps {
  variant?: "desktop" | "tablet";
  setActiveTab: (tab: "recipes" | "favorites") => void;
  setCurrentRecipes: (recipes: Recipe[]) => void;
  isFabTabActive: boolean;
  profile: UserProfile;
  serverRecipes: Recipe[];
}

export const Options = ({
  variant = "desktop",
  setActiveTab,
  setCurrentRecipes,
  isFabTabActive,
  profile,
  serverRecipes,
}: OptionsProps) => {
  const handleRecipesClick = () => {
    setActiveTab("recipes");
    setCurrentRecipes(serverRecipes);
  };

  const handleFavoritesClick = async () => {
    setActiveTab("favorites");
    try {
      console.log("Fetching favorite recipes for user:", profile.id);
      console.log("Fetching favorite recipes for user:", profile.favorites);

      const favoriteRecipes = await readFavoriteRecipes({
        id: profile.id,
        favorites: profile.favorites || [],
      });
      console.log("Favorite recipes fetched:", favoriteRecipes);

      setCurrentRecipes(favoriteRecipes);
    } catch (error) {
      console.error("Failed to load favorite recipes:", error);
      setCurrentRecipes([]);
    }
  };
  const containerClasses =
    variant === "desktop"
      ? "flex flex-col gap-5 w-full"
      : "flex flex-col my-5 gap-2 w-full";

  const buttonClasses = variant === "desktop" ? "button" : "button w-full";

  return (
    <div className={containerClasses}>
      {variant === "desktop" ? (
        <>
          <button
            onClick={handleRecipesClick}
            className={`${buttonClasses} ${
              !isFabTabActive ? "button-active" : "hover-effect"
            }`}
          >
            Your Recipes
          </button>
          <button
            onClick={handleFavoritesClick}
            className={`${buttonClasses} ${
              isFabTabActive ? "button-active" : "hover-effect"
            }`}
          >
            Your Favorites
          </button>
        </>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={handleRecipesClick}
            className={`button ${
              !isFabTabActive ? "button-active" : "hover-effect"
            }`}
          >
            Your Recipes
          </button>
          <button
            onClick={handleFavoritesClick}
            className={`button ${
              isFabTabActive ? "button-active" : "hover-effect"
            }`}
          >
            Your Favorites
          </button>
        </div>
      )}

      <Link className={`${buttonClasses} hover-effect`} href={"/create"}>
        Add a recipe
      </Link>
    </div>
  );
};
