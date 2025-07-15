import Link from "next/link";
import { Recipe } from "src/types/recipe";
import { readFavoriteRecipes } from "../../api/recipeActions";
import type { UserProfile } from "../../types/user";

interface OptionsProps {
  variant?: "desktop" | "tablet";
  setActiveTab: (tab: "recipes" | "favorites") => void;
  setCurrentRecipes: (recipes: Recipe[]) => void;
  isFabTabActive: boolean;
  profile: UserProfile;
  serverRecipes: Recipe[];
  isOwnProfile?: boolean;
}

export const Options = ({
  variant = "desktop",
  setActiveTab,
  setCurrentRecipes,
  isFabTabActive,
  profile,
  serverRecipes,
  isOwnProfile = false,
}: OptionsProps) => {
  const handleRecipesClick = () => {
    setActiveTab("recipes");
    setCurrentRecipes(serverRecipes);
  };

  const handleFavoritesClick = async () => {
    setActiveTab("favorites");
    try {
      const favoriteRecipes = await readFavoriteRecipes({
        id: profile.id,
        favorites: profile.favorites || [],
      });

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
            {isOwnProfile ? "Your Recipes" : `${profile?.name}'s Recipes`}
          </button>
          <button
            onClick={handleFavoritesClick}
            className={`${buttonClasses} ${
              isFabTabActive ? "button-active" : "hover-effect"
            }`}
          >
            {isOwnProfile ? "Your Favorites" : `${profile?.name}'s Favorites`}
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
            {isOwnProfile ? "Your Recipes" : `${profile?.name}'s Recipes`}
          </button>
          <button
            onClick={handleFavoritesClick}
            className={`button ${
              isFabTabActive ? "button-active" : "hover-effect"
            }`}
          >
            {isOwnProfile ? "Your Favorites" : `${profile?.name}'s Favorites`}
          </button>
        </div>
      )}

      {isOwnProfile && (
        <Link className={`${buttonClasses} hover-effect`} href={"/create"}>
          Add a recipe
        </Link>
      )}
    </div>
  );
};
