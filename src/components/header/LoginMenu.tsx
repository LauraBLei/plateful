"use client";

import { signInWithGoogle } from "@/api/authActions";
import { signOutHandler } from "@/helpers/AuthHelper";
import useHydrated from "@/hooks/useHydrated";
import { AuthContext } from "@/providers/contextTypes";
import type { User } from "@supabase/supabase-js";
import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import Logo from "./logo";
import LogOutButton from "./LogOut";
import MenuButton from "./MenuButton";
import MobileSearchBar from "./MobileSearchBar";
import NavLinks from "./NavLinks";
import SetColorMode from "./SetColorMode";

interface LoginMenuProps {
  user: User | null;
}

const LoginMenu: React.FC<LoginMenuProps> = ({ user }) => {
  const { profile } = useContext(AuthContext);
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
    <div
      className="flex md:hidden w-full justify-between items-center"
      tabIndex={-1}
      onBlur={handleBlur}
      style={{ outline: "none" }}
    >
      <Logo />
      <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-brand-white dark:bg-brand-black shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <button
            className="self-end mb-8 text-2xl font-bold focus:outline-none"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
          <nav className="flex flex-col gap-6">
            <MobileSearchBar setMenuOpen={setMenuOpen} />
            <NavLinks setMenuOpen={setMenuOpen} />
            <SetColorMode />
            {profile ? (
              <Link
                className="flex items-center gap-2 hover-effect"
                href={`/profile?id=${profile.id}`}
                onClick={() => setMenuOpen(false)}
              >
                <Image
                  width={32}
                  height={32}
                  src={profile.avatar ? profile.avatar : "/default.jpg"}
                  alt={profile.name}
                  className="rounded-full"
                />
                Profile
              </Link>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signInWithGoogle();
                }}
                className="flex items-center gap-2 hover-effect hover:text-brand-orange"
              >
                <User2 /> Sign in
              </button>
            )}
            {profile && (
              <LogOutButton
                onClick={() => {
                  setMenuOpen(false);
                  signOutHandler();
                }}
              />
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LoginMenu;
