import { Menu } from "lucide-react";
import React from "react";

interface MenuButtonProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ menuOpen, setMenuOpen }) => (
  <div className="w-full flex justify-end">
    <button
      className="p-4 cursor-pointer"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <Menu />
    </button>
  </div>
);

export default MenuButton;
