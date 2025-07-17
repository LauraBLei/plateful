"use client";
import { useAuth } from "src/providers/AuthProvider";
import { Recipe, RecipeType } from "src/types/recipe";
import { UserProfile } from "src/types/user";
import { Avatar } from "../shared/Avatar";
import { BioText } from "./BioText";
import { FollowButton } from "./FollowButton";
import { FollowerInfo } from "./FollowerInfo";
import { Options } from "./Options";
import { ProfileName } from "./ProfileName";

export interface ProfileSidebarProps {
  targetUser: UserProfile | null;
  activeTab: RecipeType;
  setActiveTab: (tab: RecipeType) => void;
  setCurrentRecipes: (recipes: Recipe[]) => void;
  isFabTabActive: boolean;
  serverRecipes: Recipe[];
}

export const ProfileSidebar = ({
  targetUser,
  setActiveTab,
  setCurrentRecipes,
  isFabTabActive,
  serverRecipes,
}: ProfileSidebarProps) => {
  const { user } = useAuth();
  const isOwnProfile = targetUser?.id === user?.id;
  const profileImage = targetUser?.avatar ?? "/default.jpg";

  return (
    <>
      <div
        className="p-10 lg:min-h-[800px] hidden lg:flex flex-col items-center
       shadow-md lg:max-w-[350px] w-full border-1 dark:border-brand-white rounded-md h-full"
      >
        <div className="w-full items-center flex flex-col gap-5 mb-10">
          <Avatar
            src={profileImage}
            alt={targetUser?.name ?? "profile name not found"}
            size="large"
          />
          <div className="flex flex-col gap-5">
            <ProfileName targetUser={targetUser} variant="desktop" />
            <FollowerInfo targetUser={targetUser} variant="desktop" />
          </div>
          <BioText profile={targetUser} variant="desktop" />
        </div>
        {!isOwnProfile && targetUser ? (
          <FollowButton targetUser={targetUser} loggedInUser={user} />
        ) : (
          isOwnProfile && (
            <Options
              variant="desktop"
              setActiveTab={setActiveTab}
              setCurrentRecipes={setCurrentRecipes}
              isFabTabActive={isFabTabActive}
              profile={targetUser}
              serverRecipes={serverRecipes}
              isOwnProfile={isOwnProfile}
            />
          )
        )}
      </div>

      <div className="flex lg:hidden w-full">
        <div className="w-full">
          <div className="flex w-full gap-10 items-center">
            <Avatar
              src={profileImage}
              alt={targetUser?.name ?? "profile name not found"}
              size="medium"
            />
            <div className="w-full flex flex-col gap-2">
              <ProfileName targetUser={targetUser} variant="tablet" />
              <FollowerInfo targetUser={targetUser} variant="tablet" />
            </div>
          </div>
          <BioText profile={targetUser} variant="tablet" />
          {!isOwnProfile && targetUser ? (
            <FollowButton
              targetUser={targetUser}
              loggedInUser={user}
              variant="tablet"
            />
          ) : (
            isOwnProfile && (
              <Options
                variant="tablet"
                setActiveTab={setActiveTab}
                setCurrentRecipes={setCurrentRecipes}
                isFabTabActive={isFabTabActive}
                profile={targetUser}
                serverRecipes={serverRecipes}
                isOwnProfile={isOwnProfile}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};
