"use client";
import { useRecipeForm } from "@/components/create/hooks/useRecipeForm";
import { useRecipeSubmission } from "@/components/create/hooks/useRecipeSubmission";
import { useRecipeEdit } from "@/components/create/hooks/useRecipeEdit";
import { RecipeFormLayout } from "@/components/create/RecipeFormLayout";
import { RecipeFormActions } from "@/components/create/RecipeFormActions";
import { ErrorDisplay } from "@/components/create/ErrorDisplay";

export const CreatePageContent = () => {
  const {
    isEdit,
    existingRecipe,
    isLoading: isLoadingRecipe,
    error: loadError,
  } = useRecipeEdit();

  const { formData, updateField, validateForm } = useRecipeForm(existingRecipe);

  const {
    submitRecipe,
    isSubmitting,
    error: submitError,
    clearError,
  } = useRecipeSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
      console.error("Validation errors:", validationErrors);
      return;
    }

    await submitRecipe(formData, isEdit, existingRecipe);
  };

  if (isLoadingRecipe) {
    return (
      <div className="max-w-[1440px] mb-30 flex flex-col gap-10 w-full px-2">
        <div className="flex justify-center items-center py-20">
          <div>Loading recipe...</div>
        </div>
      </div>
    );
  }

  const displayError = loadError || submitError;

  return (
    <div className="max-w-[1440px] mb-30 flex flex-col gap-10 w-full px-2">
      <h1 className="headline">{isEdit ? "Edit Recipe!" : "Create Recipe!"}</h1>
      <ErrorDisplay error={displayError} onClear={clearError} />
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-6 font-primary text-brand-black dark:text-brand-white"
      >
        <RecipeFormLayout
          formData={formData}
          updateField={updateField}
          existingRecipe={existingRecipe}
        />
        <RecipeFormActions isEdit={isEdit} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};
