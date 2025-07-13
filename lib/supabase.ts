import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient({
  cookieOptions: {
    name: "plateful-auth-token",
    domain: process.env.NODE_ENV === "production" ? ".plateful.com" : undefined,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
});

export default supabase;
