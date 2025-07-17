import { getUser } from "src/api/userActions";
import { UserProfile } from "src/types/user";
import { createServerSupabaseClient } from "./supabaseServerClient";

/**
 * Get the current authenticated user's profile data on the server side.
 * Returns null if no user is authenticated.
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    return await getUser(user.id);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
