import { useState } from "react";
import { getUserWithFollowData } from "src/api/userActions";
import { UserProfile } from "src/types/user";
import { FollowModal } from "./FollowModal";

type SimpleUserInfo = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
};

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
  const [followersData, setFollowersData] = useState<SimpleUserInfo[]>([]);
  const [followingData, setFollowingData] = useState<SimpleUserInfo[]>([]);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [loadingFollowing, setLoadingFollowing] = useState(false);

  const handleShowFollowers = async () => {
    if (!targetUser.followers || targetUser.followers.length === 0) {
      setShowFollowersModal(true);
      return;
    }

    setLoadingFollowers(true);
    try {
      const data = await getUserWithFollowData(targetUser.id, {
        followers: targetUser.followers,
      });

      if (data) {
        setFollowersData(data.followersInfo || []);
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
      setFollowersData([]);
    } finally {
      setLoadingFollowers(false);
      setShowFollowersModal(true);
    }
  };

  const handleShowFollowing = async () => {
    if (!targetUser.following || targetUser.following.length === 0) {
      setShowFollowingModal(true);
      return;
    }

    setLoadingFollowing(true);
    try {
      const data = await getUserWithFollowData(targetUser.id, {
        following: targetUser.following,
      });

      if (data) {
        setFollowingData(data.followingInfo || []);
      }
    } catch (error) {
      console.error("Error fetching following:", error);
      setFollowingData([]);
    } finally {
      setLoadingFollowing(false);
      setShowFollowingModal(true);
    }
  };

  const containerClasses =
    variant === "desktop" ? "flex gap-5" : "flex items-center w-full gap-5";

  const followersCount = targetUser.followers.length;
  const followersText = pluralHelper(followersCount, "Follower");

  const followingText = "Following";
  const followingCount = targetUser.following.length;
  return (
    <>
      <div className={containerClasses}>
        <button
          onClick={handleShowFollowers}
          className="text-sm flex gap-2 hover:text-brand-orange cursor-pointer disabled:opacity-50"
          disabled={loadingFollowers}
        >
          {loadingFollowers
            ? "Loading..."
            : `${followersCount} ${followersText}`}
        </button>
        <button
          onClick={handleShowFollowing}
          className="text-sm hover:text-brand-orange cursor-pointer disabled:opacity-50"
          disabled={loadingFollowing}
        >
          {loadingFollowing
            ? "Loading..."
            : `${followingCount} ${followingText}`}
        </button>
      </div>

      <FollowModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        title="Followers"
        users={followersData}
        emptyMessage="No followers yet."
      />

      <FollowModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        title="Following"
        users={followingData}
        emptyMessage="Not following anyone yet."
      />
    </>
  );
};

const pluralHelper = (count: number, word: string) => {
  return count === 1 ? word : `${word}s`;
};
