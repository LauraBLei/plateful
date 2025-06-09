type IngredientGroup = {
  groupName: string;
  ingredients: string[];
};

interface IngredientGroupsInputProps {
  ingredientGroups: IngredientGroup[];
  handleGroupNameChange: (index: number, value: string) => void;
  handleIngredientChange: (
    groupIndex: number,
    ingredientIndex: number,
    value: string
  ) => void;
  addIngredient: (groupIndex: number) => void;
  removeIngredient: (groupIndex: number, ingredientIndex: number) => void;
  addIngredientGroup: () => void;
  removeIngredientGroup: (index: number) => void;
}

export const IngredientGroupsInput = ({
  ingredientGroups,
  handleGroupNameChange,
  handleIngredientChange,
  addIngredient,
  removeIngredient,
  addIngredientGroup,
  removeIngredientGroup,
}: IngredientGroupsInputProps) => (
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
