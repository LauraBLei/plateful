import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";

/**
 * Deletes an image from Supabase storage given its public URL
 * @param imageUrl - The public URL of the image to delete
 * @returns Promise<boolean> - Returns true if deletion was successful, false otherwise
 */
export async function deleteImageFromStorage(
  imageUrl: string
): Promise<boolean> {
  try {
    const supabase = await createServerSupabaseClient();
    const url = new URL(imageUrl);
    const pathSegments = url.pathname.split("/");

    // Find the index of 'recipe-images' in the path
    const bucketIndex = pathSegments.indexOf("recipe-images");
    if (bucketIndex !== -1 && bucketIndex < pathSegments.length - 1) {
      const filePath = pathSegments.slice(bucketIndex + 1).join("/");

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
