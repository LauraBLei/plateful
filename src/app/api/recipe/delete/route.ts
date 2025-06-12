import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { userId, recipeId } = await req.json();
    const { error } = await supabase
      .from("recipes")
      .delete()
      .match({ id: recipeId, owner_id: userId });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
