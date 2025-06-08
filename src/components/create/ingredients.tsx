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
  <div>
    <h2 className="font-semibold mb-2">Ingredients</h2>
    {ingredientGroups.map((group, groupIdx) => (
      <div
        key={groupIdx}
        className="mb-6 border border-gray-200 p-4 rounded space-y-4 bg-gray-50"
      >
        <div className="flex items-center gap-2">
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
            className="text-red-600 hover:text-red-800 disabled:text-gray-400"
            aria-label={`Remove ingredient group ${groupIdx + 1}`}
          >
            &times;
          </button>
        </div>
        <input
          type="text"
          id={`group-name-${groupIdx}`}
          value={group.groupName}
          onChange={(e) => handleGroupNameChange(groupIdx, e.target.value)}
          placeholder="e.g. Base, Sauce, Toppings"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="button"
                onClick={() => removeIngredient(groupIdx, ingIdx)}
                disabled={group.ingredients.length === 1}
                className="text-red-600 hover:text-red-800 disabled:text-gray-400"
                aria-label={`Remove ingredient ${ingIdx + 1}`}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addIngredient(groupIdx)}
            className="mt-1 px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700"
          >
            + Add Ingredient
          </button>
        </div>
      </div>
    ))}
    <button
      type="button"
      onClick={addIngredientGroup}
      className="px-3 py-2 rounded bg-green-800 text-white hover:bg-green-900"
    >
      + Add Ingredient Group
    </button>
  </div>
);
