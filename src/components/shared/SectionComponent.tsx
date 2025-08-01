import { Recipe } from "src/types/recipe";
import { RecipeCard } from "./RecipeCard";

interface SectionComponentProps {
  recipeList: Recipe[];
  sectionName: string;
}

export const SectionComponent: React.FC<SectionComponentProps> = ({
  recipeList,
  sectionName,
}) => {
  return (
    <section id="follow" className="flex flex-col gap-2">
      <h2 className="headline">{sectionName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-2">
        {recipeList.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            image={recipe.image}
            id={recipe.id}
            title={recipe.name}
            time={recipe.time}
            owner={recipe.owner}
          />
        ))}
      </div>
    </section>
  );
};
