"use client";

import { deleteRecipe } from "@/api/recipeActions";
import { AuthContext } from "@/providers/contextTypes";
import { Edit, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import CookingTime from "./CookingTime";

interface RecipeCardProps {
  image: string;
  title: string;
  time: number;
  id: number;

  owner?: {
    id: string;
    name: string;
    avatar: string;
  };
}

export const RecipeCard = ({
  image,
  title,
  time,
  id,

  owner,
}: RecipeCardProps) => {
  const { profile } = useContext(AuthContext);
  const isOwnRecipe = profile && owner && profile.id === owner.id;

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
  return (
    <div className="hover-effect font font-primary text-lg  lg:max-w-[345px] w-full text-brand-black dark:text-brand-white">
      <div className="relative  aspect-[308/181] w-full  rounded-md overflow-hidden shadow-md mx-auto">
        <Link href={`/recipe/${id}`} className="block w-full h-full">
          <Image
            fill
            src={image ? image : "/default.jpg"}
            alt={title}
            className="object-cover w-full h-full"
            priority={false}
          />
        </Link>{" "}
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
        {owner && !isOwnRecipe && (
          <Link
            href={`/profile?id=${owner.id}`}
            className={`w-full flex absolute bottom-0 bg-brand-black/50 z-10 p-2 items-center gap-2 hover:bg-brand-black/80 transition-opacity`}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                fill
                src={owner.avatar || "/default.jpg"}
                alt={owner.name}
                className="object-cover"
              />
            </div>
            <span className="text-base text-brand-white font-semibold truncate">
              {owner.name}
            </span>
          </Link>
        )}
      </div>

      <div className="flex justify-between py-2 items-center">
        <p>{title}</p>
        <CookingTime time={time} />
      </div>
    </div>
  );
};
