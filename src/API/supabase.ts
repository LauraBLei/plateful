import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const publicURLForPlateful = import.meta.env.VITE_SUPABASE_URL ?? "";
const superSecretKeyDoNotCommit = import.meta.env.VITE_SUPABASE_KEY ?? "";
export const supabase = createClient(
  publicURLForPlateful,
  superSecretKeyDoNotCommit
);
