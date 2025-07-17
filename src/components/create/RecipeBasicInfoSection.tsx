import { RecipeFormData } from "src/types/recipe";
import { StepsInput } from "./steps";
import { TagSelect } from "./tag";
import { TimeSelect } from "./time";

type RecipeBasicInfoSectionProps = {
  formData: RecipeFormData;
  updateField: (field: keyof RecipeFormData, value: unknown) => void;
};

export const RecipeBasicInfoSection = ({
  formData,
  updateField,
}: RecipeBasicInfoSectionProps) => {
  return (
    <div className="w-full flex flex-col gap-5 lg:max-w-[700px]">
      <div>
        <label className="headlineTwo" htmlFor="title">
          Recipe Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="input"
          maxLength={50}
          required
        />
      </div>

      <div className="flex gap-5 w-full">
        <TimeSelect
          time={formData.time}
          setTime={(time) => updateField("time", time)}
        />
        <TagSelect
          tag={formData.tag}
          setTag={(tag) => updateField("tag", tag)}
        />
      </div>

      <StepsInput
        steps={formData.steps}
        setSteps={(steps) => updateField("steps", steps)}
      />
    </div>
  );
};
