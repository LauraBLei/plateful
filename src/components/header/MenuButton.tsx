import React from "react";

interface MenuButtonProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ menuOpen, setMenuOpen }) => (
  <button
    className="p-4 focus:outline-none"
    aria-label={menuOpen ? "Close menu" : "Open menu"}
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <span
      className="block w-6 h-0.5 bg-brand-black dark:bg-brand-white mb-1 transition-transform duration-300"
      style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}
    />
    <span
      className="block w-6 h-0.5 bg-brand-black dark:bg-brand-white mb-1 transition-opacity duration-300"
      style={{ opacity: menuOpen ? 0 : 1 }}
    />
    <span
      className="block w-6 h-0.5 bg-brand-black dark:bg-brand-white transition-transform duration-300"
      style={{
        transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
      }}
    />
  </button>
);

export default MenuButton;
