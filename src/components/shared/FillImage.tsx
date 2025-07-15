import Image, { ImageProps } from "next/image";
import { forwardRef } from "react";

interface FillImageProps extends Omit<ImageProps, "width" | "height"> {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * A wrapper around Next.js Image component that ensures proper positioning
 * for fill images. The parent container must have position relative.
 */
export const FillImage = forwardRef<HTMLImageElement, FillImageProps>(
  ({ src, alt, className = "object-cover", sizes, ...props }, ref) => {
    return (
      <Image
        ref={ref}
        fill
        src={src}
        alt={alt}
        className={className}
        sizes={sizes}
        {...props}
      />
    );
  }
);

FillImage.displayName = "FillImage";

interface ImageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A container component that ensures proper positioning for fill images.
 * Use this as a parent wrapper when you need a relative positioned container.
 */
export const ImageContainer: React.FC<ImageContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ position: "relative" }}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
};
