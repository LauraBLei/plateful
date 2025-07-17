import { Recipe } from "src/types/recipe";
import { UserProfile } from "src/types/user";
import { WelcomeSection } from "../home/welcomeSection";
import { SectionComponent } from "../shared/SectionComponent";

interface HomepageProps {
  recentRecipes: Recipe[];
  timeRecipes: Recipe[];
  followerRecipes?: Recipe[];
  currentUser: UserProfile;
}

export const Homepage = ({
  recentRecipes,
  timeRecipes,
  followerRecipes,
  currentUser,
}: HomepageProps) => {
  return (
    <div className="max-w-[1440px] mb-30 w-full px-2 font-primary flex flex-col gap-5">
      <WelcomeSection currentUser={currentUser} />
      {followerRecipes?.length > 0 && (
        <SectionComponent
          currentUser={currentUser}
          recipeList={followerRecipes}
          sectionName={`Recent Recipes from ${followerRecipes[0].owner.name}`}
        />
      )}
      <SectionComponent
        currentUser={currentUser}
        recipeList={recentRecipes}
        sectionName={"Recent"}
      />
      <SectionComponent
        currentUser={currentUser}
        recipeList={timeRecipes}
        sectionName={"30 min recipes!"}
      />
    </div>
  );
};
