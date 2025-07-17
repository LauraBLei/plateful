import { Recipe } from "src/types/recipe";
import { WelcomeSection } from "../home/welcomeSection";
import { SectionComponent } from "../shared/SectionComponent";

interface HomepageProps {
  recentRecipes: Recipe[];
  timeRecipes: Recipe[];
  followerRecipes?: Recipe[];
}

export const Homepage = ({
  recentRecipes,
  timeRecipes,
  followerRecipes,
}: HomepageProps) => {
  return (
    <div className="max-w-[1440px] mb-30 w-full px-2 font-primary flex flex-col gap-5">
      <WelcomeSection />
      {followerRecipes && followerRecipes.length > 0 && (
        <SectionComponent
          recipeList={followerRecipes}
          sectionName={`Recent Recipes from ${
            followerRecipes[0]?.owner?.name || "Unknown"
          }`}
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
