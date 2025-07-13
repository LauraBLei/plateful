"use client";

import { CommonProvider } from "./common";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CommonProvider>{children}</CommonProvider>;
}
