"use client";

import { ThemeProvider } from "next-themes";
import { UserProfile } from "src/types/user";
import { AuthProvider } from "./AuthProvider";

interface ProvidersProps {
  children: React.ReactNode;
  initialUser: UserProfile | null;
}

export default function Providers({ children, initialUser }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
    </ThemeProvider>
  );
}
