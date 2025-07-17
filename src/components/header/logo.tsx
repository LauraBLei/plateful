"use client";

import Link from "next/link";
import React from "react";
import { FillImage, ImageContainer } from "../shared/FillImage";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <ImageContainer className="aspect-[5/2] w-[120px] p-2 flex justify-center items-center cursor-pointer">
        <FillImage
          className="object-contain block dark:hidden"
          src="/logo/light.png"
          alt="Plateful Logo"
          sizes="120px"
        />

        <FillImage
          className="object-contain hidden dark:block"
          src="/logo/dark.png"
          alt="Plateful Logo"
          sizes="120px"
        />
      </ImageContainer>
    </Link>
  );
};

export default Logo;
