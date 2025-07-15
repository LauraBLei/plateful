"use client";

import Link from "next/link";
import React, { useContext } from "react";
import useMounted from "src/hooks/useMounted";
import { CommonContext } from "src/providers/contextTypes";
import { FillImage, ImageContainer } from "../shared/FillImage";

const Logo: React.FC = () => {
  const { darkMode } = useContext(CommonContext);
  const isHydrated = useMounted();

  if (!isHydrated) {
    return <></>;
  }
  return (
    <Link href="/">
      <ImageContainer className="aspect-[5/2] w-[120px] p-2 flex justify-center items-center cursor-pointer">
        <FillImage
          className="object-contain"
          src={darkMode ? "/logo/dark.png" : "/logo/light.png"}
          alt="Plateful Logo"
          sizes="120px"
        />
      </ImageContainer>
    </Link>
  );
};

export default Logo;
