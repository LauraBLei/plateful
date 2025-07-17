import { Clock } from "lucide-react";
import Link from "next/link";
import { UserProfile } from "src/types/user";
import { FillImage, ImageContainer } from "./FillImage";
import { RecipeActions } from "./RecipeActions";

interface RecipeCardProps {
  image: string;
  title: string;
  time: number;
  id: number;
  currentUser: UserProfile;
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
  currentUser,
}: RecipeCardProps) => {
  const isOwnRecipe = currentUser?.id === owner?.id;
  const cookingTime = getCookingTimeLabel(time);
  return (
    <div className="hover-effect font font-primary text-lg  lg:max-w-[345px] w-full text-brand-black dark:text-brand-white">
      <ImageContainer className="aspect-[308/181] w-full rounded-md overflow-hidden shadow-md mx-auto">
        <Link href={`/recipe/${id}`} className="block w-full h-full">
          <FillImage
            src={image ? image : "/default.jpg"}
            alt={title}
            className="object-cover"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        {!isOwnRecipe && (
          <Link
            href={`/profile/${owner.id}`}
            className={`w-full flex absolute bottom-0 bg-brand-black/50 z-10 p-2 items-center gap-2 hover:bg-brand-black/80 transition-opacity`}
          >
            <ImageContainer className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <FillImage
                src={owner.avatar || "/default.jpg"}
                alt={owner.name}
                className="object-cover"
                sizes="40px"
              />
            </ImageContainer>
            <span className="text-base text-brand-white font-semibold truncate">
              {owner.name}
            </span>
          </Link>
        )}
        {isOwnRecipe && <RecipeActions id={id} currentUser={currentUser} />}
      </ImageContainer>
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

const getCookingTimeLabel = (minutes: number): string => {
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
