"use client";

import "./globals.css";
import { CommonProvider } from "@/context/common";
import { AuthProvider } from "@/context/authprovider";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CommonProvider>
        <AuthProvider>{children}</AuthProvider>
      </CommonProvider>
    </html>
  );
}
