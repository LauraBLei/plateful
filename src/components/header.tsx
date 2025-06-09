"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext, CommonContext } from "./contextTypes";
import { signOut } from "../app/api/auth/signOut";
import { signInWithGoogle } from "../app/api/auth/login";
import { LogOut, Moon, Sun, User2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  const { user } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(CommonContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="max-w-[1440px] w-full flex justify-between p-2 font-primary text-brand-black dark:text-brand-white font-semibold ">
      <div className="bg-orange-300 p-2 flex justify-center items-center">
        Logo
      </div>
      <nav className="flex  items-center gap-5 ">
        <Link href="/" className="hover-effect dark:hover:text-brand-orange ">
          Home
        </Link>
        <Link href="/" className="hover-effect dark:hover:text-brand-orange">
          All Recipes
        </Link>
        <button onClick={toggleDarkMode}>
          {darkMode ? (
            <div className="flex gap-2 hover-effect dark:hover:text-brand-orange">
              <Moon />
              <span>Dark Mode</span>
            </div>
          ) : (
            <div className="flex gap-2 hover-effect dark:hover:text-brand-orange">
              <Sun />
              <span>Light Mode</span>
            </div>
          )}
        </button>
        {mounted && user ? (
          <Link
            className="relative rounded-full aspect-square overflow-hidden w-[40px] hover-effect"
            href="/profile"
          >
            <Image
              fill
              src={user?.user_metadata.avatar_url}
              alt={user?.user_metadata.full_name}
            />
          </Link>
        ) : (
          mounted && (
            <button onClick={signInWithGoogle}>
              <User2 className="hover-effect hover:text-brand-orange" />
              <span className="sr-only">Sign in</span>
            </button>
          )
        )}
        {mounted && user && (
          <button onClick={signOut}>
            <LogOut className="hover-effect hover:text-brand-orange" />
          </button>
        )}
      </nav>
    </header>
  );
};
