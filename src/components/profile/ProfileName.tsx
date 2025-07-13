import { updateUser } from "@/api/userActions";
import type { UserProfile } from "@/types/user";
import { Edit } from "lucide-react";
import { useState } from "react";

interface ProfileNameProps {
  profile: UserProfile;
  variant?: "desktop" | "tablet";
}

export const ProfileName = ({
  profile,
  variant = "desktop",
}: ProfileNameProps) => {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile?.name || "");
  const [nameUpdateSuccess, setNameUpdateSuccess] = useState(false);

  const handleNameClick = () => {
    setEditingName(true);
    setNameInput(profile?.name || "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameInput.trim()) {
      // Don't submit if name is empty
      return;
    }

    try {
      await updateUser({
        id: profile.id,
        name: nameInput.trim(),
      });

      setEditingName(false);
      setNameUpdateSuccess(true);
      setTimeout(() => setNameUpdateSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update name:", error);
    }
  };

  const desktopClasses = "text-center text-2xl font-semibold";
  const tabletClasses = "headline w-full";

  return (
    <div className="relative flex justify-center items-center w-full">
      {editingName ? (
        <form
          onSubmit={handleNameSubmit}
          className={`flex items-center gap-2 ${
            variant === "tablet" ? "w-full" : ""
          }`}
        >
          <input
            type="text"
            value={nameInput}
            onChange={handleNameChange}
            className={`input ${
              variant === "desktop" ? desktopClasses : tabletClasses
            }`}
            autoFocus
          />
          <button
            type="submit"
            className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2"
            aria-label="Save name"
          >
            <Edit size={16} />
          </button>
        </form>
      ) : (
        <div
          className={`flex items-center gap-2 ${
            variant === "tablet" ? "w-full" : ""
          }`}
        >
          <h1
            className={`cursor-pointer pr-6 ${
              variant === "desktop" ? "text-center text-2xl" : "headline w-full"
            }`}
            onClick={handleNameClick}
          >
            {profile?.name}
          </h1>
          <button
            type="button"
            className="cursor-pointer"
            aria-label="Edit name"
            onClick={handleNameClick}
          >
            <Edit size={16} />
          </button>
        </div>
      )}

      {nameUpdateSuccess && (
        <div
          className={`font-primary text-brand-orange text-sm ${
            variant === "desktop"
              ? "text-center mt-2 absolute -bottom-6"
              : "mt-1"
          }`}
        >
          Name updated
        </div>
      )}
    </div>
  );
};
