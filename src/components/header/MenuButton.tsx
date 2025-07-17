import { Menu } from "lucide-react";
import React from "react";

interface MenuButtonProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ menuOpen, setMenuOpen }) => (
  <div className="w-full flex justify-end">
    <button
      className="p-4 cursor-pointer hover:text-brand-orange"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <Menu className="w-8 h-8" />
    </button>
  </div>
);

export default MenuButton;
