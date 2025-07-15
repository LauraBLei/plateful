import { NextRequest, NextResponse } from "next/server";
import { supabase } from "src/helpers/supaBaseBrowserClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeParams = searchParams.getAll("time");
  const tagParams = searchParams.getAll("tag");
  const language = searchParams.get("language");

  try {
    // Flexible filter: support multiple tags, multiple times, and language
    let query = supabase
      .from("recipes")
      .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)");
    if (tagParams.length > 0) query = query.in("tag", tagParams);
    if (timeParams.length > 0) query = query.in("time", timeParams.map(Number));
    if (language) query = query.eq("language", language);
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
