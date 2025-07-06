"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "@/components/card";
import Loader from "@/components/loader";
import { fetchAllRecipes, fetchRecipesByTag } from "@/api/allRecipesApi";

const AllRecipes = () => {
  const [defaultRecipes, setDefaultRecipes] = useState<Recipe[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const mealTypes = [
    "dinner",
    "lunch",
    "breakfast",
    "dessert",
    "drink",
    "salad",
    "snack",
  ];

  useEffect(() => {
    setLoading(true);
    fetchAllRecipes().then((x) => {
      setRecipes(x);
      setDefaultRecipes(x);
      setLoading(false);
    });
  }, []);

  const sortRecipes = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value;
    setActiveFilter(value);
    if (!value) {
      setRecipes(defaultRecipes);
      return;
    }
    // Only tag filter for now, can expand for time
    const res = await fetchRecipesByTag(value);
    setRecipes(res || []);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-[1440px] mb-30 w-full flex gap-5 mx-auto p-4 text-brand-black dark:text-brand-white">
      <div className="w-full max-w-[200px] flex flex-col gap-5">
        <h2 className="headlineTwo">Filter meal types:</h2>
        <div className="flex flex-col gap-2 w-full">
          <FilterButton
            value=""
            label="Show all"
            onClick={sortRecipes}
            active={activeFilter === ""}
          />
          {mealTypes.map((type) => (
            <FilterButton
              key={type}
              value={type}
              label={type.charAt(0).toUpperCase() + type.slice(1)}
              onClick={sortRecipes}
              active={activeFilter === type}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h1 className="headline">All Recipes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2">
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                image={recipe.image}
                id={recipe.id}
                title={recipe.name}
                time={recipe.time}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              No recipes found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  value: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  active?: boolean;
}

const FilterButton = ({
  value,
  label,
  onClick,
  active = false,
}: FilterButtonProps) => (
  <button
    onClick={onClick}
    value={value}
    className={`button ${active ? "button-active" : "hover-effect"}`}
  >
    {label}
  </button>
);

export default AllRecipes;
