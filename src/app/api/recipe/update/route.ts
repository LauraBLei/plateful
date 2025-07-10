import { createAuthenticatedSupabaseClient } from "@/api/headers";
import { NextRequest, NextResponse } from "next/server";
import { deleteImageFromStorage } from "@/api/storageUtils";

export async function PATCH(req: NextRequest) {
  try {
    // Create authenticated Supabase client
    const supabase = createAuthenticatedSupabaseClient(req);

    const { recipeId, userId, updateData } = await req.json();

    // If image is being updated, we need to handle old image deletion
    if (updateData.image) {
      // First, get the current recipe to retrieve the old image URL
      const { data: currentRecipe, error: fetchError } = await supabase
        .from("recipes")
        .select("image")
        .eq("id", recipeId)
        .eq("owner_id", userId)
        .single();

      if (fetchError) {
        return NextResponse.json(
          { error: fetchError.message },
          { status: 500 }
        );
      }

      // If there's an old image and it's different from the new one, delete it
      if (currentRecipe?.image && currentRecipe.image !== updateData.image) {
        const deleted = await deleteImageFromStorage(currentRecipe.image);
        if (!deleted) {
          console.error(
            "Failed to delete old image, but continuing with recipe update"
          );
        }
      }
    }

    // Update the recipe in the database
    const { error, data } = await supabase
      .from("recipes")
      .update(updateData)
      .match({ id: recipeId, owner_id: userId })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
