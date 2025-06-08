import React, { useContext, useState } from "react";
import { uploadRecipeImage } from "../API/recipe/create";
import { AuthContext } from "../types/context";
import { supabase } from "../API/supabase";

type IngredientGroup = {
  groupName: string;
  ingredients: string[];
};

export const CreateRecipe = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState<number>(30);
  const [tag, setTag] = useState("breakfast");
  const [steps, setSteps] = useState<string[]>([""]);
  const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>([
    { groupName: "", ingredients: [""] },
  ]);

  // Steps handlers
  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };
  const addStep = () => setSteps([...steps, ""]);
  const removeStep = (index: number) => {
    if (steps.length === 1) return; // prevent removing last step
    setSteps(steps.filter((_, i) => i !== index));
  };

  // Ingredient group handlers
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedUrl = "";
    try {
      if (image) {
        const userId = user?.id || "anonymous"; // replace this with your actual user logic
        uploadedUrl = await uploadRecipeImage(image, userId);
      }
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Failed to upload image.");
      return;
    }

    const recipeData = {
      name: title,
      steps,
      ingredients: ingredientGroups,
      image: uploadedUrl,
      time,
      tag,
      owner_id: user?.id,
    };

    console.log("Recipe submitted:", recipeData);
    // Submit recipeData to Supabase
    await supabase.from("recipes").insert(recipeData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Image Upload */}
      <div>
        <label className="block mb-1 font-semibold">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="block"
        />
        {image && <p className="text-sm text-gray-600 mt-1">{image.name}</p>}
      </div>

      {/* Title */}
      <div>
        <label className="block mb-1 font-semibold" htmlFor="title">
          Recipe Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="time" className="block mb-1 font-semibold">
          Time Required
        </label>
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
          <option value={90}>1.5 hours</option>
          <option value={120}>2 hours</option>
          <option value={180}>More than 2 hours</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold" htmlFor="tag">
          Tag / Meal Type
        </label>
        <select
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>

      {/* Recipe Steps */}
      <div>
        <h2 className="font-semibold mb-2">Recipe Steps</h2>
        {steps.map((step, i) => (
          <div key={i} className="mb-2 flex items-center gap-2">
            <label className="block flex-1" htmlFor={`step-${i}`}>
              Step {i + 1}
            </label>
            <input
              type="text"
              id={`step-${i}`}
              value={step}
              onChange={(e) => handleStepChange(i, e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => removeStep(i)}
              disabled={steps.length === 1}
              className="text-red-600 hover:text-red-800 disabled:text-gray-400"
              aria-label={`Remove step ${i + 1}`}
            >
              &times;
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="mt-1 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add Step
        </button>
      </div>

      {/* Ingredient Groups */}
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

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded"
      >
        Submit Recipe
      </button>
    </form>
  );
};
