import { useCallback, useEffect, useState } from "react";
import { Recipe, RecipeFormData } from "src/types/recipe";

const getDefaultFormData = (): RecipeFormData => ({
  image: null,
  title: "",
  time: 30,
  tag: "breakfast",
  steps: [""],
  language: "",
  portion: 1,
  ingredientGroups: [{ groupName: "", ingredients: [""] }],
});

export const useRecipeForm = (existingRecipe?: Recipe | null) => {
  const [formData, setFormData] = useState<RecipeFormData>(
    getDefaultFormData()
  );

  useEffect(() => {
    if (existingRecipe) {
      setFormData({
        image: null,
        title: existingRecipe.name || "",
        time: existingRecipe.time || 30,
        tag: existingRecipe.tag || "breakfast",
        steps: existingRecipe.steps || [""],
        language: existingRecipe.language || "",
        portion: existingRecipe.portions || 1,
        ingredientGroups: existingRecipe.ingredients || [
          { groupName: "", ingredients: [""] },
        ],
      });
    }
  }, [existingRecipe]);

  const updateField = useCallback(
    (field: keyof RecipeFormData, value: unknown) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData(getDefaultFormData());
  }, []);

  const validateForm = useCallback((data: RecipeFormData): string[] => {
    const errors: string[] = [];

    if (!data.title.trim()) {
      errors.push("Recipe title is required");
    }

    if (data.steps.filter((step) => step.trim()).length === 0) {
      errors.push("At least one step is required");
    }

    if (
      data.ingredientGroups.every((group) =>
        group.ingredients.every((ing) => !ing.trim())
      )
    ) {
      errors.push("At least one ingredient is required");
    }

    return errors;
  }, []);

  return {
    formData,
    updateField,
    resetForm,
    validateForm,
  };
};
