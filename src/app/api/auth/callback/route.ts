import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log("Auth callback invoked with code:", !!code);

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
                    httpOnly: false,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
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
