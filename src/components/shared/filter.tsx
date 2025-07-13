import React from "react";

export interface FilterOptions {
  selectedTags: string[];
  selectedLanguage: string;
  selectedTime: string;
}

interface RecipeFilterProps {
  // Filter state
  selectedTags: string[];
  selectedLanguage: string;
  selectedTime: string;
  showMobileFilter: boolean;

  // Event handlers
  onTagChange: (tag: string) => void;
  onLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFilter: (e: React.FormEvent) => void;
  onToggleMobileFilter: () => void;

  // Optional customization
  title?: string;
  className?: string;
  forceMobileLayout?: boolean;
}

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

export const RecipeFilter: React.FC<RecipeFilterProps> = ({
  selectedTags,
  selectedLanguage,
  selectedTime,
  showMobileFilter,
  onTagChange,
  onLanguageChange,
  onTimeChange,
  onFilter,
  onToggleMobileFilter,
  title = "Filter recipes",
  className = "",
  forceMobileLayout = false,
}) => {
  return (
    <>
      {/* Mobile filter toggle button - always show if forceMobileLayout is true */}
      <div
        className={forceMobileLayout ? "block mb-4" : "block lg:hidden mb-4"}
      >
        <button
          type="button"
          className="button button-active w-full"
          onClick={onToggleMobileFilter}
        >
          {showMobileFilter ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter form: dropdown/mobile layout when forceMobileLayout is true, otherwise sidebar on lg+ */}
      <div
        className={`w-full flex-col gap-5 border p-4 rounded-md bg-brand-white dark:bg-brand-black z-20 ${
          forceMobileLayout
            ? `${showMobileFilter ? "flex" : "hidden"}`
            : `lg:max-w-[300px] ${
                showMobileFilter ? "flex" : "hidden"
              } lg:flex lg:static lg:mt-0 lg:mr-0 lg:mb-0 lg:ml-0`
        } ${className}`}
      >
        <form onSubmit={onFilter} className="flex flex-col gap-5">
          <h2 className="headlineTwo">{title}</h2>
          <div
            className={`flex flex-col gap-5 md:gap-10 ${
              forceMobileLayout ? "sm:flex-row" : "sm:flex-row lg:flex-col"
            }`}
          >
            <div className="flex-1">
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
                      onChange={() => onTagChange(type)}
                      className="accent-brand-black dark:accent-brand-white w-4 h-4"
                    />
                    <span className="font-semibold select-none">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-5">
              <div>
                <div className="font-semibold mb-2">Time (minutes):</div>
                <select
                  value={selectedTime}
                  onChange={onTimeChange}
                  className="input dark:bg-brand-black bg-brand-white font-semibold"
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
                  onChange={onLanguageChange}
                  className="input dark:bg-brand-black bg-brand-white font-semibold"
                >
                  <option value="">Any</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="regButton hover-effect mt-2">
            Search
          </button>
        </form>
      </div>
    </>
  );
};

// Custom hook for managing filter state and logic
export const useRecipeFilter = (onFilterApply?: (recipes: any[]) => void) => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("");
  const [selectedTime, setSelectedTime] = React.useState<string>("");
  const [showMobileFilter, setShowMobileFilter] = React.useState(false);

  // Applied filters (only updated when search button is pressed)
  const [appliedTags, setAppliedTags] = React.useState<string[]>([]);
  const [appliedLanguage, setAppliedLanguage] = React.useState<string>("");
  const [appliedTime, setAppliedTime] = React.useState<string>("");

  // Filter version to force re-renders
  const [filterVersion, setFilterVersion] = React.useState(0);

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

    // Apply the current filter values
    setAppliedTags(selectedTags);
    setAppliedLanguage(selectedLanguage);
    setAppliedTime(selectedTime);

    // Increment version to force re-renders
    setFilterVersion((prev) => prev + 1);

    // For API-based filtering (All Recipes page)
    if (onFilterApply) {
      // Build query params
      const params = new URLSearchParams();
      selectedTags.forEach((tag) => params.append("tag", tag));
      if (selectedLanguage) params.append("language", selectedLanguage);
      if (selectedTime) params.append("time", selectedTime);

      const res = await fetch(`/api/recipe/search?${params.toString()}`);
      const data = await res.json();

      onFilterApply(data || []);
      return data || [];
    }
  };

  const handleToggleMobileFilter = () => {
    setShowMobileFilter((v) => !v);
  };

  // Filter recipes locally (for user profile pages)
  const filterRecipesLocally = React.useCallback(
    (recipes: any[]) => {
      return recipes.filter((recipe) => {
        // Filter by tags (use applied tags, not selected)
        if (appliedTags.length > 0) {
          const recipeTags = recipe.tag || [];
          // Ensure recipeTags is an array
          const tagsArray = Array.isArray(recipeTags)
            ? recipeTags
            : [recipeTags];
          const hasMatchingTag = appliedTags.some((tag) =>
            tagsArray.some(
              (recipeTag: string) =>
                recipeTag?.toLowerCase() === tag.toLowerCase()
            )
          );
          if (!hasMatchingTag) return false;
        }

        // Filter by language (use applied language, not selected)
        if (
          appliedLanguage &&
          recipe.language?.toLowerCase() !== appliedLanguage.toLowerCase()
        ) {
          return false;
        }

        // Filter by time (use applied time, not selected)
        if (appliedTime) {
          const recipeTime = parseInt(recipe.time || "0");
          const filterTime = parseInt(appliedTime);

          if (filterTime === 15 && recipeTime >= 30) return false;
          if (filterTime === 30 && (recipeTime < 30 || recipeTime > 30))
            return false;
          if (filterTime === 60 && (recipeTime < 60 || recipeTime > 60))
            return false;
          if (filterTime === 90 && (recipeTime < 90 || recipeTime > 90))
            return false;
          if (filterTime === 120 && (recipeTime < 120 || recipeTime > 120))
            return false;
          if (filterTime === 180 && recipeTime <= 120) return false;
        }

        return true;
      });
    },
    [appliedTags, appliedLanguage, appliedTime]
  );

  const resetFilters = () => {
    setSelectedTags([]);
    setSelectedLanguage("");
    setSelectedTime("");
    setAppliedTags([]);
    setAppliedLanguage("");
    setAppliedTime("");
    setFilterVersion((prev) => prev + 1);
  };
  return {
    // State (for UI display)
    selectedTags,
    selectedLanguage,
    selectedTime,
    showMobileFilter,

    // Applied filters (for actual filtering)
    appliedTags,
    appliedLanguage,
    appliedTime,
    filterVersion,

    // Handlers
    handleTagChange,
    handleLanguageChange,
    handleTimeChange,
    handleFilter,
    handleToggleMobileFilter,

    // Utilities
    filterRecipesLocally,
    resetFilters,
  };
};
