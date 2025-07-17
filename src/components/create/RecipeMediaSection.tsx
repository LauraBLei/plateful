import { Recipe, RecipeFormData } from "src/types/recipe";
import { ImageInput } from "./image";
import { IngredientGroupsInput } from "./ingredients";
import { LanguageSelect } from "./language";
import { PortionSize } from "./portions";

type RecipeMediaSectionProps = {
  formData: RecipeFormData;
  updateField: (field: keyof RecipeFormData, value: unknown) => void;
  existingRecipe?: Recipe | null;
};

export const RecipeMediaSection = ({
  formData,
  updateField,
  existingRecipe,
}: RecipeMediaSectionProps) => {
  return (
    <div className="flex gap-5 flex-col w-full">
      <ImageInput
        setImage={(image) => updateField("image", image)}
        image={formData.image}
        existingRecipe={existingRecipe}
      />

      <LanguageSelect
        language={formData.language}
        setLanguage={(language) => updateField("language", language)}
      />

      <PortionSize
        setPortion={(portion) => updateField("portion", portion)}
        portion={formData.portion}
      />

      <IngredientGroupsInput
        ingredientGroups={formData.ingredientGroups}
        setIngredientGroups={(groups) =>
          updateField("ingredientGroups", groups)
        }
      />
    </div>
  );
};
