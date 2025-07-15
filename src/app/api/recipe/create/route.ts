import { NextRequest, NextResponse } from "next/server";
import { createAuthenticatedSupabaseClient } from "src/api/headerActions";

export async function POST(req: NextRequest) {
  try {
    // Create authenticated Supabase client
    const supabase = createAuthenticatedSupabaseClient(req);

    const recipeData = await req.json();
    console.log("Recipe data:", {
      ...recipeData,
      ingredients: "[REDACTED]",
      steps: "[REDACTED]",
    });

    const { data, error } = await supabase
      .from("recipes")
      .insert(recipeData)
      .select("id")
      .single();

    if (error) {
      console.error("Recipe creation error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ id: data.id }, { status: 200 });
  } catch (err: any) {
    console.error("Recipe creation exception:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
