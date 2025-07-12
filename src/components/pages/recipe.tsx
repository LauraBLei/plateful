import { IngredientsInfo } from "@/components/recipe/IngredientsInfo";
import { RecipeHeader } from "@/components/recipe/RecipeHeader";
import { RecipeOwner } from "@/components/recipe/RecipeOwner";
import { RecipeSteps } from "@/components/recipe/RecipeSteps";
import Loader from "@/helpers/loader";
import { Recipe } from "@/types/recipe";
import type { UserProfile } from "@/types/user";
import { Suspense } from "react";

interface RecipePageProps {
  recipe: Recipe;
  owner: UserProfile;
}

const RecipePage = ({ recipe, owner }: RecipePageProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="max-w-[1440px] mb-30 px-2 flex gap-10 w-full flex-wrap lg:flex-nowrap font-primary text-brand-black dark:text-brand-white">
        <IngredientsInfo recipe={recipe} />
        <div className="w-full">
          <RecipeHeader recipe={recipe} />
          <RecipeOwner owner={owner} />
          <RecipeSteps steps={recipe?.steps || []} />
        </div>
      </div>
    </Suspense>
  );
};

export default RecipePage;
