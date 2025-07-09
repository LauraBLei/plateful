import { RecipeCard } from "@/components/card";
import Link from "next/link";
import { Edit } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { FollowModal } from "./follow";

import type { UserProfile } from "@/types/user";
import type { Recipe } from "@/types/recipe";

interface UserProfileProps {
  profile: UserProfile;
  editingBio: boolean;
  bioInput: string;
  handleBioClick: () => void;
  handleBioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBioSubmit: (e: React.FormEvent) => void;
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
  activeTab,
  setActiveTab,
  recipes,
  favorites,
}: UserProfileProps) => {
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

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
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onShowFollowers={() => setShowFollowersModal(true)}
        onShowFollowing={() => setShowFollowingModal(true)}
      />
      {recipeTab && (
        <div className="h-full flex flex-col gap-5 w-full">
          <h1 className="headline ">Your Recipes</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2">
            {recipes.length > 0
              ? recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    time={recipe.time}
                    title={recipe.name}
                    image={recipe.image}
                    id={recipe.id}
                    isOwnRecipe
                  />
                ))
              : "You have no recipes yet!"}
          </div>
        </div>
      )}
      {favTab && (
        <div className="h-full flex flex-col gap-5 w-full">
          <h1 className="headline ">Your Favorites</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2">
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
          <h1 className="text-center text-2xl">{profile?.name}</h1>
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
            <h1 className="headline w-full">{profile.name}</h1>
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
