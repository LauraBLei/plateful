"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "@/components/card";
import Loader from "@/components/loader";
import { fetchAllRecipes } from "@/api/allRecipesApi";
import { RecipeFilter, useRecipeFilter } from "@/components/filter";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setLoading(true);
    fetchAllRecipes().then((x) => {
      setRecipes(x);
      setLoading(false);
    });
  }, []);

  const onFilter = async (e: React.FormEvent) => {
    setLoading(true);
    await handleFilter(e);
  };

  return (
    <div className="max-w-[1440px] font-primary mb-30 w-full flex flex-col lg:flex-row gap-5 mx-auto p-4 text-brand-black dark:text-brand-white">
      {/* Filter component */}
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

      {/* Recipes grid */}
      <div className="w-full flex flex-col gap-2">
        <h1 className="headline">All Recipes</h1>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {recipes && recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  image={recipe.image}
                  id={recipe.id}
                  title={recipe.name}
                  time={recipe.time}
                  owner={recipe.owner}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-8">
                No recipes found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
