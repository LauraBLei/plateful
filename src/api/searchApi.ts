import { Recipe } from "@/types/recipe";
import { UserProfile } from "@/types/user";

export interface SearchResults {
  recipes: Recipe[];
  users: UserProfile[];
  query: string;
}

export async function searchContent(
  query: string
): Promise<SearchResults | null> {
  if (!query || query.trim().length === 0) {
    return { recipes: [], users: [], query: "" };
  }

  try {
    const res = await fetch(
      `/api/search?q=${encodeURIComponent(query.trim())}`
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Search API error response:", errorText);
      return null;
    }

    const result = await res.json();
    console.log("Search API success:", result);
    return result;
  } catch (error) {
    console.error("Search API error:", error);
    return null;
  }
}
