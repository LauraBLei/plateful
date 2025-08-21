import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCookieOptions } from "src/helpers/cookieConfig";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    try {
      const cookieStore = await cookies();

      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => {
                try {
                  cookieStore.set(name, value, {
                    ...options,
                    ...getCookieOptions(),
                  });
                } catch (error) {
                  console.error("Failed to set cookie:", name, error);
                }
              });
            },
          },
        }
      );

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth callback error:", error);
        return NextResponse.redirect(
          new URL("/?error=auth_failed", requestUrl.origin)
        );
      }

      // Get the authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Failed to get user after auth:", userError);
        return NextResponse.redirect(
          new URL("/?error=auth_failed", requestUrl.origin)
        );
      }

      // Check if user exists in our database
      const { data: existingUser, error: dbError } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      // If user doesn't exist, create them
      if (!existingUser && dbError?.code === "PGRST116") {
        // PGRST116 = no rows found
        console.log("Creating new user in database:", user.id);

        const { error: insertError } = await supabase.from("users").insert({
          id: user.id,
          created: user.created_at,
          name: user.user_metadata?.full_name || "unknown",
          avatar: user.user_metadata?.avatar_url || "",
          bio: "",
          favorites: [],
          followers: [],
          following: [],
        });

        if (insertError) {
          console.error("Failed to create user:", insertError);
          // Don't fail the auth flow, just log the error
        } else {
          console.log("Successfully created new user:", user.id);
        }
      } else if (dbError && dbError.code !== "PGRST116") {
        console.error("Database error checking user:", dbError);
        // Don't fail the auth flow for database errors
      } else {
        console.log("User already exists:", user.id);
      }

      console.log("Auth callback successful, redirecting to home");
    } catch (error) {
      console.error("Auth callback exception:", error);
      return NextResponse.redirect(
        new URL("/?error=auth_failed", requestUrl.origin)
      );
    }
  }

  // Redirect to the home page
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
