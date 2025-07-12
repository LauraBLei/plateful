import React from "react";
import { ListOfIngredients } from "./ListOfIngredients";

interface IngredientsInfoProps {
  recipe: any;
}

export const IngredientsInfo: React.FC<IngredientsInfoProps> = ({ recipe }) => (
  <div className="flex flex-col gap-5 md:gap-10 w-full">
    <div className="relative aspect-[308/181] w-full rounded-md overflow-hidden shadow-md">
      <img
        src={recipe?.image || "/default.jpg"}
        alt={recipe?.name || "no image found"}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="border-1 p-5 shadow-md flex flex-col gap-5 rounded-md border-brand-black dark:border-brand-white">
      <h2 className="headlineTwo flex justify-between pb-2 border-b-1 border-brand-black dark:border-brand-white">
        Ingredients
        <p>Portions: {recipe?.portions}</p>
      </h2>
      <ListOfIngredients ingredients={recipe?.ingredients || []} />
    </div>
  </div>
);
