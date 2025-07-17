import type { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const user: User = await req.json();
    await supabase.from("users").insert({
      id: user.id,
      created: user.created_at,
      name: user.user_metadata.full_name,
      avatar: user.user_metadata.avatar_url,
      bio: "",
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const supabase = await createServerSupabaseClient();

    // Get the main user data
    const { data: existingUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;

    // Get follower and following IDs from query parameters
    const followersParam = searchParams.get("followers");
    const followingParam = searchParams.get("following");

    const followerIds = followersParam
      ? followersParam.split(",").filter(Boolean)
      : [];
    const followingIds = followingParam
      ? followingParam.split(",").filter(Boolean)
      : [];

    // Combine all user IDs we need to fetch
    const allUserIds = [...followerIds, ...followingIds];

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

    if (allUserIds.length > 0) {
      const { data: usersData } = await supabase
        .from("users")
        .select("id, name, avatar, bio")
        .in("id", allUserIds);

      if (usersData) {
        // Split the users into followers and following based on the query parameters
        followersInfo = usersData.filter((user) =>
          followerIds.includes(user.id)
        );
        followingInfo = usersData.filter((user) =>
          followingIds.includes(user.id)
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authSupabase = await createServerSupabaseClient();
    const { id: userId } = await params;
    const fields = await req.json();

    const { bio, name, updatedList, followersUpdated, followingUpdated } =
      fields;
    const updateObj: { [key: string]: unknown } = {};
    if (bio !== undefined) updateObj.bio = bio;
    if (name !== undefined) updateObj.name = name;
    if (updatedList !== undefined) updateObj.favorites = updatedList;
    if (followersUpdated !== undefined) updateObj.followers = followersUpdated;
    if (followingUpdated !== undefined) updateObj.following = followingUpdated;

    const { error, data } = await authSupabase
      .from("users")
      .update(updateObj)
      .eq("id", userId)
      .select();

    if (error) {
      console.error("User update error:", error);
      throw error;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("User update exception:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
