"use client";

import { useEffect, useState } from "react";
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
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(
    recipes || []
  );

  useEffect(() => {
    setBaseRecipes(recipes || []);
    setFilteredRecipes(recipes || []);
  }, [recipes]);

  const filter = useRecipeFilter();
  const isFabTabActive = activeTab === "favorites";
  const isOwnProfile = targetUser?.id === user?.id;

  // Handle filter application
  const handleFilterApply = (e: React.FormEvent) => {
    e.preventDefault();

    // Apply filters to current recipes using selected values
    if (
      filter.selectedTags.length > 0 ||
      filter.selectedLanguage ||
      filter.selectedTime
    ) {
      // Create a temporary filter object to use the filterRecipesLocally function
      const tempAppliedFilters = {
        appliedTags: filter.selectedTags,
        appliedLanguage: filter.selectedLanguage,
        appliedTime: filter.selectedTime,
      };

      // Filter recipes manually using the same logic as filterRecipesLocally
      const filtered = baseRecipes.filter((recipe) => {
        // Filter by tags
        if (tempAppliedFilters.appliedTags.length > 0) {
          const recipeTags = recipe.tag || [];
          const tagsArray = Array.isArray(recipeTags)
            ? recipeTags
            : [recipeTags];
          const hasMatchingTag = tempAppliedFilters.appliedTags.some((tag) =>
            tagsArray.some(
              (recipeTag: string) =>
                recipeTag?.toLowerCase() === tag.toLowerCase()
            )
          );
          if (!hasMatchingTag) return false;
        }

        // Filter by language
        if (
          tempAppliedFilters.appliedLanguage &&
          recipe.language?.toLowerCase() !==
            tempAppliedFilters.appliedLanguage.toLowerCase()
        ) {
          return false;
        }

        // Filter by time
        if (tempAppliedFilters.appliedTime) {
          const recipeTime =
            typeof recipe.time === "string"
              ? parseInt(recipe.time)
              : recipe.time;
          switch (tempAppliedFilters.appliedTime) {
            case "15": // Less than 30 minutes
              if (recipeTime >= 30) return false;
              break;
            case "lt60": // Less than 1 hour
              if (recipeTime >= 60) return false;
              break;
            case "lt120": // Less than 2 hours
              if (recipeTime >= 120) return false;
              break;
            case "30": // 30 minutes
              if (recipeTime < 30 || recipeTime >= 60) return false;
              break;
            case "60": // 1 hour
              if (recipeTime < 60 || recipeTime >= 90) return false;
              break;
            case "90": // 1.5 hours
              if (recipeTime < 90 || recipeTime >= 120) return false;
              break;
            case "120": // 2 hours
              if (recipeTime < 120 || recipeTime >= 180) return false;
              break;
            case "180": // More than 2 hours
              if (recipeTime < 180) return false;
              break;
            default:
              break;
          }
        }

        return true;
      });

      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(baseRecipes);
    }
  };

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
            onFilter={handleFilterApply}
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
            recipeList={filteredRecipes}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
