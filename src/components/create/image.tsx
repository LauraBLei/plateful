import Image from "next/image";
import { useRef } from "react";

interface ImageInputProps {
  setImage: (input: File | null) => void;
  image: File | null;
}

export const ImageInput = ({ setImage, image }: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const imagePreviewUrl = image ? URL.createObjectURL(image) : null;

  return (
    <div>
      <label className="block mb-1 font-semibold">Upload Image</label>

      <div
        onClick={triggerFileSelect}
        className="w-full  h-full overflow-hidden max-h-[200px] md:max-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition"
      >
        {imagePreviewUrl ? (
          <Image
            src={imagePreviewUrl}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-500">Click to upload image</span>
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
