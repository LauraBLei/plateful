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

export const checkUser = async (id: string) => {
  const { data: existingUser, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) console.log("user check gave error: ", error);
  return existingUser;
};

export const updateUser = async (fields: {
  id: string;
  bio?: string;
  updatedList?: number[];
  followersUpdated?: string[];
  followingUpdated?: string[];
}) => {
  const { id, bio, updatedList, followersUpdated, followingUpdated } = fields;
  const updateObj: { [key: string]: unknown } = {};
  if (bio !== undefined) updateObj.bio = bio;
  if (updatedList !== undefined) updateObj.favorites = updatedList;
  if (followersUpdated !== undefined) updateObj.followers = followersUpdated;
  if (followingUpdated !== undefined) updateObj.following = followingUpdated;
  const { error, data } = await supabase
    .from("users")
    .update(updateObj)
    .eq("id", id);
  return { error, data };
};

export const getUser = async (id: string) => {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  return data;
};
