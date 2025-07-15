"use client";

import { DarkModeProvider } from "./darkModeProvider";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DarkModeProvider>{children}</DarkModeProvider>;
}
