"use client";
import { Edit, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { deleteRecipe } from "src/api/browserActions";
import { UserProfile } from "src/types/user";

interface RecipeActionsProps {
  id: number;
  currentUser?: UserProfile | null;
  className?: string;
}

const RecipeActions = ({ id, currentUser, className }: RecipeActionsProps) => {
  const router = useRouter();
  const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    const confirmed = confirm("are you sure you wanna delete this?");
    if (!confirmed) return;
    try {
      await deleteRecipe({ userId: currentUser.id, recipeId: id });
      router.refresh();
    } catch {
      alert("Failed to delete recipe.");
    }
  };
  return (
    <div
      className={
        className ||
        "w-full flex absolute bottom-0 justify-end bg-brand-black/50 z-10"
      }
    >
      <Link
        href={`/edit/${id}`}
        type="button"
        className="ml-1 text-xs px-2 py-1 rounded hover:bg-brand-orange hover:text-brand-black text-brand-white"
      >
        <Edit />
      </Link>
      <button
        type="button"
        className="ml-1 text-xs px-2 py-1 cursor-pointer rounded hover:bg-brand-orange hover:text-brand-black text-brand-white"
        onClick={async (e) => {
          await onDelete(e);
        }}
      >
        <Trash2Icon />
      </button>
    </div>
  );
};

export { RecipeActions };
