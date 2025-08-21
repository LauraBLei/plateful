"use client";
import { Edit, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { deleteRecipe } from "src/api/browserActions";
import { UserProfile } from "src/types/user";
import { ConfirmDialog } from "./popup";

interface RecipeActionsProps {
  id: number;
  currentUser?: UserProfile | null;
  className?: string;
}

const RecipeActions = ({ id, currentUser, className }: RecipeActionsProps) => {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteRecipe({ userId: currentUser!.id, recipeId: id });
      router.refresh();
    } catch {
      alert("Failed to delete recipe.");
    }
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  return (
    <>
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
          onClick={handleDeleteClick}
        >
          <Trash2Icon />
        </button>
      </div>

      {showDeleteConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this recipe?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </>
  );
};

export { RecipeActions };
