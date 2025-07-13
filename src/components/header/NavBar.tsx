"use client";

import { LogOut, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SetColorMode from "./SetColorMode";

import { signInWithGoogle } from "@/api/authActions";
import { signOutHandler } from "@/helpers/AuthHelper";
import useHydrated from "@/hooks/useHydrated";
import type { User } from "@supabase/supabase-js";
import NavLinks from "./NavLinks";

interface NavBarProps {
  user: User | null;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return <></>;
  }

  return (
    <nav className="flex items-center gap-5">
      <NavLinks />
      <SetColorMode />
      {user ? (
        <Link
          className="relative rounded-full aspect-square overflow-hidden w-[40px] hover-effect"
          href={`/profile/${user.id}`}
        >
          <Image
            fill
            src={
              user?.user_metadata?.avatar_url
                ? user?.user_metadata?.avatar_url
                : "/default.jpg"
            }
            alt={user?.user_metadata?.full_name}
          />
        </Link>
      ) : (
        <button onClick={signInWithGoogle}>
          <User2 className="hover-effect hover:text-brand-orange" />
          <span className="sr-only">Sign in</span>
        </button>
      )}
      {user && (
        <button onClick={signOutHandler}>
          <LogOut className="hover-effect hover:text-brand-orange" />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
