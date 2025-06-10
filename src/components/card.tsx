"use client";

import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  image: string;
  title: string;
  time: number;
  id: number;
}

export const RecipeCard = ({ image, title, time, id }: RecipeCardProps) => {
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

  const cookingTime = getCookingTimeLabel(time);
  return (
    <Link
      href={`/recipe?id=${id}`}
      className="hover-effect font font-primary text-lg  lg:max-w-[345px] w-full text-brand-black dark:text-brand-white"
    >
      <div className="relative  aspect-[308/181] w-full  rounded-md overflow-hidden shadow-md mx-auto">
        <Image
          fill
          src={image ? image : "/default.jpg"}
          alt={title}
          className="object-cover w-full h-full"
          priority={false}
        />
      </div>
      <div className="flex justify-between py-2">
        <p>{title}</p>
        <p className="flex items-center gap-2">
          <Clock className="w-[20px]" />
          <span className="text-sm">{cookingTime}</span>
        </p>
      </div>
    </Link>
  );
};
