"use client";

import AllRecipesGrid from "@/components/allrecipes/AllRecipesGrid";
import { RecipeFilter, useRecipeFilter } from "@/components/shared/filter";
import { Recipe } from "@/types/recipe";
import { useState } from "react";

interface AllRecipesProps {
  initialRecipes?: Recipe[];
}

const AllRecipes = ({ initialRecipes = [] }: AllRecipesProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [loading, setLoading] = useState(initialRecipes.length === 0);

  const {
    selectedTags,
    selectedLanguage,
    selectedTime,
    showMobileFilter,
    handleTagChange,
    handleLanguageChange,
    handleTimeChange,
    handleFilter,
    handleToggleMobileFilter,
  } = useRecipeFilter((filteredRecipes) => {
    setRecipes(filteredRecipes);
    setLoading(false);
  });

  const onFilter = async (e: React.FormEvent) => {
    setLoading(true);
    await handleFilter(e);
  };

  return (
    <div className="max-w-[1440px] font-primary mb-30 w-full flex flex-col lg:flex-row gap-5 mx-auto p-4 text-brand-black dark:text-brand-white">
      <RecipeFilter
        selectedTags={selectedTags}
        selectedLanguage={selectedLanguage}
        selectedTime={selectedTime}
        showMobileFilter={showMobileFilter}
        onTagChange={handleTagChange}
        onLanguageChange={handleLanguageChange}
        onTimeChange={handleTimeChange}
        onFilter={onFilter}
        onToggleMobileFilter={handleToggleMobileFilter}
        title="Filter recipes"
      />

      <AllRecipesGrid recipes={recipes} loading={loading} />
    </div>
  );
};

export default AllRecipes;
