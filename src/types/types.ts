import { Recipe } from "./recipe";
import { UserProfile } from "./user";

export interface SearchResults {
  recipes: Recipe[];
  users: UserProfile[];
  query: string;
}
export interface CounterProps {
  count: number;
  maxCharacters: number;
  style: string;
}
