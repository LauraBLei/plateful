"use client";

import { AuthContext } from "@/components/contextTypes";
import { UserProfile as UserProfileComponent } from "@/components/userProfile";
import { useContext, useEffect, useState } from "react";
import { Recipe } from "../../../lib/types/recipe";
import { readFavoriteRecipes, readUserRecipes } from "../api/recipe/read";
import { useSearchParams } from "next/navigation";
import type { UserProfile } from "../../../lib/types/user";
import { getUser, updateUser } from "../api/auth/user";
import { RecipeCard } from "@/components/card";
import Image from "next/image";

const Profile = () => {
  const { profile, updateProfile } = useContext(AuthContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [activeTab, setActiveTab] = useState<"recipes" | "favorites">(
    "recipes"
  );
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(profile?.bio || "");

  const searchParams = useSearchParams();
  const profileIdFromUrl = searchParams.get("id");
  const [otherProfile, setOtherProfile] = useState<UserProfile | null>(null);

  const isOwnProfile = !profileIdFromUrl || profileIdFromUrl === profile?.id;

  const isFollowingUser = !!(
    profile &&
    otherProfile &&
    profile.following?.includes(otherProfile.id)
  );

  useEffect(() => {
    if (isOwnProfile && profile) {
      readUserRecipes(profile.id).then((x) => {
        if (x) setRecipes(x);
      });
      readFavoriteRecipes({
        id: profile.id,
        favorites: profile?.favorites,
      }).then((x) => {
        if (x) setFavorites(x);
      });
      setOtherProfile(null);
    } else if (profileIdFromUrl) {
      getUser(profileIdFromUrl).then((x) => {
        if (x) setOtherProfile(x);
      });

      readUserRecipes(profileIdFromUrl).then((x) => {
        if (x) setRecipes(x);
      });
      setFavorites([]);
    }
  }, [profile, profileIdFromUrl, isOwnProfile]);

  const updateBio = (newBio: string) => {
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

  const handleFollow = async () => {
    if (!profile || !otherProfile) return;
    let newFollowing = profile.following ? [...profile.following] : [];
    let newFollowers = otherProfile.followers
      ? [...otherProfile.followers]
      : [];
    const isFollowing = newFollowing.includes(otherProfile.id);

    if (isFollowing) {
      newFollowing = newFollowing.filter((id) => id !== otherProfile.id);
      newFollowers = newFollowers.filter((id) => id !== profile.id);
    } else {
      newFollowing.push(otherProfile.id);
      newFollowers.push(profile.id);
    }

    // Only update what is needed
    await updateUser({
      id: profile.id,
      followingUpdated: newFollowing,
    });
    await updateUser({
      id: otherProfile.id,
      followersUpdated: newFollowers,
    });
    if (updateProfile) updateProfile({ following: newFollowing });
    setOtherProfile({ ...otherProfile, followers: newFollowers });
  };

  const handleBioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBio(bioInput);
    setEditingBio(false);
  };
  if (!isOwnProfile && otherProfile) {
    // Render a different layout for other users' profiles
    return (
      <div className="px-2 flex flex-col w-full h-full max-w-[1440px] gap-5 font-primary text-brand-black dark:text-brand-white">
        <div className="flex items-center flex-wrap gap-10">
          <div className="relative rounded-full aspect-square max-w-[170px] w-full overflow-hidden">
            <Image
              fill
              src={otherProfile.avatar || "/default.jpg"}
              alt={otherProfile.name || "profile name not found"}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="headline flex justify-between items-center">
              {otherProfile.name}{" "}
              <p className="text-sm">
                {otherProfile.followers ? otherProfile.followers.length : 0}{" "}
                {otherProfile.followers && otherProfile.followers.length === 1
                  ? "Follower"
                  : "Followers"}
              </p>
            </h1>
            <p className="p-2 italic border-brand-black dark:border-brand-white">
              {otherProfile.bio}
            </p>
          </div>
          <button className="button max-w-[150px]" onClick={handleFollow}>
            {isFollowingUser ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="h-full flex flex-col gap-5 w-full">
          <h1 className="headline ">{otherProfile.name}&apos;s Recipes</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2">
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
              : `${otherProfile.name} has no recipes yet!`}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 flex w-full h-full max-w-[1440px] gap-5 font-primary text-brand-black dark:text-brand-white">
      {isOwnProfile && profile && (
        <UserProfileComponent
          profile={profile}
          editingBio={editingBio}
          bioInput={bioInput}
          handleBioClick={handleBioClick}
          handleBioChange={handleBioChange}
          handleBioSubmit={handleBioSubmit}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          recipes={recipes}
          favorites={favorites}
        />
      )}
    </div>
  );
};

export default Profile;
