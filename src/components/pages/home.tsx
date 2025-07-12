"use client";
import { fetchFollowingRecipes } from "@/api/recipeActions";
import { Recipe } from "@/types/recipe";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../../helpers/loader";
import { AuthContext } from "../../providers/contextTypes";
import { SectionComponent } from "../home/section";
import { WelcomeSection } from "../home/welcomeSection";

interface HomepageProps {
  recentRecipes: Recipe[];
  timeRecipes: Recipe[];
}

export const Homepage = ({ recentRecipes, timeRecipes }: HomepageProps) => {
  const { profile } = useContext(AuthContext);
  const [followerRecipes, setFollowerRecipes] = useState<Recipe[]>([]);
  const [followingName, setFollowingName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetchFollowingRecipes(profile, setFollowingName).then((recipes) =>
      setFollowerRecipes(recipes)
    );
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="max-w-[1440px] mb-30 w-full px-2 font-primary flex flex-col gap-5">
      <WelcomeSection />
      {profile && followerRecipes.length > 0 && (
        <SectionComponent
          recipeList={followerRecipes}
          sectionName={`Recent Recipes from ${followingName}`}
        />
      )}
      <SectionComponent recipeList={recentRecipes} sectionName={"Recent"} />
      <SectionComponent
        recipeList={timeRecipes}
        sectionName={"30 min recipes!"}
      />
    </div>
  );
};
