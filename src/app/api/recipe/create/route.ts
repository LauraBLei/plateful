import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const recipeData = await req.json();
    const recipeWithOwner = {
      ...recipeData,
      owner_id: user.id,
    };

    const { data, error } = await supabase
      .from("recipes")
      .insert(recipeWithOwner)
      .select("id")
      .single();

    if (error) {
      console.error("Recipe creation error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id }, { status: 200 });
  } catch (err: unknown) {
    console.error("Recipe creation exception:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
