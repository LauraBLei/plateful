import Image from "next/image";
import { RecipeCard } from "@/components/card";
import type { UserProfile } from "../../lib/types/user";
import type { Recipe } from "../../lib/types/recipe";
import React, { useState } from "react";
import { FollowModal } from "./follow";

interface OtherProfileProps {
  otherProfile: UserProfile;
  isFollowingUser: boolean;
  handleFollow: () => void;
  recipes: Recipe[];
}

export const OtherProfile: React.FC<OtherProfileProps> = ({
  otherProfile,
  isFollowingUser,
  handleFollow,
  recipes,
}) => {
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  return (
    <div className="px-2 flex flex-col lg:flex-row w-full h-full max-w-[1440px] gap-5 font-primary text-brand-black dark:text-brand-white">
      <div>
        <Desktop
          handleFollow={handleFollow}
          isFollowingUser={isFollowingUser}
          otherProfile={otherProfile}
          onShowFollowers={() => setShowFollowersModal(true)}
          onShowFollowing={() => setShowFollowingModal(true)}
        />
        <Tablet
          handleFollow={handleFollow}
          isFollowingUser={isFollowingUser}
          otherProfile={otherProfile}
          onShowFollowers={() => setShowFollowersModal(true)}
          onShowFollowing={() => setShowFollowingModal(true)}
        />
      </div>
      <div className="w-full flex flex-col gap-5">
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

      {/* Followers Modal */}
      <FollowModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        title="Followers"
        users={otherProfile.followersInfo || []}
        emptyMessage="No followers yet."
      />

      {/* Following Modal */}
      <FollowModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        title="Following"
        users={otherProfile.followingInfo || []}
        emptyMessage="Not following anyone yet."
      />
    </div>
  );
};

interface Props {
  isFollowingUser: boolean;
  handleFollow: () => void;
  otherProfile: UserProfile;
  onShowFollowers: () => void;
  onShowFollowing: () => void;
}
const Desktop = ({
  isFollowingUser,
  handleFollow,
  otherProfile,
  onShowFollowers,
  onShowFollowing,
}: Props) => {
  return (
    <div className="p-10 hidden lg:flex lg:min-h-[800px]  flex-col items-center shadow-md lg:max-w-[350px] w-full border-1 dark:border-brand-white rounded-md h-full">
      <div className="relative rounded-full aspect-square max-w-[130px] md:max-w-[170px] w-full overflow-hidden">
        <Image
          fill
          src={otherProfile.avatar || "/default.jpg"}
          alt={otherProfile.name || "profile name not found"}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-5 mt-2">
        <h1 className="headlineTwo text-center">{otherProfile.name}</h1>
        <div className="flex gap-5">
          <button
            onClick={onShowFollowers}
            className="text-sm hover:text-brand-orange cursor-pointer"
          >
            {otherProfile.followers ? otherProfile.followers.length : 0}{" "}
            {otherProfile.followers && otherProfile.followers.length === 1
              ? "Follower"
              : "Followers"}
          </button>
          <button
            onClick={onShowFollowing}
            className="text-sm hover:text-brand-orange cursor-pointer"
          >
            {otherProfile.following ? otherProfile.following.length : 0}
            {otherProfile.following && otherProfile.following.length === 1
              ? " Following"
              : " Following"}
          </button>
        </div>
        <p className="p-2 italic border-brand-black dark:border-brand-white">
          {otherProfile.bio}
        </p>
      </div>
      <button className="button max-w-[150px]" onClick={handleFollow}>
        {isFollowingUser ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

const Tablet = ({
  isFollowingUser,
  handleFollow,
  otherProfile,
  onShowFollowers,
  onShowFollowing,
}: Props) => {
  return (
    <div className="flex flex-col w-full px-2 lg:hidden">
      <div className="w-full flex flex-col gap-5 mb-5 ">
        <div className="flex gap-10 items-center w-full">
          <div className="relative rounded-full aspect-square max-w-[100px] w-full overflow-hidden">
            <Image
              fill
              src={otherProfile.avatar || "/default.jpg"}
              alt={otherProfile.name || "profile name not found"}
              className="object-cover"
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <h1 className="headline  w-full">{otherProfile.name}</h1>
            <div className="flex gap-5 md:gap-10 justify-center md:justify-evenly flex-wrap md:flex-nowrap items-center">
              <button
                onClick={onShowFollowers}
                className="text-sm whitespace-nowrap hover:text-brand-orange cursor-pointer"
              >
                {otherProfile.followers ? otherProfile.followers.length : 0}{" "}
                {otherProfile.followers && otherProfile.followers.length === 1
                  ? "Follower"
                  : "Followers"}
              </button>
              <button
                onClick={onShowFollowing}
                className="text-sm whitespace-nowrap hover:text-brand-orange cursor-pointer"
              >
                {otherProfile.following ? otherProfile.following.length : 0}
                {otherProfile.following && otherProfile.following.length === 1
                  ? " Following"
                  : " Following"}
              </button>
              <button
                className="button text-sm max-w-[150px]"
                onClick={handleFollow}
              >
                {isFollowingUser ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="italic ">{otherProfile.bio}</p>
        </div>
      </div>
    </div>
  );
};
