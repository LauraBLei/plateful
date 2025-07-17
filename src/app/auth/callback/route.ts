import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createServerSupabaseClient();

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth callback error:", error);
        return NextResponse.redirect(`${origin}/?error=auth_error`);
      }
    } catch (error) {
      console.error("Auth callback exception:", error);
      return NextResponse.redirect(`${origin}/?error=auth_exception`);
    }
  }

  // Redirect to home page after successful auth
  return NextResponse.redirect(`${origin}/`);
}
