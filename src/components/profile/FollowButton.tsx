import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { UserProfile } from "src/types/user";
import { updateUser } from "../../api/userActions";

interface FollowButtonProps {
  targetUser: UserProfile | null;
  loggedInUser?: UserProfile | null;
  variant?: "desktop" | "tablet";
}

const removeId = (targetUser: UserProfile, arr: string[]) =>
  arr.filter((id) => id !== targetUser?.id);

const addId = (targetUser: UserProfile, arr: string[]) => [
  ...(arr || []),
  targetUser.id,
];

export const FollowButton: React.FC<FollowButtonProps> = ({
  targetUser,
  loggedInUser,
  variant = "desktop",
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isFollowing =
    (targetUser && loggedInUser?.following?.includes(targetUser.id)) || false;

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    try {
      if (!targetUser || !loggedInUser) {
        return;
      }
      const updatedFollowing = isFollowing
        ? removeId(targetUser, loggedInUser.following)
        : addId(targetUser, loggedInUser.following);

      const updatedFollowers = isFollowing
        ? removeId(targetUser, targetUser.followers)
        : addId(targetUser, targetUser.followers);

      const updateCurrentUserPromise = updateUser({
        id: loggedInUser.id,
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
      alert("Failed to update follow status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!loggedInUser) {
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
