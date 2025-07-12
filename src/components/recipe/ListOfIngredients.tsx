import React from "react";

interface IngredientGroup {
  groupName: string;
  ingredients: string[];
}

interface ListOfIngredientsProps {
  ingredients: IngredientGroup[];
}

export const ListOfIngredients: React.FC<ListOfIngredientsProps> = ({
  ingredients,
}) => (
  <>
    {ingredients.map((ingredientGroup) => (
      <div key={ingredientGroup.groupName}>
        <p className="text-lg font-semibold">{ingredientGroup.groupName}</p>
        <ul className="ml-5">
          {ingredientGroup.ingredients.map((ingredient, i) => (
            <li className="text-lg" key={ingredient + i}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
);
