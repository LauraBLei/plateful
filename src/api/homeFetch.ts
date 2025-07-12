import { Recipe } from "@/types/recipe";
import { createClient } from "@supabase/supabase-js";

export async function fetchTimeRecipes(): Promise<Recipe[]> {
  try {
    // If running on server side, query Supabase directly
    if (typeof window === "undefined") {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from("recipes")
        .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
        .lte("time", 30)
        .limit(4);

      if (error) {
        console.error("Error fetching time recipes from Supabase:", error);
        return [];
      }

      return data || [];
    }

    // Client-side: use API route
    const res = await fetch("/api/recipe/search?time=30");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, 4) : [];
  } catch (error) {
    console.error("Error fetching time recipes:", error);
    return [];
  }
}

export async function fetchRecentRecipes(): Promise<Recipe[]> {
  try {
    // If running on server side, query Supabase directly
    if (typeof window === "undefined") {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from("recipes")
        .select("*, owner:users!recipes_owner_id_fkey(id, name, avatar)")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Error fetching recent recipes from Supabase:", error);
        return [];
      }

      return data || [];
    }

    // Client-side: use API route
    const res = await fetch("/api/recipe/all");
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const sorted = [...data].sort(
        (a, b) =>
          new Date((b as any).created_at || b.created).getTime() -
          new Date((a as any).created_at || a.created).getTime()
      );
      return sorted.slice(0, 4);
    }
    return [];
  } catch (error) {
    console.error("Error fetching recent recipes:", error);
    return [];
  }
}

export async function fetchFollowingRecipes(
  profile: any,
  setFollowingName: (name: string) => void
): Promise<Recipe[]> {
  if (!profile || !profile.following || profile.following.length === 0)
    return [];
  const shuffled = [...profile.following].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 1);
  if (selected.length === 0) return [];
  const userRes = await fetch(`/api/auth/user?id=${selected[0]}`);
  const userData = userRes.ok ? await userRes.json() : null;
  if (userData && userData.name) setFollowingName(userData.name);
  const allRecipesRes = await fetch("/api/recipe/all");
  const allRecipes = allRecipesRes.ok ? await allRecipesRes.json() : [];
  if (Array.isArray(allRecipes) && allRecipes.length > 0) {
    const followingPosts = allRecipes.filter((r: any) =>
      selected.includes(r.owner_id)
    );
    const sorted = followingPosts.sort(
      (a: any, b: any) =>
        new Date(b.created_at || b.created).getTime() -
        new Date(a.created_at || a.created).getTime()
    );
    return sorted.slice(0, 3);
  }
  return [];
}
