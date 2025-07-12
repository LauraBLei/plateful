"use client";

import { AuthProvider } from "./authprovider";
import { CommonProvider } from "./common";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CommonProvider>
      <AuthProvider>{children}</AuthProvider>
    </CommonProvider>
  );
}
