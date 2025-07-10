"use client";

import { AuthContext } from "@/components/contextTypes";
import { OtherProfile } from "@/components/otherProfile";
import { UserProfilePage } from "@/components/userProfile";
import {
  useContext,
  useEffect,
  useState,
  Suspense,
  useCallback,
  useRef,
} from "react";
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
  const lastFollowActionRef = useRef<number>(0);

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
    } else if (profileIdFromUrl && profile) {
      // Get fresh profile data for the current user to ensure following list is up to date
      getUser(profile.id).then((currentUserData) => {
        if (currentUserData && updateProfile) {
          updateProfile(currentUserData);
        }
      });

      getUser(profileIdFromUrl).then((x) => {
        if (x) setOtherProfile(x);
      });

      readUserRecipes(profileIdFromUrl).then((x) => {
        if (x) setRecipes(x);
      });
      setFavorites([]);
    }
    setLoading(false);
  }, [profile, profileIdFromUrl, isOwnProfile, updateProfile]);

  // Sync input fields when profile data changes
  useEffect(() => {
    if (profile) {
      setBioInput(profile.bio || "");
      setNameInput(profile.name || "");
    }
  }, [profile]);

  // Keep isFollowingLocal in sync with profile.following changes
  useEffect(() => {
    if (profile && otherProfile && !isOwnProfile) {
      const isFollowing = !!(
        Array.isArray(profile.following) &&
        profile.following.includes(otherProfile.id)
      );
      setIsFollowingLocal(isFollowing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.following, otherProfile?.id, profile?.id, isOwnProfile]);

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

  const handleFollow = useCallback(async () => {
    const now = Date.now();

    // Debounce: prevent multiple clicks within 1 second
    if (now - lastFollowActionRef.current < 1000) {
      console.log("Follow action debounced - too soon after last action");
      return;
    }

    if (!profile || !otherProfile || followActionInProgress) {
      console.log("Follow action blocked:", {
        hasProfile: !!profile,
        hasOtherProfile: !!otherProfile,
        inProgress: followActionInProgress,
      });
      return;
    }

    lastFollowActionRef.current = now;
    const actionId = now;

    // Use the current follow state (get fresh value each time instead of depending on it)
    const currentIsFollowing = !!(
      Array.isArray(profile.following) &&
      profile.following.includes(otherProfile.id)
    );

    console.log(`Follow action ${actionId} started:`, {
      currentUser: profile.id,
      targetUser: otherProfile.id,
      isCurrentlyFollowing: currentIsFollowing,
      followActionInProgress,
    });

    setFollowActionInProgress(true);

    // Use the current follow state instead of isFollowingLocal
    const isCurrentlyFollowing = currentIsFollowing;

    // Ensure arrays are always arrays, not null
    let newFollowing = Array.isArray(profile.following)
      ? [...profile.following]
      : [];
    let newFollowers = Array.isArray(otherProfile.followers)
      ? [...otherProfile.followers]
      : [];

    if (isCurrentlyFollowing) {
      // Unfollowing
      newFollowing = newFollowing.filter((id) => id !== otherProfile.id);
      newFollowers = newFollowers.filter((id) => id !== profile.id);
    } else {
      // Following
      if (!newFollowing.includes(otherProfile.id)) {
        newFollowing.push(otherProfile.id);
      }
      if (!newFollowers.includes(profile.id)) {
        newFollowers.push(profile.id);
      }
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

      console.log(`Follow action ${actionId} update results:`, {
        result1,
        result2,
      });

      // Only update local state if both succeeded
      if (result1.status === "fulfilled" && result2.status === "fulfilled") {
        // Update the current user's following list in context
        if (updateProfile) updateProfile({ following: newFollowing });

        // Update the other user's followers list locally
        setOtherProfile({ ...otherProfile, followers: newFollowers });

        console.log(
          `Follow action ${actionId} completed successfully. New state:`,
          !isCurrentlyFollowing
        );
      } else {
        console.error(`Follow action ${actionId} failed:`, {
          result1,
          result2,
        });
      }
    } catch (error) {
      console.error(`Follow action ${actionId} error:`, error);
    } finally {
      setFollowActionInProgress(false);
      console.log(
        `Follow action ${actionId} finished, followActionInProgress set to false`
      );
    }
    // Note: intentionally NOT including isFollowingLocal to prevent circular dependency
  }, [profile, otherProfile, followActionInProgress, updateProfile]);

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
