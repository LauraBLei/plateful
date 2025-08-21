import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeParams = searchParams.getAll("time");
  const tagParams = searchParams.getAll("tag");
  const language = searchParams.get("language");

  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase
      .from("recipes")
      .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)");

    if (tagParams.length > 0) query = query.in("tag", tagParams);

    // Handle time filtering with ranges
    if (timeParams.length > 0) {
      const timeFilter = timeParams[0]; // Assuming single time filter selection
      switch (timeFilter) {
        case "15": // Less than 30 minutes
          query = query.lt("time", 30);
          break;
        case "lt60": // Less than 1 hour
          query = query.lt("time", 60);
          break;
        case "lt120": // Less than 2 hours
          query = query.lt("time", 120);
          break;
        case "30": // 30 minutes
          query = query.gte("time", 30).lt("time", 60);
          break;
        case "60": // 1 hour
          query = query.gte("time", 60).lt("time", 90);
          break;
        case "90": // 1.5 hours
          query = query.gte("time", 90).lt("time", 120);
          break;
        case "120": // 2 hours
          query = query.gte("time", 120).lt("time", 180);
          break;
        case "180": // More than 2 hours
          query = query.gte("time", 180);
          break;
        default:
          break;
      }
    }

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
