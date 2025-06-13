import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const publicURLForPlateful = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const superSecretKeyDoNotCommit =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const supabase = createClient(
  publicURLForPlateful,
  superSecretKeyDoNotCommit
);
