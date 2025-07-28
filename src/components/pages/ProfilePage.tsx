"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "src/providers/AuthProvider";
import { Recipe, RecipeType } from "src/types/recipe";
import { UserProfile } from "src/types/user";
import { ProfileSidebar } from "../profile/ProfileSidebar";
import { RecipeFilter, useRecipeFilter } from "../shared/RecipeFilter";
import { SectionComponent } from "../shared/SectionComponent";

interface ProfilePageProps {
  targetUser: UserProfile | null;
  recipes: Recipe[];
}
const ProfilePage: React.FC<ProfilePageProps> = ({ targetUser, recipes }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<RecipeType>("recipes");
  const [baseRecipes, setBaseRecipes] = useState<Recipe[]>(recipes || []);

  useEffect(() => {
    setBaseRecipes(recipes || []);
  }, [recipes]);

  const filter = useRecipeFilter();
  const isFabTabActive = activeTab === "favorites";
  const isOwnProfile = targetUser?.id === user?.id;

  const currentRecipes = useMemo(() => {
    if (
      filter.selectedTags.length > 0 ||
      filter.selectedLanguage ||
      filter.selectedTime
    ) {
      return filter.filterRecipesLocally(baseRecipes);
    }
    return baseRecipes;
  }, [baseRecipes, filter]);

  const filterTitle = isFabTabActive
    ? "Filter your favourites"
    : "Filter your recipes";

  const sectionTitle = isFabTabActive
    ? `${targetUser?.name}'s favourites`
    : `${targetUser?.name}'s Recipes`;

  return (
    <div className="px-2 mb-30 flex w-full h-full max-w-[1440px] gap-5 font-primary text-brand-black dark:text-brand-white">
      <div className="flex flex-col gap-5 lg:flex-row w-full">
        <ProfileSidebar
          targetUser={targetUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCurrentRecipes={setBaseRecipes}
          isFabTabActive={isFabTabActive}
          serverRecipes={recipes || []}
        />

        <div className="h-full flex flex-col  gap-5 w-full">
          <RecipeFilter
            selectedTags={filter.selectedTags}
            selectedTime={filter.selectedTime}
            showMobileFilter={filter.showMobileFilter}
            onTagChange={filter.handleTagChange}
            onTimeChange={filter.handleTimeChange}
            onFilter={filter.handleFilter}
            onToggleMobileFilter={filter.handleToggleMobileFilter}
            title={filterTitle}
            forceMobileLayout={true}
          />
          <SectionComponent
            sectionName={
              isOwnProfile
                ? isFabTabActive
                  ? "Your favourites"
                  : "Your Recipes"
                : sectionTitle
            }
            recipeList={currentRecipes}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
