import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Plateful",
  description: "Share your recipes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  );
}
