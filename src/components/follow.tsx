import React, { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface FollowUser {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  users: FollowUser[];
  emptyMessage: string;
}

export const FollowModal: React.FC<FollowModalProps> = ({
  isOpen,
  onClose,
  title,
  users,
  emptyMessage,
}) => {
  const router = useRouter();

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleUserClick = (userId: string) => {
    onClose(); // Close the modal first
    router.push(`/profile?id=${userId}`); // Navigate to the user's profile
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-start sm:items-center justify-center z-50 pt-4 sm:pt-0"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-brand-black border border-brand-black dark:border-brand-white rounded-md p-6 max-w-md w-full mx-4 max-h-[80vh] sm:max-h-96 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="headlineTwo">{title}</h2>
          <button
            onClick={onClose}
            className="hover:text-brand-orange transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {users && users.length > 0 ? (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                className="flex items-center gap-3 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-brand-orange/10 p-2  transition-colors"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    fill
                    src={user.avatar || "/default.jpg"}
                    alt={user.name || "User"}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{user.name}</p>
                  {user.bio && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
};
