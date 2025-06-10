import { supabase } from "../../../../lib/supabase";

export const readRecipes = async () => {
  const { data, error } = await supabase.from("recipes").select();

  if (error) {
    console.log(error);
  }
  return data;
};

export const readUserRecipes = async (userId: string) => {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("owner_id", userId);

  if (error) console.log("error: ", error);

  return data;
};

export const readRecipe = async ({ id }: { id: number }) => {
  const { data: recipe, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) console.log("Recipe fetch gave error: ", error);
  return recipe;
};

export const readSortedRecipes = async ({
  time,
  tag,
}: {
  time?: number;
  tag?: string;
}) => {
  let query = supabase.from("recipes").select("*");
  if (typeof time !== "undefined") {
    query = query.eq("time", time);
  }
  if (tag) {
    query = query.eq("tag", tag);
  }
  const { data, error } = await query;
  if (error) console.log("error fetching sorted recipes:", error);
  return data;
};

export const readFavoriteRecipes = async ({
  favorites,
}: {
  id: string;
  favorites: number[];
}) => {
  if (!favorites || favorites.length === 0) return [];
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .in("id", favorites);
  if (error) console.log("error fetching favorite recipes:", error);
  return data;
};
