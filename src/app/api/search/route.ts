import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ recipes: [], users: [] }, { status: 200 });
  }

  const searchTerm = query.trim();

  try {
    // Search recipes by name or tag
    const { data: recipes, error: recipesError } = await supabase
      .from("recipes")
      .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
      .ilike("name", `%${searchTerm}%`);

    if (recipesError) {
      console.error("Recipes search error:", recipesError);
      throw recipesError;
    }

    // Search users by name or bio
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, name, avatar, bio")
      .ilike("name", `%${searchTerm}%`);

    if (usersError) {
      console.error("Users search error:", usersError);
      throw usersError;
    }

    return NextResponse.json(
      {
        recipes: recipes || [],
        users: users || [],
        query: searchTerm,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Search error:", error);
    console.error("Search term:", searchTerm);
    return NextResponse.json(
      {
        error: "Failed to perform search",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
