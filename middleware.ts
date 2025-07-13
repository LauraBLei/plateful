import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient(
    { req, res },
    {
      cookieOptions: {
        name: "plateful-auth-token",
        domain:
          process.env.NODE_ENV === "production" ? ".plateful.com" : undefined,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    }
  );

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
