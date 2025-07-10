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
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile?.name || "");
  const [nameUpdateSuccess, setNameUpdateSuccess] = useState(false);
  const [isFollowingLocal, setIsFollowingLocal] = useState(false);
  const [followActionInProgress, setFollowActionInProgress] = useState(false);

  const searchParams = useSearchParams();
  const profileIdFromUrl = searchParams.get("id");
  const [otherProfile, setOtherProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !profileIdFromUrl || profileIdFromUrl === profile?.id;

  // Use local state for follow status to prevent race conditions
  const isFollowingUser = isFollowingLocal;

  useEffect(() => {
    setLoading(true);
    if (isOwnProfile && profile) {
      // Fetch complete user data with follower info, even for own profile
      getUser(profile.id).then((x) => {
        if (x) setOtherProfile(x);
      });

      readUserRecipes(profile.id).then((x) => {
        if (x) setRecipes(x);
      });
      readFavoriteRecipes({
        id: profile.id,
        favorites: profile?.favorites,
      }).then((x) => {
        if (x) setFavorites(x);
      });
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

  // Sync input fields when profile data changes
  useEffect(() => {
    if (profile) {
      setBioInput(profile.bio || "");
      setNameInput(profile.name || "");
    }
  }, [profile]);

  // Initialize follow state when data loads
  useEffect(() => {
    if (profile && otherProfile && !isOwnProfile) {
      const isFollowing = !!(
        Array.isArray(profile.following) &&
        profile.following.includes(otherProfile.id)
      );
      setIsFollowingLocal(isFollowing);
    }
  }, [profile, otherProfile, isOwnProfile]);

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

  const updateName = async (newName: string) => {
    if (profile && updateProfile) {
      await updateUser({
        id: profile?.id,
        name: newName,
        updatedList: profile?.favorites,
      });
      // Show success message
      setNameUpdateSuccess(true);
      // Wait 2 seconds then reload the page
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleBioClick = () => {
    setBioInput(profile?.bio || "");
    setEditingBio(true);
  };

  const handleNameClick = () => {
    setNameInput(profile?.name || "");
    setEditingName(true);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBioInput(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handleFollow = async () => {
    if (!profile || !otherProfile || followActionInProgress) {
      console.log("Follow action blocked:", {
        hasProfile: !!profile,
        hasOtherProfile: !!otherProfile,
        inProgress: followActionInProgress,
      });
      return;
    }

    setFollowActionInProgress(true);

    console.log("Follow action started:", {
      currentUser: profile.id,
      targetUser: otherProfile.id,
      isCurrentlyFollowing: profile.following?.includes(otherProfile.id),
    });

    // Ensure arrays are always arrays, not null
    let newFollowing = Array.isArray(profile.following)
      ? [...profile.following]
      : [];
    let newFollowers = Array.isArray(otherProfile.followers)
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

    try {
      // Update both users in parallel but handle errors
      const [result1, result2] = await Promise.allSettled([
        updateUser({
          id: profile.id,
          followingUpdated: newFollowing,
        }),
        updateUser({
          id: otherProfile.id,
          followersUpdated: newFollowers,
        }),
      ]);

      console.log("Follow update results:", { result1, result2 });

      // Only update local state if both succeeded
      if (result1.status === "fulfilled" && result2.status === "fulfilled") {
        if (updateProfile) updateProfile({ following: newFollowing });
        setOtherProfile({ ...otherProfile, followers: newFollowers });
        setIsFollowingLocal(!isFollowing); // Update local follow state
        console.log("Follow action completed successfully");
      } else {
        console.error("Follow action failed:", { result1, result2 });
      }
    } catch (error) {
      console.error("Follow action error:", error);
    } finally {
      setFollowActionInProgress(false);
    }
  };

  const handleBioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBio(bioInput);
    setEditingBio(false);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateName(nameInput);
    setEditingName(false);
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
        isLoggedIn={!!profile}
        followActionInProgress={followActionInProgress}
      />
    );
  }

  return (
    <div className="px-2 mb-30 flex w-full h-full max-w-[1440px] gap-5 font-primary text-brand-black dark:text-brand-white">
      {isOwnProfile && profile && otherProfile && (
        <UserProfilePage
          profile={otherProfile}
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
