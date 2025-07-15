import { LogOut } from "lucide-react";
import React from "react";

interface LogOutButtonProps {
  onClick: () => void;
}

const LogOutButton: React.FC<LogOutButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 hover-effect hover:text-brand-orange"
  >
    <LogOut /> Log out
  </button>
);

export default LogOutButton;
