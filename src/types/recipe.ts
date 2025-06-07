import type { User } from "./user";

export type Recipe = {
  id: number;
  name: string;
  owner: User;
  time: number;
  ingredients: Ingredient[];
  steps: string[];
  media: Media;
  created: Date;
  updated: Date;
};

export type Ingredient = {
  name: string;
  ingredients: string[];
};

export type Media = {
  src: string;
  alt: string;
};
