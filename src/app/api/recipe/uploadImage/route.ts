import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const formData = await req.formData();
    const file = formData.get("file");
    const userId = formData.get("userId");

    if (!file || !userId || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing file or userId" },
        { status: 400 }
      );
    }
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;
    const { error } = await supabase.storage
      .from("recipe-images")
      .upload(filePath, file);
    if (error) throw error;
    const { data } = supabase.storage
      .from("recipe-images")
      .getPublicUrl(filePath);
    return NextResponse.json({ publicUrl: data.publicUrl }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
