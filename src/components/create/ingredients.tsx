export type IngredientGroup = {
  groupName: string;
  ingredients: string[];
};

interface IngredientGroupsInputProps {
  ingredientGroups: IngredientGroup[];
  setIngredientGroups: React.Dispatch<React.SetStateAction<IngredientGroup[]>>;
}

export const IngredientGroupsInput = ({
  ingredientGroups,
  setIngredientGroups,
}: IngredientGroupsInputProps) => {
  const handleGroupNameChange = (index: number, value: string) => {
    const groups = [...ingredientGroups];
    groups[index].groupName = value;
    setIngredientGroups(groups);
  };
  const handleIngredientChange = (
    groupIndex: number,
    ingredientIndex: number,
    value: string
  ) => {
    const groups = [...ingredientGroups];
    groups[groupIndex].ingredients[ingredientIndex] = value;
    setIngredientGroups(groups);
  };
  const addIngredient = (groupIndex: number) => {
    const groups = [...ingredientGroups];
    groups[groupIndex].ingredients.push("");
    setIngredientGroups(groups);
  };
  const removeIngredient = (groupIndex: number, ingredientIndex: number) => {
    const groups = [...ingredientGroups];
    if (groups[groupIndex].ingredients.length === 1) return; // prevent removing last ingredient
    groups[groupIndex].ingredients = groups[groupIndex].ingredients.filter(
      (_, i) => i !== ingredientIndex
    );
    setIngredientGroups(groups);
  };

  const addIngredientGroup = () => {
    setIngredientGroups([
      ...ingredientGroups,
      { groupName: "", ingredients: [""] },
    ]);
  };
  const removeIngredientGroup = (index: number) => {
    if (ingredientGroups.length === 1) return; // prevent removing last group
    setIngredientGroups(ingredientGroups.filter((_, i) => i !== index));
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="headlineTwo">Ingredients</h2>
      {ingredientGroups.map((group, groupIdx) => (
        <div
          key={groupIdx}
          className="w-full mb-6 border border-gray-200 p-4 rounded-md space-y-4 bg-brand-black text-brand-white dark:text-brand-black dark:bg-brand-white "
        >
          <div className="flex items-center gap-2 w-full">
            <label
              className="block font-semibold flex-1"
              htmlFor={`group-name-${groupIdx}`}
            >
              Group Name
            </label>
            <button
              type="button"
              onClick={() => removeIngredientGroup(groupIdx)}
              disabled={ingredientGroups.length === 1}
              className="removeButton flex items-center gap-2 hover-effect"
              aria-label={`Remove ingredient group ${groupIdx + 1}`}
            >
              <span className="text-sm text-brand-black">Remove Group</span>{" "}
              &times;
            </button>
          </div>
          <input
            type="text"
            id={`group-name-${groupIdx}`}
            value={group.groupName}
            onChange={(e) => handleGroupNameChange(groupIdx, e.target.value)}
            placeholder="e.g. Base, Sauce, Toppings"
            className="input2"
            maxLength={50}
            required
          />

          <div>
            <label className="block mb-1 font-semibold">Ingredients</label>
            {group.ingredients.map((ingredient, ingIdx) => (
              <div key={ingIdx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(groupIdx, ingIdx, e.target.value)
                  }
                  placeholder="Ingredient"
                  className="input2"
                  maxLength={80}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(groupIdx, ingIdx)}
                  disabled={group.ingredients.length === 1}
                  className="removeButton"
                  aria-label={`Remove ingredient ${ingIdx + 1}`}
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addIngredient(groupIdx)}
              className="createButton hover-effect"
            >
              + Add Ingredient
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addIngredientGroup}
        className="createButton hover-effect"
      >
        + Add Ingredient Group
      </button>
    </div>
  );
};
