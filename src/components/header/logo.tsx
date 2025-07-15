"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import useMounted from "src/hooks/useMounted";
import { FillImage, ImageContainer } from "../shared/FillImage";

const Logo: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isMounted = useMounted;

  if (!isMounted) {
    return (
      <Link href="/">
        <ImageContainer className="aspect-[5/2] w-[120px] p-2 flex justify-center items-center cursor-pointer">
          <FillImage
            className="object-contain"
            src="/logo/light.png"
            alt="Plateful Logo"
            sizes="120px"
          />
        </ImageContainer>
      </Link>
    );
  }

  return (
    <Link href="/">
      <ImageContainer className="aspect-[5/2] w-[120px] p-2 flex justify-center items-center cursor-pointer">
        <FillImage
          className="object-contain"
          src={resolvedTheme === "dark" ? "/logo/dark.png" : "/logo/light.png"}
          alt="Plateful Logo"
          sizes="120px"
        />
      </ImageContainer>
    </Link>
  );
};

export default Logo;
