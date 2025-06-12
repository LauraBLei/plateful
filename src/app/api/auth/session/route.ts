import { supabase } from "@/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return NextResponse.json(null, { status: 200 });
    }
    return NextResponse.json(data?.user ?? null, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(null, { status: 200 });
  }
}
