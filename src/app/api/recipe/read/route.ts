import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const idParams = searchParams.getAll("id");
  const timeParams = searchParams.getAll("time");
  const tagParams = searchParams.getAll("tag");
  const language = searchParams.get("language");

  try {
    if (idParams.length > 0) {
      // One or more ids: always return an array
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
    } else if (timeParams.length > 0 || tagParams.length > 0 || language) {
      // Flexible filter: support multiple tags, multiple times, and language
      let query = supabase.from("recipes").select("*");
      if (tagParams.length > 0) query = query.in("tag", tagParams);
      if (timeParams.length > 0)
        query = query.in("time", timeParams.map(Number));
      if (language) query = query.eq("language", language);
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
