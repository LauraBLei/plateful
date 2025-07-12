import { Recipe } from "@/types/recipe";
import { createClient } from "@supabase/supabase-js";

// Uses /api/recipe/all for client-side, direct query for server-side
export async function fetchAllRecipes(): Promise<Recipe[]> {
  try {
    // If running on server side, query Supabase directly for better performance
    if (typeof window === "undefined") {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from("recipes")
        .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)");

      if (error) {
        console.error("Error fetching recipes from Supabase:", error);
        return [];
      }

      return data || [];
    }

    // Client-side: use API route
    const res = await fetch("/api/recipe/all");
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return [];
  }
}

// Uses /api/recipe/search for client-side, direct query for server-side
export async function fetchRecipesByTag(tag: string): Promise<Recipe[]> {
  try {
    // If running on server side, query Supabase directly
    if (typeof window === "undefined") {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from("recipes")
        .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
        .contains("tags", [tag]);

      if (error) {
        console.error("Error fetching recipes by tag from Supabase:", error);
        return [];
      }

      return data || [];
    }

    // Client-side: use API route
    const res = await fetch(
      `/api/recipe/search?tag=${encodeURIComponent(tag)}`
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching recipes by tag:", error);
    return [];
  }
}
