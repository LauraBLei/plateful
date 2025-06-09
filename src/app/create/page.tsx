"use client";
import { AuthContext } from "@/components/contextTypes";
import React, { useContext, useState } from "react";
import { uploadRecipeImage } from "../api/recipe/create";
import { ImageInput } from "@/components/create/image";
import { TimeSelect } from "@/components/create/time";
import { TagSelect } from "@/components/create/tag";
import { StepsInput } from "@/components/create/steps";
import { IngredientGroupsInput } from "@/components/create/ingredients";
import { supabase } from "../../../lib/supabase";

type IngredientGroup = {
  groupName: string;
  ingredients: string[];
};
const CreateRecipe = () => {
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
    <div className="max-w-[1440px] mb-10 flex flex-col gap-10 w-full px-2  ">
      <h1 className="headline">Create Recipe!</h1>
      <form
        onSubmit={handleSubmit}
        className="  w-full  space-y-6 font-primary text-brand-black dark:text-brand-white"
      >
        <div className="flex w-full gap-5 flex-wrap lg:flex-nowrap">
          <div className="flex gap-5 flex-col w-full ">
            {/* Image Upload */}
            <ImageInput setImage={setImage} image={image} />
            {/* Title */}
            <div>
              <label className="headlineTwo" htmlFor="title">
                Recipe Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                maxLength={50}
                required
              />
            </div>
            <div className="flex gap-5 w-full">
              <TimeSelect time={time} setTime={setTime} />

              <TagSelect tag={tag} setTag={setTag} />
            </div>

            {/* Recipe Steps */}
            <StepsInput
              steps={steps}
              handleStepChange={handleStepChange}
              addStep={addStep}
              removeStep={removeStep}
            />
          </div>
          <div className="w-full lg:max-w-[700px]">
            {/* Ingredient Groups */}
            <IngredientGroupsInput
              ingredientGroups={ingredientGroups}
              handleGroupNameChange={handleGroupNameChange}
              handleIngredientChange={handleIngredientChange}
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
              addIngredientGroup={addIngredientGroup}
              removeIngredientGroup={removeIngredientGroup}
            />
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="createButton hover-effect">
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
