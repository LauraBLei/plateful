"use client";
import { Recipe } from "src/types/recipe";
import { SectionComponent } from "../home/SectionComponent";
import { WelcomeSection } from "../home/WelcomeSection";

interface HomepageProps {
  recentRecipes: Recipe[];
  timeRecipes: Recipe[];
  followingRecipes?: Recipe[];
}

export const Homepage = ({
  recentRecipes,
  timeRecipes,
  followingRecipes: followerRecipes,
}: HomepageProps) => {
  return (
    <div className="max-w-[1440px] mb-30 w-full px-2 font-primary flex flex-col gap-5">
      <WelcomeSection />
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
