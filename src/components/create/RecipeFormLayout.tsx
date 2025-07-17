import { Recipe, RecipeFormData } from "src/types/recipe";
import { RecipeBasicInfoSection } from "./RecipeBasicInfoSection";
import { RecipeMediaSection } from "./RecipeMediaSection";

type RecipeFormLayoutProps = {
  formData: RecipeFormData;
  updateField: (field: keyof RecipeFormData, value: unknown) => void;
  existingRecipe?: Recipe | null;
};

export const RecipeFormLayout = ({
  formData,
  updateField,
  existingRecipe,
}: RecipeFormLayoutProps) => {
  return (
    <div className="flex w-full gap-5 lg:flex-row flex-col">
      <div className="flex-1 min-w-0">
        <RecipeMediaSection
          formData={formData}
          updateField={updateField}
          existingRecipe={existingRecipe}
        />
      </div>

      <div className="flex-1 min-w-0">
        <RecipeBasicInfoSection formData={formData} updateField={updateField} />
      </div>
    </div>
  );
};
