import { supabase } from "@/supabase";

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

/**
 * Compress image before upload (optional enhancement)
 */
export function compressImage(
  file: File,
  maxWidth: number = 800,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob!], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        },
        file.type,
        quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
}
