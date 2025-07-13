import { createClient } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import { NextRequest } from "next/server";

export async function getAuthHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  return headers;
}

// Helper function to create an authenticated Supabase client for API routes
export function createAuthenticatedSupabaseClient(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);

    // Create a new Supabase client with the user's access token
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );
  }

  // Return regular client if no auth token
  return supabase;
}
