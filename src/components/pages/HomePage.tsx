"use client";
import { Recipe } from "src/types/recipe";
import { SectionComponent } from "../home/SectionComponent";
import { User } from "@supabase/supabase-js";
import { WelcomeSection } from "../home/welcomeSection";

interface HomepageProps {
  recentRecipes: Recipe[];
  timeRecipes: Recipe[];
  followingRecipes?: Recipe[];
  profile: User;
}

export const Homepage = ({
  recentRecipes,
  timeRecipes,
  followingRecipes: followerRecipes,
  profile,
}: HomepageProps) => {
  return (
    <div className="max-w-[1440px] mb-30 w-full px-2 font-primary flex flex-col gap-5">
      <WelcomeSection profile={profile} />
      {followerRecipes?.length > 0 && (
        <SectionComponent
          recipeList={followerRecipes}
          sectionName={`Recent Recipes from ${followerRecipes[0].owner.name}`}
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
