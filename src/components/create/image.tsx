import Image from "next/image";
import { useRef } from "react";
import type { Recipe } from "../../../lib/types/recipe";

interface ImageInputProps {
  setImage: (input: File | null) => void;
  image: File | null;
  existingRecipe?: Recipe | null;
}

export const ImageInput = ({
  setImage,
  image,
  existingRecipe,
}: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // If editing and no new image is selected, use the existing image URL for preview
  const imagePreviewUrl = image
    ? URL.createObjectURL(image)
    : existingRecipe && existingRecipe.image
    ? existingRecipe.image
    : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="headlineTwo">Upload Image</label>

      <div
        onClick={triggerFileSelect}
        className="relative aspect-[308/181] w-full  overflow-hidden max-h-[200px] md:max-h-[400px] flex items-center justify-center border-2 border-dashed border-brand-black dark:border-brand-white rounded cursor-pointer bg-brand-white lg:bg-transparent lg:hover:bg-gray-100 transition"
      >
        {imagePreviewUrl ? (
          <Image
            fill
            src={imagePreviewUrl}
            alt="Preview"
            className="object-cover"
          />
        ) : (
          <span className="text-brand-black">Click to upload image</span>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {image && (
        <p className="text-sm text-gray-600 mt-2 truncate">{image.name}</p>
      )}
    </div>
  );
};
