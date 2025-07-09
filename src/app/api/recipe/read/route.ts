import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const idParams = searchParams.getAll("id");
  const time = searchParams.get("time");
  const tag = searchParams.get("tag");

  try {
    if (idParams.length === 1) {
      // Single id
      const id = idParams[0];
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", Number(id))
        .single();
      if (error) throw error;
      return NextResponse.json(data, { status: 200 });
    } else if (idParams.length > 1) {
      // Multiple ids
      const ids = idParams.map(Number);
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .in("id", ids);
      if (error) throw error;
      return NextResponse.json(data, { status: 200 });
    } else if (userId) {
      // Get recipes by user
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("owner_id", userId);
      if (error) throw error;
      return NextResponse.json(data, { status: 200 });
    } else if (time || tag) {
      // Get sorted recipes
      let query = supabase.from("recipes").select("*");
      if (time) query = query.eq("time", Number(time));
      if (tag) query = query.eq("tag", tag);
      const { data, error } = await query;
      if (error) throw error;
      return NextResponse.json(data, { status: 200 });
    } else {
      // Get all recipes
      const { data, error } = await supabase.from("recipes").select();
      if (error) throw error;
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
