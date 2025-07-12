"use client";
import { useContext, useEffect, useState } from "react";
import { SectionComponent } from "../home/section";
import { WelcomeSection } from "../home/welcomeSection";
import { AuthContext } from "../contextTypes";
import {
  fetchTimeRecipes,
  fetchRecentRecipes,
  fetchFollowingRecipes,
} from "@/api/homeFetch";
import { Recipe } from "@/types/recipe";
import { Loader } from "../loader";

export const Homepage = () => {
  const { profile } = useContext(AuthContext);
  const [followerRecipes, setFollowerRecipes] = useState<Recipe[]>([]);
  const [timeRecipes, setTimeRecipes] = useState<Recipe[]>([]);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const [followingName, setFollowingName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetchTimeRecipes().then((x) => setTimeRecipes(x));
    fetchRecentRecipes().then((x) => {
      setRecentRecipes(x);
      setLoading(false);
    });
    fetchFollowingRecipes(profile, setFollowingName).then((recipes) =>
      setFollowerRecipes(recipes)
    );
  }, [profile]);

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
