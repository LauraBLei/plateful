import type { User } from "@supabase/supabase-js";
import { supabase } from "@/supabase";
import { createAuthenticatedSupabaseClient } from "@/api/headers";
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

    // Fetch followers and following user info if present
    let followersInfo: Array<{
      id: string;
      name: string;
      avatar: string;
      bio: string;
    }> = [];
    let followingInfo: Array<{
      id: string;
      name: string;
      avatar: string;
      bio: string;
    }> = [];

    // Combine all user IDs we need to fetch
    const allUserIds = [
      ...(existingUser?.followers || []),
      ...(existingUser?.following || []),
    ];

    if (allUserIds.length > 0) {
      const { data: usersData } = await supabase
        .from("users")
        .select("id, name, avatar, bio")
        .in("id", allUserIds);

      if (usersData) {
        // Split the users into followers and following
        followersInfo = usersData.filter((user) =>
          existingUser?.followers?.includes(user.id)
        );
        followingInfo = usersData.filter((user) =>
          existingUser?.following?.includes(user.id)
        );
      }
    }

    return NextResponse.json(
      { ...existingUser, followersInfo, followingInfo },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Create authenticated Supabase client
    const authSupabase = createAuthenticatedSupabaseClient(req);

    const fields = await req.json();
    console.log("User update fields:", fields);

    const { id, bio, name, updatedList, followersUpdated, followingUpdated } =
      fields;
    const updateObj: { [key: string]: unknown } = {};
    if (bio !== undefined) updateObj.bio = bio;
    if (name !== undefined) updateObj.name = name;
    if (updatedList !== undefined) updateObj.favorites = updatedList;
    if (followersUpdated !== undefined) updateObj.followers = followersUpdated;
    if (followingUpdated !== undefined) updateObj.following = followingUpdated;

    console.log("Update object:", updateObj);

    const { error, data } = await authSupabase
      .from("users")
      .update(updateObj)
      .eq("id", id);

    if (error) {
      console.error("User update error:", error);
      throw error;
    }

    console.log("User update success:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("User update exception:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
