import { RecipeCard } from "@/components/shared/RecipeCard";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { RecipeFilter, useRecipeFilter } from "./filter";
import { FollowModal } from "./follow";

import type { Recipe } from "@/types/recipe";
import type { UserProfile } from "@/types/user";

interface UserProfileProps {
  profile: UserProfile;
  editingBio: boolean;
  bioInput: string;
  handleBioClick: () => void;
  handleBioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBioSubmit: (e: React.FormEvent) => void;
  editingName: boolean;
  nameInput: string;
  handleNameClick: () => void;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameSubmit: (e: React.FormEvent) => void;
  nameUpdateSuccess: boolean;
  activeTab: "recipes" | "favorites";
  setActiveTab: Dispatch<SetStateAction<"recipes" | "favorites">>;
  recipes: Recipe[];
  favorites: Recipe[];
}

export const UserProfilePage = ({
  profile,
  editingBio,
  bioInput,
  handleBioClick,
  handleBioChange,
  handleBioSubmit,
  editingName,
  nameInput,
  handleNameClick,
  handleNameChange,
  handleNameSubmit,
  nameUpdateSuccess,
  activeTab,
  setActiveTab,
  recipes,
  favorites,
}: UserProfileProps) => {
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  // Filter hooks for recipes and favorites
  const recipesFilter = useRecipeFilter();
  const favoritesFilter = useRecipeFilter();

  // Filter recipes locally based on applied filters (only when search button is pressed)
  const filteredRecipes = useMemo(() => {
    return recipesFilter.filterRecipesLocally(recipes);
  }, [recipes, recipesFilter]);

  const filteredFavorites = useMemo(() => {
    return favoritesFilter.filterRecipesLocally(favorites);
  }, [favorites, favoritesFilter]);

  const recipeTab = activeTab === "recipes";
  const favTab = activeTab === "favorites";
  return (
    <div className="flex flex-col gap-5 lg:flex-row w-full">
      <Desktop
        profile={profile}
        editingBio={editingBio}
        bioInput={bioInput}
        handleBioClick={handleBioClick}
        handleBioChange={handleBioChange}
        handleBioSubmit={handleBioSubmit}
        editingName={editingName}
        nameInput={nameInput}
        handleNameClick={handleNameClick}
        handleNameChange={handleNameChange}
        handleNameSubmit={handleNameSubmit}
        nameUpdateSuccess={nameUpdateSuccess}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onShowFollowers={() => setShowFollowersModal(true)}
        onShowFollowing={() => setShowFollowingModal(true)}
      />
      <Tablet
        profile={profile}
        editingBio={editingBio}
        bioInput={bioInput}
        handleBioClick={handleBioClick}
        handleBioChange={handleBioChange}
        handleBioSubmit={handleBioSubmit}
        editingName={editingName}
        nameInput={nameInput}
        handleNameClick={handleNameClick}
        handleNameChange={handleNameChange}
        handleNameSubmit={handleNameSubmit}
        nameUpdateSuccess={nameUpdateSuccess}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onShowFollowers={() => setShowFollowersModal(true)}
        onShowFollowing={() => setShowFollowingModal(true)}
      />
      {recipeTab && (
        <div className="h-full flex flex-col  gap-5 w-full">
          {/* Filter for recipes */}
          <RecipeFilter
            selectedTags={recipesFilter.selectedTags}
            selectedLanguage={recipesFilter.selectedLanguage}
            selectedTime={recipesFilter.selectedTime}
            showMobileFilter={recipesFilter.showMobileFilter}
            onTagChange={recipesFilter.handleTagChange}
            onLanguageChange={recipesFilter.handleLanguageChange}
            onTimeChange={recipesFilter.handleTimeChange}
            onFilter={recipesFilter.handleFilter}
            onToggleMobileFilter={recipesFilter.handleToggleMobileFilter}
            title="Filter your recipes"
            forceMobileLayout={true}
          />

          <div className="w-full flex flex-col gap-5">
            <h1 className="headline">Your Recipes</h1>
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
                ? "No recipes match your filters."
                : "You have no recipes yet!"}
            </div>
          </div>
        </div>
      )}
      {favTab && (
        <div className="h-full flex flex-col  gap-5 w-full">
          {/* Filter for favorites */}
          <RecipeFilter
            selectedTags={favoritesFilter.selectedTags}
            selectedLanguage={favoritesFilter.selectedLanguage}
            selectedTime={favoritesFilter.selectedTime}
            showMobileFilter={favoritesFilter.showMobileFilter}
            onTagChange={favoritesFilter.handleTagChange}
            onLanguageChange={favoritesFilter.handleLanguageChange}
            onTimeChange={favoritesFilter.handleTimeChange}
            onFilter={favoritesFilter.handleFilter}
            onToggleMobileFilter={favoritesFilter.handleToggleMobileFilter}
            title="Filter your favorites"
            forceMobileLayout={true}
          />

          <div className="w-full flex flex-col gap-5">
            <h1 className="headline">Your Favorites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredFavorites.length > 0
                ? filteredFavorites.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      id={recipe.id}
                      image={recipe.image}
                      title={recipe.name}
                      time={recipe.time}
                      owner={recipe.owner}
                    />
                  ))
                : favorites.length > 0
                ? "No favorites match your filters."
                : "You have no favorites"}
            </div>
          </div>
        </div>
      )}

      {/* Followers Modal */}
      <FollowModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        title="Followers"
        users={profile.followersInfo || []}
        emptyMessage="No followers yet."
      />

      {/* Following Modal */}
      <FollowModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        title="Following"
        users={profile.followingInfo || []}
        emptyMessage="Not following anyone yet."
      />
    </div>
  );
};

interface DesktopProps {
  profile: UserProfile;
  editingBio: boolean;
  bioInput: string;
  handleBioClick: () => void;
  handleBioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBioSubmit: (e: React.FormEvent) => void;
  editingName: boolean;
  nameInput: string;
  handleNameClick: () => void;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameSubmit: (e: React.FormEvent) => void;
  nameUpdateSuccess: boolean;
  activeTab: "recipes" | "favorites";
  setActiveTab: Dispatch<SetStateAction<"recipes" | "favorites">>;
  onShowFollowers: () => void;
  onShowFollowing: () => void;
}

const Desktop = ({
  profile,
  editingBio,
  bioInput,
  handleBioClick,
  handleBioChange,
  handleBioSubmit,
  editingName,
  nameInput,
  handleNameClick,
  handleNameChange,
  handleNameSubmit,
  nameUpdateSuccess,
  activeTab,
  setActiveTab,
  onShowFollowers,
  onShowFollowing,
}: DesktopProps) => {
  const profileImage = profile ? profile.avatar : "/default.jpg";
  return (
    <div className="p-10 lg:min-h-[800px] hidden lg:flex  flex-col shadow-md lg:max-w-[350px] w-full border-1 dark:border-brand-white rounded-md h-full">
      <div className="w-full items-center flex flex-col gap-5 mb-10">
        <div className="relative rounded-full aspect-square max-w-[130px] lg:max-w-[170px] w-full overflow-hidden">
          <Image
            fill
            src={profileImage}
            alt={profile?.name ?? "profile name not found"}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="relative flex justify-center items-center">
            {editingName ? (
              <form
                onSubmit={handleNameSubmit}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={nameInput}
                  onChange={handleNameChange}
                  className="input text-center text-2xl font-semibold"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2"
                  aria-label="Save name"
                >
                  <Edit size={16} />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <h1
                  className="text-center text-2xl cursor-pointer pr-6"
                  onClick={handleNameClick}
                >
                  {profile?.name}
                </h1>
                <button
                  type="button"
                  className=" cursor-pointer"
                  aria-label="Edit name"
                  onClick={handleNameClick}
                >
                  <Edit size={16} />
                </button>
              </div>
            )}
          </div>
          {nameUpdateSuccess && (
            <div className="text-center font-primary text-brand-orange text-sm ">
              Name updated
            </div>
          )}
          <div className="flex gap-5">
            <button
              onClick={onShowFollowers}
              className="text-sm flex gap-2 hover:text-brand-orange cursor-pointer"
            >
              {profile.followers ? profile.followers.length : 0}
              {profile.followers && profile.followers.length === 1
                ? " Follower"
                : " Followers"}
            </button>
            <button
              onClick={onShowFollowing}
              className="text-sm hover:text-brand-orange cursor-pointer"
            >
              {profile.following ? profile.following.length : 0}
              {profile.following && profile.following.length === 1
                ? " Following"
                : " Following"}
            </button>
          </div>
        </div>
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
            <div>
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
            </div>
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
  );
};

const Tablet = ({
  profile,
  editingBio,
  bioInput,
  handleBioClick,
  handleBioChange,
  handleBioSubmit,
  editingName,
  nameInput,
  handleNameClick,
  handleNameChange,
  handleNameSubmit,
  nameUpdateSuccess,
  activeTab,
  setActiveTab,
  onShowFollowers,
  onShowFollowing,
}: DesktopProps) => {
  const profileImage = profile ? profile.avatar : "/default.jpg";

  return (
    <div className="flex lg:hidden w-full">
      <div className="w-full">
        <div className="flex w-full gap-10 items-center">
          <div className="relative rounded-full aspect-square max-w-[100px] md:max-w-[130px]  w-full overflow-hidden">
            <Image
              fill
              src={profileImage}
              alt={profile?.name ?? "profile name not found"}
              className="object-cover"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="relative flex items-center w-full">
              {editingName ? (
                <form
                  onSubmit={handleNameSubmit}
                  className="flex items-center gap-2 w-full"
                >
                  <input
                    type="text"
                    value={nameInput}
                    onChange={handleNameChange}
                    className="input headline w-full"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                    aria-label="Save name"
                  >
                    <Edit size={16} />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <h1
                    className="headline w-full cursor-pointer pr-6"
                    onClick={handleNameClick}
                  >
                    {profile.name}
                  </h1>
                  <button
                    type="button"
                    className="cursor-pointer"
                    aria-label="Edit name"
                    onClick={handleNameClick}
                  >
                    <Edit size={16} />
                  </button>
                </div>
              )}
            </div>
            {nameUpdateSuccess && (
              <div className="font-primary text-brand-orange text-sm">
                Name updated
              </div>
            )}
            <div className="flex items-center w-full gap-5">
              <button
                onClick={onShowFollowers}
                className="text-sm flex gap-2 hover:text-brand-orange cursor-pointer"
              >
                {profile.followers ? profile.followers.length : 0}
                {profile.followers && profile.followers.length === 1
                  ? " Follower"
                  : " Followers"}
              </button>
              <button
                onClick={onShowFollowing}
                className="text-sm hover:text-brand-orange cursor-pointer"
              >
                {profile.following ? profile.following.length : 0}
                {profile.following && profile.following.length === 1
                  ? " Following"
                  : " Following"}
              </button>
            </div>
          </div>
        </div>
        <div className="relative flex w-full my-5 items-center  text-sm">
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
            <div>
              <p
                className="italic  w-full cursor-pointer pr-8"
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
            </div>
          )}
        </div>
        <div className="flex flex-col my-5 gap-2 w-full">
          <div className="flex gap-2">
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
          </div>

          <Link className="button w-full hover-effect" href={"/create"}>
            Add a recipe
          </Link>
        </div>
      </div>
    </div>
  );
};
