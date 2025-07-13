import { FillImage, ImageContainer } from "./FillImage";

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
    <ImageContainer
      className={`rounded-full aspect-square w-full overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      <FillImage
        src={src}
        alt={alt}
        className="object-cover"
        sizes="(max-width: 768px) 100px, (max-width: 1024px) 130px, 170px"
      />
    </ImageContainer>
  );
};
