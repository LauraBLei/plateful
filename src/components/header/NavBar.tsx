import { signInWithGoogle, signOut } from "@/api/authActions";
import { LogOut, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import SetColorMode from "./SetColorMode";

import { AuthContext } from "@/providers/contextTypes";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";

const NavBar: React.FC = () => {
  const { profile } = useContext(AuthContext);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const signOutHandler = async () => {
    await signOut();
  };

  if (!isHydrated) {
    return <></>;
  }

  return (
    <nav className="flex items-center gap-5">
      <NavLinks />
      <SetColorMode />
      {profile ? (
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
        <button onClick={signInWithGoogle}>
          <User2 className="hover-effect hover:text-brand-orange" />
          <span className="sr-only">Sign in</span>
        </button>
      )}
      {profile && (
        <button onClick={signOutHandler}>
          <LogOut className="hover-effect hover:text-brand-orange" />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
