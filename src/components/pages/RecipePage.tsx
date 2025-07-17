import { Loader } from "lucide-react";
import { Suspense } from "react";
import { Recipe } from "src/types/recipe";
import { UserProfile } from "src/types/user";
import { IngredientsInfo } from "../recipe/IngredientsInfo";
import { RecipeHeader } from "../recipe/RecipeHeader";
import { RecipeOwner } from "../recipe/RecipeOwner";
import { RecipeSteps } from "../recipe/RecipeSteps";

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
