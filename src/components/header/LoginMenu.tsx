"use client";

import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { signInWithGoogle } from "src/api/authActions";

import { supabase } from "src/helpers/supaBaseBrowserClient";
import useMounted from "src/hooks/useMounted";
import { useAuth } from "src/providers/AuthProvider";
import LogOutButton from "./LogOut";
import MenuButton from "./MenuButton";
import MobileSearchBar from "./MobileSearchBar";
import NavLinks from "./NavLinks";
import ThemeSwitch from "./ThemeSwitch";

const LoginMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const isHydrated = useMounted();

  // Handler for blur event to close menu if focus leaves
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setMenuOpen(false);
    }
  };

  const signOutHandler = async () => {
    await supabase.auth.signOut();
    router.refresh();
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
            <ThemeSwitch />
            {user ? (
              <Link
                className="flex items-center gap-2 hover-effect"
                href={`/profile/${user.id}`}
                onClick={() => setMenuOpen(false)}
              >
                <Image
                  width={32}
                  height={32}
                  src={user.avatar ? user.avatar : "/default.jpg"}
                  alt={user.name}
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
            {user && (
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
