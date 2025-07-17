import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
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
