"use client";
import { useEffect, useState } from "react";
import type { Recipe } from "../../../lib/types/recipe";
import { readRecipe } from "../api/recipe/read";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { checkUser } from "../api/auth/user";
import { UserProfile } from "../../../lib/types/user";
import { Clock, HeartIcon } from "lucide-react";

const Recipe = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [owner, setOwner] = useState<UserProfile | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? ``;

  const getCookingTimeLabel = (minutes: number) => {
    switch (minutes) {
      case 30:
        return "30 min";
      case 60:
        return "1 hour";
      case 90:
        return "1.5 hours";
      case 120:
        return "2 hours";
      default:
        return "> 2 hours";
    }
  };
  const cookingTime = getCookingTimeLabel(recipe?.time ? recipe.time : 30);

  useEffect(() => {
    if (id) {
      readRecipe({ id: Number(id) }).then((x) => {
        if (x) setRecipe(x);
        console.log("Fetched recipe:", x);
      });
    }
  }, [id]);

  useEffect(() => {
    if (recipe && recipe.owner_id) {
      checkUser(recipe.owner_id).then((x) => {
        if (x) setOwner(x);
      });
    }
  }, [recipe]);
  console.log("user state: ", owner);

  useEffect(() => {
    if (recipe?.steps) {
      setCheckedSteps(Array(recipe.steps.length).fill(false));
    }
  }, [recipe?.steps]);

  const handleStepCheck = (index: number) => {
    setCheckedSteps((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="max-w-[1440px] mb-10 px-2 flex gap-10 w-full font-primary text-brand-black dark:text-brand-white">
      <div className="flex flex-col gap-5 md:gap-10">
        <div className="relative aspect-[308/181] w-[561px] rounded-md overflow-hidden shadow-md">
          <Image
            fill
            src={recipe?.image ? recipe.image : "/default.jpg"}
            alt={recipe?.name ? recipe.name : "no image found"}
            className="object-cover"
          />
        </div>
        <div className="border-1 p-5 shadow-md flex flex-col gap-5 rounded-md border-brand-black dark:border-brand-white">
          <h2 className="headlineTwo pb-2 border-b-1 border-brand-black dark:border-brand-white">
            Ingredients
          </h2>

          {recipe?.ingredients.map((ingredientGroup) => (
            <div key={ingredientGroup.groupName}>
              <p className="text-lg font-semibold">
                {ingredientGroup.groupName}
              </p>
              <ul className="ml-5">
                {ingredientGroup.ingredients.map((ingredient) => (
                  <li className="text-lg" key={ingredient}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="headline flex justify-between">
            {recipe?.name}{" "}
            <div className="flex items-center gap-5">
              <p className="flex gap-2 items-center">
                <HeartIcon className="w-[20px] hover:text-brand-orange cursor-pointer" />
                <span className="whitespace-nowrap text-sm">
                  Add to favorite
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-[20px]" />
                <span className="text-sm whitespace-nowrap">{cookingTime}</span>
              </p>
            </div>
          </h1>
        </div>
        <div className="flex gap-5 items-center py-2 border-b-1 border-brand-black dark:border-brand-white">
          <div className="relative  aspect-square w-[50px] rounded-full overflow-hidden shadow-md">
            <Image
              fill
              src={owner?.avatar ? owner.avatar : "/default.jpg"}
              alt={owner?.name ? owner.name : "no image found"}
              className="object-cover"
            />
          </div>
          <p className="text-lg">{owner?.name}</p>
        </div>
        <div className="flex flex-col gap-5 py-2">
          <h3 className="headlineTwo">How to do it!</h3>

          {recipe?.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id={`step-checkbox-${i}`}
                className={`cursor-pointer w-5 h-5 rounded-md border-2 border-brand-orange appearance-none transition-colors duration-200 ${
                  checkedSteps[i] ? "bg-brand-orange" : "bg-transparent"
                }`}
                checked={checkedSteps[i] || false}
                onChange={() => handleStepCheck(i)}
              />
              <p
                className={
                  checkedSteps[i]
                    ? "line-through text-brand-black dark:text-brand-white d"
                    : ""
                }
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
