import { Clock, HeartMinus, HeartPlus } from "lucide-react";
import React from "react";

interface RecipeHeaderProps {
  name?: string;
  isFavorite: boolean;
  cookingTime: string;
  onFavoriteClick: () => void;
}

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  name,
  isFavorite,
  cookingTime,
  onFavoriteClick,
}) => (
  <div className="flex justify-between">
    <h1 className="headline flex justify-between">
      {name}
      <div className="flex items-center gap-5">
        <button
          onClick={onFavoriteClick}
          className="flex gap-2 items-center hover:text-brand-orange cursor-pointer"
        >
          {isFavorite ? (
            <HeartMinus className="w-[20px] hover:text-brand-orange cursor-pointer" />
          ) : (
            <HeartPlus className="w-[20px] " />
          )}
          <span className="whitespace-nowrap text-sm">
            {isFavorite ? "Remove from favorite" : "Add to favorite"}
          </span>
        </button>
        <p className="flex items-center gap-2">
          <Clock className="w-[20px]" />
          <span className="text-sm whitespace-nowrap">{cookingTime}</span>
        </p>
      </div>
    </h1>
  </div>
);
