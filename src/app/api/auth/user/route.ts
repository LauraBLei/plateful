import type { User } from "@supabase/supabase-js";
import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user: User = await req.json();
    await supabase.from("users").insert({
      id: user.id,
      created: user.created_at,
      name: user.user_metadata.full_name,
      avatar: user.user_metadata.avatar_url,
      bio: "",
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  try {
    const { data: existingUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return NextResponse.json(existingUser, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const fields = await req.json();
    const { id, bio, updatedList, followersUpdated, followingUpdated } = fields;
    const updateObj: { [key: string]: unknown } = {};
    if (bio !== undefined) updateObj.bio = bio;
    if (updatedList !== undefined) updateObj.favorites = updatedList;
    if (followersUpdated !== undefined) updateObj.followers = followersUpdated;
    if (followingUpdated !== undefined) updateObj.following = followingUpdated;
    const { error, data } = await supabase
      .from("users")
      .update(updateObj)
      .eq("id", id);
    if (error) throw error;
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
