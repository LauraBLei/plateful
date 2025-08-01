import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUser } from "src/api/userActions";
import { UserProfile } from "src/types/user";

interface ProfileNameProps {
  targetUser: UserProfile;
  variant?: "desktop" | "tablet";
}

export const ProfileName = ({
  targetUser: profile,
  variant = "desktop",
}: ProfileNameProps) => {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile?.name || "");
  const router = useRouter();

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

      router.refresh();
      setEditingName(false);
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
    </div>
  );
};
