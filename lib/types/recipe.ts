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
};

export type Ingredient = {
  groupName: string;
  ingredients: string[];
};
