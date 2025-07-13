import ProfilePage from "@/components/profile/profile";
import Loader from "@/helpers/loader";
import type { Recipe } from "@/types/recipe";
import type { UserProfile } from "@/types/user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Suspense } from "react";

interface ServerProfileData {
  user: UserProfile | null;
  recipes: Recipe[];
}

async function getUserDataFromServer(
  userId: string
): Promise<ServerProfileData> {
  const supabase = createServerComponentClient(
    { cookies },
    {
      cookieOptions: {
        name: "plateful-auth-token",
        domain:
          process.env.NODE_ENV === "production" ? ".plateful.com" : undefined,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from("users")
      .select(`*,recipes (*)`)
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      return { user: null, recipes: [] };
    }

    // Extract user data (without recipes)
    const { recipes, ...userData } = data;

    // Sort recipes by created in descending order (newest first)
    const sortedRecipes = (recipes || []).sort((a: Recipe, b: Recipe) => {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

    return {
      user: userData as UserProfile,
      recipes: sortedRecipes as Recipe[],
    };
  } catch (error) {
    console.error("Server error fetching user data:", error);
    return { user: null, recipes: [] };
  }
}

const Profile = async ({ params }) => {
  const { id } = await params;

  let serverUserData: UserProfile | null = null;
  let serverRecipes: Recipe[] = [];

  const { user, recipes } = await getUserDataFromServer(id);
  serverUserData = user;
  serverRecipes = recipes;

  return (
    <Suspense fallback={<Loader />}>
      <ProfilePage
        serverUserData={serverUserData}
        serverRecipes={serverRecipes}
      />
    </Suspense>
  );
};

export default Profile;
