import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUser } from "../../api/userActions";
import type { UserProfile } from "../../types/user";

interface BioTextProps {
  profile: UserProfile;
  variant?: "desktop" | "tablet";
}

export const BioText = ({ profile, variant = "desktop" }: BioTextProps) => {
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(profile?.bio || "");
  const router = useRouter();

  const handleBioClick = () => {
    setEditingBio(true);
    setBioInput(profile?.bio || "");
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBioInput(e.target.value);
  };

  const handleBioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser({
        id: profile.id,
        bio: bioInput.trim(),
      });

      router.refresh();
      setEditingBio(false);
    } catch (error) {
      console.error("Failed to update bio:", error);
    }
  };

  const containerClasses =
    variant === "desktop"
      ? "relative flex w-full justify-center items-center"
      : "relative flex w-full my-5 items-center text-sm";

  return (
    <div className={containerClasses}>
      {editingBio ? (
        <form
          onSubmit={handleBioSubmit}
          className="flex w-full items-center gap-2"
        >
          <input
            type="text"
            value={bioInput}
            onChange={handleBioChange}
            className="input w-full"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            aria-label="Save bio"
          >
            <Edit />
          </button>
        </form>
      ) : (
        <div>
          <p
            className={`italic cursor-pointer pr-8 ${
              variant === "desktop" ? "text-center w-full" : "w-full"
            }`}
            onClick={handleBioClick}
          >
            {profile && profile.bio ? profile.bio : "no bio added yet"}
          </p>
          <button
            type="button"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            aria-label="Edit bio"
            onClick={handleBioClick}
          >
            <Edit />
          </button>
        </div>
      )}
    </div>
  );
};
