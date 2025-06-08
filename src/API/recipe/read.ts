import { supabase } from "../supabase";

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
