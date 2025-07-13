import type { UserProfile } from "@/types/user";
import { useState } from "react";
import { FollowModal } from "./follow";

interface FollowerInfoProps {
  profile: UserProfile;
  variant?: "desktop" | "tablet";
}

export const FollowerInfo = ({
  profile,
  variant = "desktop",
}: FollowerInfoProps) => {
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const containerClasses =
    variant === "desktop" ? "flex gap-5" : "flex items-center w-full gap-5";

  const followersText =
    profile.followers && profile.followers.length === 1
      ? " Follower"
      : " Followers";
  const followersCount = profile.followers ? profile.followers.length : 0;

  const followingText =
    profile.following && profile.following.length === 1
      ? " Following"
      : " Following";
  const followingCount = profile.following ? profile.following.length : 0;
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
        users={profile.followersInfo || []}
        emptyMessage="No followers yet."
      />

      <FollowModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        title="Following"
        users={profile.followingInfo || []}
        emptyMessage="Not following anyone yet."
      />
    </>
  );
};
