"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context";
import { readUserRecipes } from "../api/recipe/read";
import type { Recipe } from "../../../lib/types/recipe";
import { RecipeCard } from "../../components/card";
import Link from "next/link";

const Profile = () => {
  const { user, profile } = useContext(AuthContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeTab, setActiveTab] = useState<"recipes" | "favorites">(
    "recipes"
  );

  const recipeTab = activeTab === "recipes";
  const favTab = activeTab === "favorites";
  useEffect(() => {
    if (user) {
      readUserRecipes(user.id).then((x) => {
        if (x) setRecipes(x);
      });
    }
  }, [user]);

  return (
    <div className="px-2 flex h-full gap-5 font-primary text-brand-black dark:text-brand-white">
      <div className="p-10 min-h-[800px] shadow-md max-w-[435px] w-full border-1 dark:border-brand-white rounded-md h-full">
        <div className="w-full items-center flex flex-col gap-5 mb-10">
          <div className="rounded-full max-w-[170px] w-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={user?.user_metadata.avatar_url}
              alt={user?.user_metadata.full_name}
            />
          </div>
          <h1 className="text-center text-2xl">{profile?.name}</h1>
          <p className="italic">
            {profile && profile.bio ? profile.bio : "no bio added yet"}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <button
            onClick={() => setActiveTab("recipes")}
            className={`button ${
              activeTab === "recipes" ? "button-active" : "hover-effect"
            }`}
          >
            Your Recipes
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`button ${
              activeTab === "favorites" ? "button-active" : "hover-effect"
            }`}
          >
            Your Favorites
          </button>
          <Link className="button hover-effect" href={"/create"}>
            Add a recipe
          </Link>
        </div>
      </div>
      {recipeTab && (
        <div className="h-full flex flex-col gap-5">
          <h1 className="headline ">Your Recipes</h1>
          <div className="flex flex-wrap gap-5">
            {recipes.length > 0
              ? recipes.map((recipe) => (
                  <RecipeCard
                    time={recipe.time}
                    title={recipe.name}
                    image={recipe.image}
                  />
                ))
              : "You have no recipes yet!"}
          </div>
        </div>
      )}
      {favTab && <div className="h-full">Favorite feature coming soon</div>}
    </div>
  );
};

export default Profile;
