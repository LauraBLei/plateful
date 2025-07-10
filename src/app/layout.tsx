import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import Providers from "./providers";
import { Footer } from "@/components/footer";

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
          <div className="min-h-screen items-center flex flex-col gap-5 transition-colors duration-500 dark:bg-brand-black bg-brand-white">
            <Header />
            {children}
            <Footer />
          </div>
        </body>
      </Providers>
    </html>
  );
}
