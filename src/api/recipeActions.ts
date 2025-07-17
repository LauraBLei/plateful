import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";
import { Recipe } from "src/types/recipe";

// export async function getRecipesByTag(tag: string): Promise<Recipe[]> {
//   try {
//     const supabase = await createServerSupabaseClient();

//     const { data, error } = await supabase
//       .from("recipes")
//       .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
//       .contains("tags", [tag]);

//     if (error) {
//       console.error("Error fetching recipes by tag from Supabase:", error);
//       return [];
//     }

//     return data || [];
//   } catch (error) {
//     console.error("Error fetching recipes by tag:", error);
//     return [];
//   }
// }

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("recipes")
      .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)");

    if (error) {
      console.error("Error fetching recipes from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return [];
  }
}

export async function fetchTimeRecipes(): Promise<Recipe[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("recipes")
      .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
      .lte("time", 30)
      .limit(4);

    if (error) {
      console.error("Error fetching time recipes from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching time recipes:", error);
    return [];
  }
}

export async function fetchRecentRecipes(): Promise<Recipe[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("recipes")
      .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      console.error("Error fetching recent recipes from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching recent recipes:", error);
    return [];
  }
}
