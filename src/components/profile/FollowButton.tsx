import React from "react";

interface FollowButtonProps {
  isFollowingUser: boolean;
  variant?: "desktop" | "tablet";
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowingUser,
  variant = "desktop",
}) => {
  const buttonClass =
    variant === "tablet"
      ? "button text-sm max-w-[150px]"
      : "button max-w-[150px]";

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {};
  return (
    <button
      className={buttonClass}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFollow(e);
      }}
    >
      {isFollowingUser ? "Unfollow" : "Follow"}
    </button>
  );
};
