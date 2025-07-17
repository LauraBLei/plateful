import { NextRequest, NextResponse } from "next/server";
import { deleteImageFromStorage } from "src/api/storageActions";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { recipeId, userId, updateData } = await req.json();

    if (updateData.image) {
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
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
