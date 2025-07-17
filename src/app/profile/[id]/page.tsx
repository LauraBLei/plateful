import { Loader } from "lucide-react";
import { Suspense } from "react";
import ProfilePage from "src/components/pages/ProfilePage";
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
      .select(
        `*,recipes (*, owner:users!recipes_owner_id_fkey(id, name, avatar))`
      )
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      return { user: null, recipes: [] };
    }

    const { recipes, ...userData } = data;
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
  const { user, recipes } = await getUserDataFromServer(supabase, id);

  return (
    <Suspense fallback={<Loader />}>
      <ProfilePage targetUser={user} recipes={recipes} />
    </Suspense>
  );
};

export default Profile;
