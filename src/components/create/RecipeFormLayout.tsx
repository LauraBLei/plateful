import { Recipe } from "src/types/recipe";
import { RecipeFormData } from "./hooks/useRecipeForm";
import { RecipeBasicInfoSection } from "./RecipeBasicInfoSection";
import { RecipeMediaSection } from "./RecipeMediaSection";

type RecipeFormLayoutProps = {
  formData: RecipeFormData;
  updateField: (field: keyof RecipeFormData, value: any) => void;
  existingRecipe?: Recipe | null;
};

export const RecipeFormLayout = ({
  formData,
  updateField,
  existingRecipe,
}: RecipeFormLayoutProps) => {
  return (
    <div className="flex w-full gap-5 flex-wrap lg:flex-nowrap">
      <RecipeMediaSection
        formData={formData}
        updateField={updateField}
        existingRecipe={existingRecipe}
      />

      <RecipeBasicInfoSection formData={formData} updateField={updateField} />
    </div>
  );
};
