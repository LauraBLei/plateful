"use client";

import { Recipe } from "@/types/recipe";
import type { UserProfile } from "@/types/user";
import { useMemo, useState } from "react";
import { Avatar } from "../shared/Avatar";
import { RecipeFilter, useRecipeFilter } from "../shared/filter";
import { RecipeGrid } from "../shared/RecipeGrid";
import { BioText } from "./BioText";
import { FollowButton } from "./FollowButton";
import { FollowerInfo } from "./FollowerInfo";
import { Options } from "./Options";
import { ProfileName } from "./ProfileName";

interface ProfilePageProps {
  targetUser: UserProfile | null;
  recipes?: Recipe[];
  loggedInUser?: UserProfile | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  targetUser: targetUser,
  recipes: recipes,
  loggedInUser: loggedInUser,
}) => {
  const [activeTab, setActiveTab] = useState<"recipes" | "favorites">(
    "recipes"
  );
  const [currectRecipes, setCurrentRecipes] = useState<Recipe[]>(recipes || []);

  const isOwnProfile = targetUser?.id === loggedInUser?.id;
  const isFabTabActive = activeTab === "favorites";
  const filter = useRecipeFilter();

  const filteredRecipes = useMemo(() => {
    return filter.filterRecipesLocally(
      isFabTabActive ? currectRecipes : recipes || []
    );
  }, [recipes, filter]);

  return (
    <div className="px-2 mb-30 flex w-full h-full max-w-[1440px] gap-5 font-primary text-brand-black dark:text-brand-white">
      <div className="flex flex-col gap-5 lg:flex-row w-full">
        <ProfileSidebar
          targetUser={targetUser}
          loggedInUser={loggedInUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCurrentRecipes={setCurrentRecipes}
          isFabTabActive={isFabTabActive}
          serverRecipes={recipes || []}
          isOwnProfile={isOwnProfile}
        />

        <div className="h-full flex flex-col  gap-5 w-full">
          <RecipeFilter
            selectedTags={filter.selectedTags}
            selectedLanguage={filter.selectedLanguage}
            selectedTime={filter.selectedTime}
            showMobileFilter={filter.showMobileFilter}
            onTagChange={filter.handleTagChange}
            onLanguageChange={filter.handleLanguageChange}
            onTimeChange={filter.handleTimeChange}
            onFilter={filter.handleFilter}
            onToggleMobileFilter={filter.handleToggleMobileFilter}
            title={
              isFabTabActive ? "Filter your favourites" : "Filter your recipes"
            }
            forceMobileLayout={true}
          />

          <RecipeGrid
            recipes={isFabTabActive ? currectRecipes : recipes}
            filteredRecipes={filteredRecipes}
            title={
              isOwnProfile
                ? isFabTabActive
                  ? "Your favourites"
                  : "Your Recipes"
                : isFabTabActive
                ? `${targetUser?.name}'s favourites`
                : `${targetUser?.name}'s Recipes`
            }
            emptyMessage={"No recipes!"}
            noResultsMessage={"No recipes match your filters."}
          />
        </div>
      </div>
    </div>
  );
};

interface Props {
  targetUser: UserProfile | null;
  loggedInUser?: UserProfile | null;
  activeTab: "recipes" | "favorites";
  setActiveTab: (tab: "recipes" | "favorites") => void;
  setCurrentRecipes: (recipes: Recipe[]) => void;
  isFabTabActive: boolean;
  serverRecipes: Recipe[];
  isOwnProfile?: boolean;
}

const ProfileSidebar = ({
  targetUser,
  loggedInUser,
  setActiveTab,
  setCurrentRecipes,
  isFabTabActive,
  serverRecipes,
  isOwnProfile = false,
}: Props) => {
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
          <FollowButton targetUser={targetUser} loggedInUser={loggedInUser} />
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
              loggedInUser={loggedInUser}
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

export default ProfilePage;
