import type { UserProfile } from "@/types/user";
import { useState } from "react";
import { FollowModal } from "./follow";

interface FollowerInfoProps {
  targetUser: UserProfile;
  variant?: "desktop" | "tablet";
}

export const FollowerInfo = ({
  targetUser,
  variant = "desktop",
}: FollowerInfoProps) => {
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const containerClasses =
    variant === "desktop" ? "flex gap-5" : "flex items-center w-full gap-5";

  const followersText =
    targetUser.followers && targetUser.followers.length === 1
      ? " Follower"
      : " Followers";
  const followersCount = targetUser.followers ? targetUser.followers.length : 0;

  const followingText =
    targetUser.following && targetUser.following.length === 1
      ? " Following"
      : " Following";
  const followingCount = targetUser.following ? targetUser.following.length : 0;
  return (
    <>
      <div className={containerClasses}>
        <button
          onClick={() => setShowFollowersModal(true)}
          className="text-sm flex gap-2 hover:text-brand-orange cursor-pointer"
        >
          {followersCount}
          {followersText}
        </button>
        <button
          onClick={() => setShowFollowingModal(true)}
          className="text-sm hover:text-brand-orange cursor-pointer"
        >
          {followingCount}
          {followingText}
        </button>
      </div>

      <FollowModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        title="Followers"
        users={targetUser.followersInfo || []}
        emptyMessage="No followers yet."
      />

      <FollowModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        title="Following"
        users={targetUser.followingInfo || []}
        emptyMessage="Not following anyone yet."
      />
    </>
  );
};
