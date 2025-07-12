import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { UserProfile } from "@/types/user";

interface RecipeOwnerProps {
  owner?: UserProfile | null;
}

export const RecipeOwner: React.FC<RecipeOwnerProps> = ({ owner }) => (
  <Link
    href={`/profile?id=${owner?.id}`}
    className="flex gap-5 items-center py-2 border-b-1 border-brand-black dark:border-brand-white"
  >
    <div className="relative aspect-square w-[50px] rounded-full overflow-hidden shadow-md">
      <Image
        fill
        src={owner?.avatar || "/default.jpg"}
        alt={owner?.name || "no image found"}
        className="object-cover"
      />
    </div>
    <p className="text-lg">{owner?.name}</p>
  </Link>
);
