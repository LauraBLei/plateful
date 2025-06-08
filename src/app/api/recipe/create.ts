// lib/uploadImage.ts

import { supabase } from "../../../../lib/supabase";

export const uploadRecipeImage = async (file: File, userId: string) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error } = await supabase.storage
    .from("recipe-images")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("recipe-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
};
