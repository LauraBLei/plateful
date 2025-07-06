"use client";

import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext, CommonContext } from "./contextTypes";
import { LogOut, Moon, Sun, User2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../../lib/supabase";
import { signOut } from "@/api/authApi";

export const Header = () => {
  const { profile } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(CommonContext);
  const [mounted, setMounted] = useState(false);

  const [isHydrated, setHydrated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const signOutHandler = async () => {
    await signOut();
    // You may want to trigger a page reload or redirect after logout
  };

  if (!isHydrated) {
    return <></>;
  }

  return (
    <header className="max-w-[1440px] w-full p-2 font-primary text-brand-black dark:text-brand-white font-semibold ">
      {/* Desktop/Header Nav */}
      <div className="hidden md:flex w-full justify-between items-center">
        <div className="relative aspect-[5/2] w-[120px]  p-2 flex justify-center items-center">
          {darkMode ? (
            <Image
              fill
              className="object-contain"
              src="/logo/dark.png"
              alt="Plateful Logo"
            />
          ) : (
            <Image
              fill
              className="object-contain"
              src="/logo/light.png"
              alt="Plateful Logo"
            />
          )}
        </div>
        <nav className="flex  items-center gap-5 ">
          <Link href="/" className="hover-effect dark:hover:text-brand-orange ">
            Home
          </Link>
          <Link
            href="/allRecipes"
            className="hover-effect dark:hover:text-brand-orange"
          >
            All Recipes
          </Link>
          {isHydrated && (
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
          )}
          {mounted && profile ? (
            <Link
              className="relative rounded-full aspect-square overflow-hidden w-[40px] hover-effect"
              href={`/profile?id=${profile.id}`}
            >
              <Image
                fill
                src={profile.avatar ? profile.avatar : "/default.jpg"}
                alt={profile.name}
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
          {mounted && profile && (
            <button onClick={signOutHandler}>
              <LogOut className="hover-effect hover:text-brand-orange" />
            </button>
          )}
        </nav>
      </div>
      {/* Mobile Nav */}
      <div className="flex md:hidden w-full justify-between items-center">
        <div className="relative aspect-[5/2] w-[120px]  p-2 flex justify-center items-center">
          {darkMode ? (
            <Image
              fill
              className="object-contain"
              src="/logo/dark.png"
              alt="Plateful Logo"
            />
          ) : (
            <Image
              fill
              className="object-contain"
              src="/logo/light.png"
              alt="Plateful Logo"
            />
          )}
        </div>
        <button
          className="p-4 focus:outline-none"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className="block w-6 h-0.5 bg-brand-black dark:bg-brand-white mb-1 transition-transform duration-300"
            style={{
              transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
            }}
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
        {/* Slide-in menu */}
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
              <Link
                href="/"
                className="hover-effect dark:hover:text-brand-orange"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/allRecipes"
                className="hover-effect dark:hover:text-brand-orange"
                onClick={() => setMenuOpen(false)}
              >
                All Recipes
              </Link>
              {isHydrated && (
                <button
                  onClick={() => {
                    toggleDarkMode();
                    setMenuOpen(false);
                  }}
                  className="flex gap-2 hover-effect dark:hover:text-brand-orange"
                >
                  {darkMode ? (
                    <>
                      <Moon /> Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun /> Light Mode
                    </>
                  )}
                </button>
              )}
              {mounted && profile ? (
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
                mounted && (
                  <button
                    onClick={() => {
                      signInWithGoogle();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 hover-effect hover:text-brand-orange"
                  >
                    <User2 /> Sign in
                  </button>
                )
              )}
              {mounted && profile && (
                <button
                  onClick={() => {
                    signOutHandler();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 hover-effect hover:text-brand-orange"
                >
                  <LogOut /> Log out
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
