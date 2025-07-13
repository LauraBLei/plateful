"use client";

import { Recipe } from "@/types/recipe";
import type { UserProfile } from "@/types/user";
import { useMemo, useState } from "react";
import { useIsOwnProfile } from "../../hooks/useAuth";
import { Avatar } from "../shared/Avatar";
import { RecipeFilter, useRecipeFilter } from "../shared/filter";
import { RecipeGrid } from "../shared/RecipeGrid";
import { BioText } from "./BioText";
import { FollowButton } from "./FollowButton";
import { FollowerInfo } from "./FollowerInfo";
import { Options } from "./Options";
import { ProfileName } from "./ProfileName";

interface ProfilePageProps {
  serverUserData?: UserProfile | null;
  serverRecipes?: Recipe[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  serverUserData: profile,
  serverRecipes: recipes,
}) => {
  const [activeTab, setActiveTab] = useState<"recipes" | "favorites">(
    "recipes"
  );
  const [currectRecipes, setCurrentRecipes] = useState<Recipe[]>(recipes || []);

  const isOwnProfile = useIsOwnProfile(profile?.id);
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
        <Desktop
          profile={profile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCurrentRecipes={setCurrentRecipes}
          isFabTabActive={isFabTabActive}
          serverRecipes={recipes || []}
          isOwnProfile={isOwnProfile}
        />
        <Tablet
          profile={profile}
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
                ? `${profile?.name}'s favourites`
                : `${profile?.name}'s Recipes`
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
  profile: UserProfile;
  activeTab: "recipes" | "favorites";
  setActiveTab: (tab: "recipes" | "favorites") => void;
  setCurrentRecipes: (recipes: Recipe[]) => void;
  isFabTabActive: boolean;
  serverRecipes: Recipe[];
  isOwnProfile?: boolean;
}

const Desktop = ({
  profile,
  setActiveTab,
  setCurrentRecipes,
  isFabTabActive,
  serverRecipes,
  isOwnProfile = false,
}: Props) => {
  return (
    <div className="p-10 lg:min-h-[800px] hidden lg:flex  flex-col shadow-md lg:max-w-[350px] w-full border-1 dark:border-brand-white rounded-md h-full">
      <div className="w-full items-center flex flex-col gap-5 mb-10">
        <Avatar
          src={profile?.avatar ?? "/default.jpg"}
          alt={profile?.name ?? "profile name not found"}
          size="large"
        />
        <div className="flex flex-col gap-5">
          <ProfileName profile={profile} variant="desktop" />
          <FollowerInfo profile={profile} variant="desktop" />
        </div>
        <BioText profile={profile} variant="desktop" />
      </div>
      {!isOwnProfile ? (
        <FollowButton isFollowingUser={false} />
      ) : (
        <Options
          variant="desktop"
          setActiveTab={setActiveTab}
          setCurrentRecipes={setCurrentRecipes}
          isFabTabActive={isFabTabActive}
          profile={profile}
          serverRecipes={serverRecipes}
          isOwnProfile={isOwnProfile}
        />
      )}
    </div>
  );
};

const Tablet = ({
  profile,
  setActiveTab,
  setCurrentRecipes,
  isFabTabActive,
  serverRecipes,
  isOwnProfile = false,
}: Props) => {
  const profileImage = profile ? profile.avatar : "/default.jpg";

  return (
    <div className="flex lg:hidden w-full">
      <div className="w-full">
        <div className="flex w-full gap-10 items-center">
          <Avatar
            src={profileImage}
            alt={profile?.name ?? "profile name not found"}
            size="medium"
          />
          <div className="w-full flex flex-col gap-2">
            <ProfileName profile={profile} variant="tablet" />
            <FollowerInfo profile={profile} variant="tablet" />
          </div>
        </div>
        <BioText profile={profile} variant="tablet" />
        {!isOwnProfile ? (
          <FollowButton isFollowingUser={false} variant="tablet" />
        ) : (
          <Options
            variant="tablet"
            setActiveTab={setActiveTab}
            setCurrentRecipes={setCurrentRecipes}
            isFabTabActive={isFabTabActive}
            profile={profile}
            serverRecipes={serverRecipes}
            isOwnProfile={isOwnProfile}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
