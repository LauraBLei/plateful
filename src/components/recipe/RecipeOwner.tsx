import Link from "next/link";
import React from "react";
import { UserProfile } from "src/types/user";
import { FillImage, ImageContainer } from "../shared/FillImage";

interface RecipeOwnerProps {
  owner?: UserProfile | null;
}

export const RecipeOwner: React.FC<RecipeOwnerProps> = ({ owner }) => (
  <Link
    href={`/profile/${owner?.id}`}
    className="flex gap-5 items-center py-2 border-b-1 border-brand-black dark:border-brand-white"
  >
    <ImageContainer className="aspect-square w-[50px] rounded-full overflow-hidden shadow-md">
      <FillImage
        src={owner?.avatar || "/default.jpg"}
        alt={owner?.name || "no image found"}
        className="object-cover"
        sizes="50px"
      />
    </ImageContainer>
    <p className="text-lg">{owner?.name}</p>
  </Link>
);
