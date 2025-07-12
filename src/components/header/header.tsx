"use client";

import useHydrated from "@/hooks/useHydrated";
import { useRef, useState } from "react";
import LoginMenu from "./LoginMenu";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Logo from "./logo";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isHydrated = useHydrated();

  // Handler for blur event to close menu if focus leaves
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Only close if focus moves outside the menu
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setMenuOpen(false);
    }
  };

  if (!isHydrated) {
    return <></>;
  }

  return (
    <header className="max-w-[1440px] w-full p-2 font-primary text-brand-black dark:text-brand-white font-semibold ">
      <div className="hidden md:flex w-full justify-between items-center">
        <Logo />
        <SearchBar />
        <NavBar />
      </div>
      <div
        ref={menuRef}
        tabIndex={-1}
        onBlur={handleBlur}
        style={{ outline: "none" }}
      >
        <LoginMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </header>
  );
};
