import type { User } from "@supabase/supabase-js";
import { supabase } from "../../../../lib/supabase";

export const setUser = async (user: User) => {
  await supabase.from("users").insert({
    id: user.id,
    created: user.created_at,
    name: user.user_metadata.full_name,
    avatar: user.user_metadata.avatar_url,
    bio: "",
  });
};

export const checkUser = async (user: User) => {
  const { data: existingUser, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) console.log("user check gave error: ", error);
  return existingUser;
};
