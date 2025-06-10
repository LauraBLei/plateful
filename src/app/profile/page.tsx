"use client";

import { AuthContext } from "@/components/contextTypes";
import { useContext, useEffect, useState } from "react";
import { Recipe } from "../../../lib/types/recipe";
import { readFavoriteRecipes, readUserRecipes } from "../api/recipe/read";
import Link from "next/link";
import { RecipeCard } from "@/components/card";
import Image from "next/image";
import { Edit } from "lucide-react";
import { updateUser } from "../api/auth/user";

const Profile = () => {
  const { profile, updateProfile } = useContext(AuthContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [activeTab, setActiveTab] = useState<"recipes" | "favorites">(
    "recipes"
  );
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(profile?.bio || "");
  const profileImage = profile ? profile.avatar : "/default.jpg";

  const recipeTab = activeTab === "recipes";
  const favTab = activeTab === "favorites";
  useEffect(() => {
    if (profile) {
      readUserRecipes(profile.id).then((x) => {
        if (x) setRecipes(x);
      });
      readFavoriteRecipes({
        id: profile.id,
        favorites: profile?.favorites,
      }).then((x) => {
        if (x) setFavorites(x);
      });
    }
  }, [profile]);

  const updateBio = (newBio: string) => {
    // Add your update bio logic here, e.g., API call to update bio
    console.log("Bio updated to:", newBio);
    if (profile && updateProfile) {
      updateUser({
        id: profile?.id,
        bio: newBio,
        updatedList: profile?.favorites,
      });
      updateProfile({ bio: newBio });
    }
  };

  const handleBioClick = () => {
    setBioInput(profile?.bio || "");
    setEditingBio(true);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBioInput(e.target.value);
  };

  const handleBioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBio(bioInput);
    setEditingBio(false);
  };

  return (
    <div className="px-2 flex w-full h-full max-w-[1440px] gap-5 font-primary text-brand-black dark:text-brand-white">
      <div className="p-10 min-h-[800px] shadow-md max-w-[435px] w-full border-1 dark:border-brand-white rounded-md h-full">
        <div className="w-full items-center flex flex-col gap-5 mb-10">
          <div className="relative rounded-full aspect-square max-w-[170px] w-full overflow-hidden">
            <Image
              fill
              src={profileImage}
              alt={profile?.name ?? "profile name not found"}
              className="object-cover"
            />
          </div>
          <h1 className="text-center text-2xl">{profile?.name}</h1>
          <div className="relative flex w-full justify-center items-center">
            {editingBio ? (
              <form
                onSubmit={handleBioSubmit}
                className="flex w-full items-center gap-2"
              >
                <input
                  type="text"
                  value={bioInput}
                  onChange={handleBioChange}
                  className="input w-full"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  aria-label="Save bio"
                >
                  <Edit />
                </button>
              </form>
            ) : (
              <>
                <p
                  className="italic text-center w-full cursor-pointer pr-8"
                  onClick={handleBioClick}
                >
                  {profile && profile.bio ? profile.bio : "no bio added yet"}
                </p>
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  aria-label="Edit bio"
                  onClick={handleBioClick}
                >
                  <Edit />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
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
        <div className="h-full flex flex-col gap-5 w-full">
          <h1 className="headline ">Your Recipes</h1>
          <div className="flex flex-wrap gap-5">
            {recipes.length > 0
              ? recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    time={recipe.time}
                    title={recipe.name}
                    image={recipe.image}
                    id={recipe.id}
                  />
                ))
              : "You have no recipes yet!"}
          </div>
        </div>
      )}
      {favTab && (
        <div className="h-full flex flex-col gap-5 w-full">
          <h1 className="headline ">Your Favorites</h1>
          <div className="flex flex-wrap gap-5">
            {favorites.length > 0
              ? favorites.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    image={recipe.image}
                    title={recipe.name}
                    time={recipe.time}
                  />
                ))
              : "You have no favorites"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
