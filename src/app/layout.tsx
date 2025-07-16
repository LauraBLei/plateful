import type { Metadata } from "next";
import { Footer } from "src/components/footer/Footer";
import { Header } from "src/components/header/header";
import Providers from "src/providers/providers";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen items-center flex flex-col gap-5 transition-colors duration-500 dark:bg-brand-black bg-brand-white">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
