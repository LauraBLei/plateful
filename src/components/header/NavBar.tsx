"use client";

import { LogOut, User2 } from "lucide-react";
import Link from "next/link";
import { FillImage, ImageContainer } from "../shared/FillImage";
import ThemeSwitch from "./ThemeSwitch";

import { useRouter } from "next/navigation";
import { signInWithGoogle } from "src/api/authActions";

import { supabase } from "src/helpers/supaBaseBrowserClient";
import useIsMounted from "src/hooks/useMounted";
import { useAuth } from "src/providers/AuthProvider";
import NavLinks from "./NavLinks";

const NavBar = () => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const { user } = useAuth();

  if (!isMounted) {
    return <></>;
  }

  const signOutHandler = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav className="flex items-center gap-5">
      <NavLinks />
      <ThemeSwitch />
      {user ? (
        <Link href={`/profile/${user.id}`}>
          <ImageContainer className="rounded-full aspect-square overflow-hidden w-[40px] hover-effect">
            <FillImage
              src={user?.avatar ? user?.avatar : "/default.jpg"}
              alt={user?.name}
              className="object-cover"
              sizes="40px"
            />
          </ImageContainer>
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
