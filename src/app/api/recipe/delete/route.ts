import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";
import { deleteImageFromStorage } from "@/api/storageUtils";

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
      const deleted = await deleteImageFromStorage(recipe.image);
      if (!deleted) {
        console.error("Failed to delete image, but continuing with recipe deletion");
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
