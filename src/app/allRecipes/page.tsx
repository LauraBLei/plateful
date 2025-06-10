"use client";

import { useEffect, useState } from "react";
import { readRecipes, readSortedRecipes } from "../api/recipe/read";
import { Recipe } from "../../../lib/types/recipe";
import { RecipeCard } from "@/components/card";

const AllRecipes = () => {
  const [defaultRecipes, setDefaultRecipes] = useState<Recipe[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("");

  useEffect(() => {
    readRecipes().then((x) => {
      if (x) {
        setRecipes(x);
        setDefaultRecipes(x);
      }
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
    const sorted = await readSortedRecipes({ tag: value });
    setRecipes(sorted || []);
  };
  return (
    <div className="max-w-[1440px] w-full flex mx-auto p-4 text-brand-black dark:text-brand-white">
      <div>
        <h2>Filter</h2>
        <div>
          <FilterButton
            value=""
            label="Show all"
            onClick={sortRecipes}
            active={activeFilter === ""}
          />
          <FilterButton
            value="dinner"
            label="Dinner"
            onClick={sortRecipes}
            active={activeFilter === "dinner"}
          />
          <FilterButton
            value="dessert"
            label="Dessert"
            onClick={sortRecipes}
            active={activeFilter === "dessert"}
          />
        </div>
      </div>
      <div className="w-full">
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
