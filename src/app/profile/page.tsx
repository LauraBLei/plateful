"use client";

import { AuthContext } from "@/components/contextTypes";
import { OtherProfile } from "@/components/otherProfile";
import { UserProfilePage } from "@/components/userProfile";
import { useContext, useEffect, useState, Suspense } from "react";
import { Recipe } from "@/types/recipe";
import { useSearchParams } from "next/navigation";
import type { UserProfile } from "@/types/user";
import Loader from "@/components/loader";
import {
  readUserRecipes,
  readFavoriteRecipes,
  getUser,
  updateUser,
} from "@/api/profileApi";

const ProfileContent = () => {
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
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !profileIdFromUrl || profileIdFromUrl === profile?.id;

  const isFollowingUser = !!(
    profile &&
    otherProfile &&
    profile.following?.includes(otherProfile.id)
  );

  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
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
  if (loading) {
    return <Loader />;
  }
  if (!isOwnProfile && otherProfile) {
    // Render a different layout for other users' profiles
    return (
      <OtherProfile
        otherProfile={otherProfile}
        isFollowingUser={isFollowingUser}
        handleFollow={handleFollow}
        recipes={recipes}
      />
    );
  }

  return (
    <div className="px-2 mb-30 flex w-full h-full max-w-[1440px] gap-5 font-primary text-brand-black dark:text-brand-white">
      {isOwnProfile && profile && (
        <UserProfilePage
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

const Profile = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ProfileContent />
    </Suspense>
  );
};

export default Profile;
