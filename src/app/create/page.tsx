"use client";
import { AuthContext } from "@/components/contextTypes";
import React, { useContext, useEffect, useState } from "react";
import { ImageInput } from "@/components/create/image";
import { TimeSelect } from "@/components/create/time";
import { TagSelect } from "@/components/create/tag";
import { StepsInput } from "@/components/create/steps";
import { IngredientGroupsInput } from "@/components/create/ingredients";
import { PortionSize } from "@/components/create/portions";
import { LanguageSelect } from "@/components/create/language";
import { useSearchParams } from "next/navigation";
import { Recipe } from "@/types/recipe";
import {
  fetchRecipeById,
  updateRecipe,
  createRecipe,
  uploadRecipeImage,
} from "@/api/recipeEdit";

type IngredientGroup = {
  groupName: string;
  ingredients: string[];
};
const CreateRecipe = () => {
  const { user } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const recipeIdFromUrl = searchParams.get("id");
  const isEdit = !!recipeIdFromUrl;
  const [existingRecipe, setExistingRecipe] = useState<Recipe | null>(null);
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
  console.log("recipe: ", existingRecipe);
  console.log("isEdit: ", isEdit);

  useEffect(() => {
    if (isEdit) {
      fetchRecipeById(Number(recipeIdFromUrl)).then(
        (data: Recipe | null | Recipe[]) => {
          const recipe = Array.isArray(data) ? data[0] : data;
          if (recipe) {
            setExistingRecipe(recipe);
            setTitle(recipe.name || "");
            setTime(recipe.time || 30);
            setTag(recipe.tag || "breakfast");
            setSteps(recipe.steps || [""]);
            setLanguage(recipe.language || "");
            setPortion(recipe.portions || 1);
            setIngredientGroups(
              recipe.ingredients || [{ groupName: "", ingredients: [""] }]
            );
          }
        }
      );
    }
  }, [isEdit, recipeIdFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedUrl = "";
    try {
      if (image) {
        const userId = user?.id || "anonymous";
        uploadedUrl = await uploadRecipeImage(image, userId);
      }
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Failed to upload image.");
      return;
    }

    if (isEdit && existingRecipe) {
      // Only update image if a new one is uploaded, otherwise keep the old one
      const updateData = {
        name: title,
        steps,
        ingredients: ingredientGroups,
        image: uploadedUrl || existingRecipe.image,
        time,
        tag,
        language,
        portions: portion,
      };
      try {
        const ok = await updateRecipe({
          recipeId: existingRecipe.id,
          userId: user?.id || "anonymous",
          updateData,
        });
        if (!ok) throw new Error("Failed to update recipe");
        window.location.href = `/recipe?id=${existingRecipe.id}`;
      } catch {
        alert("Failed to update recipe.");
      }
    } else {
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
      try {
        const data = await createRecipe(recipeData);
        if (data && data.id) {
          window.location.href = `/recipe?id=${data.id}`;
        }
      } catch {
        alert("Failed to create recipe.");
      }
    }
  };

  return (
    <div className="max-w-[1440px] mb-30 flex flex-col gap-10 w-full px-2  ">
      <h1 className="headline">{isEdit ? "Edit Recipe!" : "Create Recipe!"}</h1>
      <form
        onSubmit={handleSubmit}
        className="  w-full  space-y-6 font-primary text-brand-black dark:text-brand-white"
      >
        <div className="flex w-full gap-5 flex-wrap lg:flex-nowrap">
          <div className="flex gap-5 flex-col w-full ">
            {/* Image Upload */}
            <ImageInput
              setImage={setImage}
              image={image}
              existingRecipe={existingRecipe}
            />
            <LanguageSelect language={language} setLanguage={setLanguage} />
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
          {isEdit ? "Update Recipe" : "Submit Recipe"}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
