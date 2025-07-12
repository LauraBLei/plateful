import { supabase } from "@/supabase";
import { Recipe } from "@/types/recipe";
import { UserProfile } from "@/types/user";

/**
 * Deletes an image from Supabase storage given its public URL
 * @param imageUrl - The public URL of the image to delete
 * @returns Promise<boolean> - Returns true if deletion was successful, false otherwise
 */
export async function deleteImageFromStorage(
  imageUrl: string
): Promise<boolean> {
  try {
    // Parse the image URL to get the file path
    // Supabase storage URLs typically look like: https://[project].supabase.co/storage/v1/object/public/recipe-images/userId/fileName
    const url = new URL(imageUrl);
    const pathSegments = url.pathname.split("/");

    // Find the index of 'recipe-images' in the path
    const bucketIndex = pathSegments.indexOf("recipe-images");
    if (bucketIndex !== -1 && bucketIndex < pathSegments.length - 1) {
      // Get the file path (everything after 'recipe-images/')
      const filePath = pathSegments.slice(bucketIndex + 1).join("/");

      // Delete the image from storage
      const { error: storageError } = await supabase.storage
        .from("recipe-images")
        .remove([filePath]);

      if (storageError) {
        console.error("Error deleting image from storage:", storageError);
        return false;
      }

      console.log(`Successfully deleted image: ${filePath}`);
      return true;
    } else {
      console.error("Could not extract file path from image URL:", imageUrl);
      return false;
    }
  } catch (error) {
    console.error("Error processing image URL:", error);
    return false;
  }
}

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

export async function uploadRecipeImage(
  image: File,
  userId: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("userId", userId);
  const response = await fetch("/api/recipe/uploadImage", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to upload image");
  const data = await response.json();
  return data.publicUrl;
}
