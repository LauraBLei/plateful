import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const recipeData = await req.json();

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
