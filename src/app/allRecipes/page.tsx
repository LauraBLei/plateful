"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "@/components/card";
import Loader from "@/components/loader";
import { fetchAllRecipes } from "@/api/allRecipesApi";

const mealTypes = [
  "dinner",
  "lunch",
  "breakfast",
  "dessert",
  "drink",
  "salad",
  "snack",
];
const languages = ["danish", "norwegian", "english"];
const timeOptions = [
  { value: "15", label: "Less than 30 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" },
  { value: "180", label: "More than 2 hours" },
];

const AllRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchAllRecipes().then((x) => {
      setRecipes(x);
      setLoading(false);
    });
  }, []);

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Build query params
    const params = new URLSearchParams();
    selectedTags.forEach((tag) => params.append("tag", tag));
    if (selectedLanguage) params.append("language", selectedLanguage);
    if (selectedTime) params.append("time", selectedTime);
    const res = await fetch(`/api/recipe/read?${params.toString()}`);
    const data = await res.json();
    setRecipes(data || []);
    setLoading(false);
  };

  return (
    <div className="max-w-[1440px] font-primary mb-30 w-full flex gap-5 mx-auto p-4 text-brand-black dark:text-brand-white">
      <form
        className="w-full max-w-[300px] flex flex-col gap-5 border p-4 rounded-md"
        onSubmit={handleFilter}
      >
        <h2 className="headlineTwo">Filter recipes</h2>
        <div>
          <div className="font-semibold mb-2">Meal types:</div>
          <div className="flex flex-col gap-2">
            {mealTypes.map((type) => (
              <label
                key={type}
                className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors duration-150 ${
                  selectedTags.includes(type)
                    ? "bg-brand-black text-brand-white border-1 border-brand-black dark:bg-brand-white dark:text-brand-black dark:border-brand-white"
                    : "bg-transparent text-brand-black border-1 border-brand-black dark:text-brand-white dark:border-brand-white hover:bg-brand-black/10"
                }`}
              >
                <input
                  type="checkbox"
                  value={type}
                  checked={selectedTags.includes(type)}
                  onChange={() => handleTagChange(type)}
                  className="accent-brand-black dark:accent-brand-white w-4 h-4"
                />
                <span className="font-semibold select-none">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-2">Time (minutes):</div>
          <select
            value={selectedTime}
            onChange={handleTimeChange}
            className="input bg-brand-black font-semibold"
          >
            <option value="">Any</option>
            {timeOptions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="font-semibold mb-2">Language:</div>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="input bg-brand-black font-semibold"
          >
            <option value="">Any</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="button button-active mt-2">
          Search
        </button>
      </form>
      <div className="w-full flex flex-col gap-2">
        <h1 className="headline">All Recipes</h1>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
