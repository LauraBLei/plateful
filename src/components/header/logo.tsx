"use client";

import useHydrated from "@/hooks/useHydrated";
import { CommonContext } from "@/providers/contextTypes";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Logo: React.FC = () => {
  const { darkMode } = useContext(CommonContext);
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return <></>;
  }
  return (
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
  );
};

export default Logo;
