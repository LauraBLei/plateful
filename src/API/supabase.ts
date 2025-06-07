import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const publicURLForPlateful = import.meta.env.VITE_SUPABASE_URL ?? "";
const superSecretKeyDoNotCommit = import.meta.env.VITE_SUPABASE_KEY ?? "";
export const supabase = createClient(
  publicURLForPlateful,
  superSecretKeyDoNotCommit
);

export const readRecipes = async () => {
  const { data, error } = await supabase.from("recipes").select();
  console.log("data: ", data);
  console.log("error: ", error);

  return data;
};
