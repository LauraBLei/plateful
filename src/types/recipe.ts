import type { UserProfile } from "./user";

export type Recipe = {
  id: number;
  name: string;
  owner: UserProfile;
  time: number;
  ingredients: Ingredient[];
  steps: string[];
  image: string;
  created: Date;
  updated: Date;
};

export type Ingredient = {
  name: string;
  ingredients: string[];
};
