import { supabase } from "@/supabase";
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

// Helper function to authenticate API requests
export async function authenticateRequest(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    await supabase.auth.setSession({
      access_token: token,
      refresh_token: "", // Not needed for server-side
    });
    return true;
  }
  return false;
}
