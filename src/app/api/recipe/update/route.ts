import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { recipeId, userId, updateData } = await req.json();
    const { error, data } = await supabase
      .from("recipes")
      .update(updateData)
      .match({ id: recipeId, owner_id: userId })
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
