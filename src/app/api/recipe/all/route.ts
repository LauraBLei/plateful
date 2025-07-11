import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Get all recipes
    const { data, error } = await supabase
      .from("recipes")
      .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)");
    if (error) throw error;
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
