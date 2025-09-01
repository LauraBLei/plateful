"use client";

import { useAuth } from "src/providers/AuthProvider";
import { ErrorDisplay } from "../create/ErrorDisplay";
import { useRecipeForm } from "../create/hooks/useRecipeForm";
import { useRecipeSubmission } from "../create/hooks/useRecipeSubmission";
import { RecipeFormActions } from "../create/RecipeFormActions";
import { RecipeFormLayout } from "../create/RecipeFormLayout";

export const CreatePageContent = () => {
  const { user } = useAuth();
  const { formData, updateField, validateForm } = useRecipeForm();

  const { submitRecipe, isSubmitting, error, clearError } =
    useRecipeSubmission(user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
      console.error("Validation errors:", validationErrors);
      return;
    }

    await submitRecipe(formData, false);
  };

  return (
    <div className="max-w-[1440px] mb-30 flex flex-col gap-10 w-full px-2">
      <h1 className="headline">Create Recipe!</h1>
      <ErrorDisplay error={error} onClear={clearError} />
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-6 font-primary text-brand-black dark:text-brand-white"
      >
        <RecipeFormLayout formData={formData} updateField={updateField} />
        <RecipeFormActions isEdit={false} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};
