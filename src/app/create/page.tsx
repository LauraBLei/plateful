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
import { PortionSize } from "@/components/create/portions";
import { LanguageSelect } from "@/components/create/language";

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
  const [language, setLanguage] = useState<string>("");
  const [portion, setPortion] = useState(1);
  const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>([
    { groupName: "", ingredients: [""] },
  ]);

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
      language,
      portions: portion,
    };

    console.log("Recipe submitted:", recipeData);
    // Submit recipeData to Supabase
    const { data, error } = await supabase
      .from("recipes")
      .insert(recipeData)
      .select("id")
      .single();
    if (!error && data && data.id) {
      window.location.href = `/recipe?id=${data.id}`;
    }
  };

  return (
    <div className="max-w-[1440px] mb-30 flex flex-col gap-10 w-full px-2  ">
      <h1 className="headline">Create Recipe!</h1>
      <form
        onSubmit={handleSubmit}
        className="  w-full  space-y-6 font-primary text-brand-black dark:text-brand-white"
      >
        <div className="flex w-full gap-5 flex-wrap lg:flex-nowrap">
          <div className="flex gap-5 flex-col w-full ">
            {/* Image Upload */}

            <ImageInput setImage={setImage} image={image} />
            <LanguageSelect setLanguage={setLanguage} />
            <PortionSize setPortion={setPortion} portion={portion} />

            {/* Ingredient Groups */}
            <IngredientGroupsInput
              ingredientGroups={ingredientGroups}
              setIngredientGroups={setIngredientGroups}
            />
            {/* Title */}
          </div>
          <div className="w-full flex flex-col gap-5 lg:max-w-[700px]">
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
            <StepsInput steps={steps} setSteps={setSteps} />
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
