import Image from "next/image";
import { RecipeCard } from "@/components/card";
import type { UserProfile } from "../../lib/types/user";
import type { Recipe } from "../../lib/types/recipe";
import React from "react";

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
};
