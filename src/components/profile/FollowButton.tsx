import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "src/providers/AuthProvider";
import { UserProfile } from "src/types/user";
import { updateUser } from "../../api/userActions";

interface FollowButtonProps {
  targetUser: UserProfile | null;
  variant?: "desktop" | "tablet";
}

const removeId = (userId: string, arr: string[]) =>
  arr.filter((id) => id !== userId);

const addId = (userId: string, arr: string[]) => {
  if (arr.includes(userId)) {
    return arr;
  }
  return [...arr, userId];
};

export const FollowButton: React.FC<FollowButtonProps> = ({
  targetUser,
  variant = "desktop",
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(
    (targetUser && user?.following?.includes(targetUser.id)) ?? false
  );

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    // Update UI immediately for instant feedback
    const previousFollowingState = isFollowing;
    setIsFollowing(!isFollowing);

    try {
      if (!targetUser || !user) {
        return;
      }

      const updatedFollowing = previousFollowingState
        ? removeId(targetUser.id, user.following || [])
        : addId(targetUser.id, user.following || []);

      const updatedFollowers = previousFollowingState
        ? removeId(user.id, targetUser.followers || [])
        : addId(user.id, targetUser.followers || []);

      const updateCurrentUserPromise = updateUser({
        id: user.id,
        followingUpdated: updatedFollowing,
      });

      const updateTargetUserPromise = updateUser({
        id: targetUser.id,
        followersUpdated: updatedFollowers,
      });

      await Promise.all([updateCurrentUserPromise, updateTargetUserPromise]);

      router.refresh();
    } catch (error) {
      console.error("Error updating follow status:", error);
      // Revert the UI change if the API call failed
      setIsFollowing(previousFollowingState);
      alert("Failed to update follow status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null; // Don't show follow button if not logged in
  }

  const buttonClass =
    variant === "tablet"
      ? "button text-sm max-w-[150px]"
      : "button max-w-[150px]";

  return (
    <button
      className={`${buttonClass} ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleFollow}
      disabled={isLoading}
    >
      {isLoading ? "..." : isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};
