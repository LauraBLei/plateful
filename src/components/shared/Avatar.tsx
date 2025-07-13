import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "medium",
  className = "",
}) => {
  const sizeClasses = {
    small: "max-w-[80px]",
    medium: "max-w-[100px] md:max-w-[130px]",
    large: "max-w-[130px] lg:max-w-[170px]",
  };

  return (
    <div
      className={`relative rounded-full aspect-square w-full overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      <Image fill src={src} alt={alt} className="object-cover" />
    </div>
  );
};
