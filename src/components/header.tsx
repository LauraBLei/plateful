"use client";

import { Search, Moon, Sun, User2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext, CommonContext } from "../providers/contextTypes";

import Image from "next/image";
import { signInWithGoogle, signOut } from "@/api/authActions";
import Link from "next/link";

export const Header = () => {
  const { profile } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(CommonContext);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [isHydrated, setHydrated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const signOutHandler = async () => {
    await signOut();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear search after navigating
    }
  };

  if (!isHydrated) {
    return <></>;
  }

  return (
    <header className="max-w-[1440px] w-full p-2 font-primary text-brand-black dark:text-brand-white font-semibold ">
      {/* Desktop/Header Nav */}
      <div className="hidden md:flex w-full justify-between items-center">
        <Link
          href="/"
          className="relative aspect-[5/2] w-[120px] p-2 flex justify-center items-center cursor-pointer"
        >
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
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes or users..."
              className="input pr-10"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-black dark:text-brand-white hover:text-brand-orange transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
        </div>

        <nav className="flex items-center gap-5">
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
        <Link
          href="/"
          className="relative aspect-[5/2] w-[120px] p-2 flex justify-center items-center cursor-pointer"
        >
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
        </Link>
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
              {/* Mobile Search Bar */}
              <div className="mb-2">
                <form
                  onSubmit={(e) => {
                    handleSearch(e);
                    setMenuOpen(false);
                  }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search recipes or users..."
                    className="input pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-black dark:text-brand-white hover:text-brand-orange transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </form>
              </div>

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
