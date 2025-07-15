import { Loader } from "lucide-react";
import { Suspense } from "react";
import { getUser } from "src/api/userActions";
import ProfilePage from "src/components/profile/profile";
import { createServerSupabaseClient } from "src/helpers/supabaseServerClient";
import { Recipe } from "src/types/recipe";
import { UserProfile } from "src/types/user";

interface ServerProfileData {
  user: UserProfile | null;
  recipes: Recipe[];
}

async function getUserDataFromServer(
  supabase: any,
  userId: string
): Promise<ServerProfileData> {
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
  const supabase = await createServerSupabaseClient();
  const { id } = await params;
  const { user: targetUser, recipes } = await getUserDataFromServer(
    supabase,
    id
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let loggedInUser: UserProfile | null = null;
  if (user) {
    loggedInUser = await getUser(user.id);
  }

  return (
    <Suspense fallback={<Loader />}>
      <ProfilePage
        targetUser={targetUser}
        recipes={recipes}
        loggedInUser={loggedInUser}
      />
    </Suspense>
  );
};

export default Profile;
