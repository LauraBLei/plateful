"use client";

import { Clock } from "lucide-react";
import Image from "next/image";

interface RecipeCardProps {
  image: string;
  title: string;
  time: number;
}

export const RecipeCard = ({ image, title, time }: RecipeCardProps) => {
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
    <div className="hover-effect font font-primary text-lg text-brand-black dark:text-brand-white">
      <div className="relative aspect-[308/181] w-[308px] rounded-md overflow-hidden shadow-md">
        <Image fill src={image} alt={title} className="object-cover" />
      </div>
      <div className="flex justify-between py-2">
        <p>{title}</p>
        <p className="flex items-center gap-2">
          <Clock className="w-[20px]" />
          <span className="text-sm">{cookingTime}</span>
        </p>
      </div>
    </div>
  );
};
