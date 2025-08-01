export type Recipe = {
  id: number;
  name: string;
  owner_id: string;
  time: number;
  ingredients: Ingredient[];
  steps: string[];
  image: string;
  created: Date;
  updated: Date;
  portions: number;
  tag: string;
  language: string;
  owner: Owner;
};

export type Owner = {
  id: string;
  name: string;
  avatar: string;
};

export type Ingredient = {
  groupName: string;
  ingredients: string[];
};
export type IngredientGroup = {
  groupName: string;
  ingredients: string[];
};
export type RecipeFormData = {
  image: File | null;
  title: string;
  time: number;
  tag: string;
  steps: string[];
  language: string;
  portion: number;
  ingredientGroups: IngredientGroup[];
};
export type RecipeType = "recipes" | "favorites";
