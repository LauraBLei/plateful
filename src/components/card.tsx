"use client";

import { Clock, Edit, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteRecipe } from "@/app/api/recipe/delete";
import { useContext } from "react";
import { AuthContext } from "@/components/contextTypes";

interface RecipeCardProps {
  image: string;
  title: string;
  time: number;
  id: number;
  isOwnRecipe?: boolean;
}

export const RecipeCard = ({
  image,
  title,
  time,
  id,
  isOwnRecipe = false,
}: RecipeCardProps) => {
  const { profile } = useContext(AuthContext);
  const getCookingTimeLabel = (minutes: number) => {
    switch (minutes) {
      case 30:
        return "30 min";
      case 60:
        return "1 hour";
      case 90:
        return "1.5 hours";
      case 120:
        return "2 hours";
      default:
        return "> 2 hours";
    }
  };
  const onDelete = async () => {
    if (!profile) return;
    const confirmed = confirm("are you sure you wanna delete this?");
    if (!confirmed) return;
    try {
      await deleteRecipe({ userId: profile.id, recipeId: id });
      window.location.reload();
    } catch {
      alert("Failed to delete recipe.");
    }
  };
  const cookingTime = getCookingTimeLabel(time);
  return (
    <div className="hover-effect font font-primary text-lg  lg:max-w-[345px] w-full text-brand-black dark:text-brand-white">
      <div className="relative  aspect-[308/181] w-full  rounded-md overflow-hidden shadow-md mx-auto">
        <Link href={`/recipe?id=${id}`} className="block w-full h-full">
          <Image
            fill
            src={image ? image : "/default.jpg"}
            alt={title}
            className="object-cover w-full h-full"
            priority={false}
          />
        </Link>
        {isOwnRecipe && (
          <div className="w-full flex absolute bottom-0 justify-end bg-brand-black/50 z-10">
            <Link
              href={`/create?id=${id}`}
              type="button"
              className="ml-1 text-xs px-2 py-1 rounded hover:bg-brand-orange hover:text-brand-black text-brand-black dark:text-brand-white"
            >
              <Edit />
            </Link>
            <button
              type="button"
              className="ml-1 text-xs px-2 py-1 rounded hover:bg-brand-orange hover:text-brand-black text-brand-black dark:text-brand-white"
              onClick={async (e) => {
                e.preventDefault();
                await onDelete();
              }}
            >
              <Trash2Icon />
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between py-2 items-center">
        <p>{title}</p>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Clock className="w-[20px]" />
          <span className="text-sm">{cookingTime}</span>
        </div>
      </div>
    </div>
  );
};
