import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { userId, recipeId } = await req.json();

    // First, get the recipe to retrieve the image URL
    const { data: recipe, error: fetchError } = await supabase
      .from("recipes")
      .select("image")
      .eq("id", recipeId)
      .eq("owner_id", userId)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // Extract the file path from the image URL if it exists
    if (recipe.image) {
      try {
        // Parse the image URL to get the file path
        // Supabase storage URLs typically look like: https://[project].supabase.co/storage/v1/object/public/recipe-images/userId/fileName
        const url = new URL(recipe.image);
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
            // We'll continue with recipe deletion even if image deletion fails
          }
        }
      } catch (imageError) {
        console.error("Error processing image URL:", imageError);
        // Continue with recipe deletion even if image processing fails
      }
    }

    // Delete the recipe from the database
    const { error: deleteError } = await supabase
      .from("recipes")
      .delete()
      .match({ id: recipeId, owner_id: userId });

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
