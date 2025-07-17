import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createRecipe,
  updateRecipe,
  uploadRecipeImage,
} from "src/api/browserActions";
import { Recipe, RecipeFormData } from "src/types/recipe";
import { UserProfile } from "src/types/user";

export const useRecipeSubmission = (user: UserProfile | null) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (image: File): Promise<string> => {
    const userId = user?.id || "anonymous";
    return await uploadRecipeImage(image, userId);
  };

  const submitRecipe = async (
    formData: RecipeFormData,
    isEdit: boolean,
    existingRecipe?: Recipe | null
  ) => {
    setIsSubmitting(true);
    setError(null);

    try {
      let uploadedUrl = "";
      if (formData.image) {
        uploadedUrl = await handleImageUpload(formData.image);
      }

      if (isEdit && existingRecipe) {
        await handleRecipeUpdate(formData, existingRecipe, uploadedUrl);
      } else {
        await handleRecipeCreation(formData, uploadedUrl);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save recipe";
      setError(errorMessage);
      console.error("Recipe submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecipeUpdate = async (
    formData: RecipeFormData,
    existingRecipe: Recipe,
    uploadedUrl: string
  ) => {
    const updateData = {
      name: formData.title,
      steps: formData.steps,
      ingredients: formData.ingredientGroups,
      image: uploadedUrl || existingRecipe.image,
      time: formData.time,
      tag: formData.tag,
      language: formData.language,
      portions: formData.portion,
    };

    const ok = await updateRecipe({
      recipeId: existingRecipe.id,
      userId: user?.id || "anonymous",
      updateData,
    });

    if (!ok) {
      throw new Error("Failed to update recipe");
    }

    router.push(`/recipe/${existingRecipe.id}`);
  };

  const handleRecipeCreation = async (
    formData: RecipeFormData,
    uploadedUrl: string
  ) => {
    const recipeData: Omit<
      Recipe,
      "id" | "created" | "updated" | "owner" | "owner_id"
    > = {
      name: formData.title,
      steps: formData.steps,
      ingredients: formData.ingredientGroups,
      image: uploadedUrl,
      time: formData.time,
      tag: formData.tag,
      language: formData.language,
      portions: formData.portion,
    };

    const data = await createRecipe(recipeData);
    if (data?.id) {
      router.push(`/recipe/${data.id}`);
    } else {
      throw new Error("Failed to create recipe - no ID returned");
    }
  };

  const clearError = () => setError(null);

  return {
    submitRecipe,
    isSubmitting,
    error,
    clearError,
  };
};
