import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const idParams = searchParams.getAll("id");

  try {
    if (idParams.length > 0) {
      // One or more ids: always return an array
      const ids = idParams.map(Number);
      const { data, error } = await supabase
        .from("recipes")
        .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
        .in("id", ids);
      if (error) throw error;
      return NextResponse.json(data, { status: 200 });
    } else if (userId) {
      // Get recipes by user
      const { data, error } = await supabase
        .from("recipes")
        .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
        .eq("owner_id", userId);
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
