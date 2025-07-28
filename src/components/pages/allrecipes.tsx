"use client";

import { useState } from "react";
import { Recipe } from "src/types/recipe";
import AllRecipesGrid from "../allrecipes/AllRecipesGrid";
import { RecipeFilter, useRecipeFilter } from "../shared/RecipeFilter";

interface AllRecipesProps {
  initialRecipes: Recipe[];
}

const AllRecipes = ({ initialRecipes = [] }: AllRecipesProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [loading, setLoading] = useState(initialRecipes.length === 0);
  const {
    selectedTags,
    selectedTime,
    showMobileFilter,
    handleTagChange,
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
        selectedTime={selectedTime}
        showMobileFilter={showMobileFilter}
        onTagChange={handleTagChange}
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
